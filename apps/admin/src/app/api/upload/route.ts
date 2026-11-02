import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const MB = 1024 * 1024;
const BUCKET = "property-media";

const ALLOWED: Record<string, { ext: string; maxSize: number; matches: (b: Buffer) => boolean }> = {
  "image/jpeg": { ext: "jpg", maxSize: 10 * MB, matches: (b) => b.subarray(0, 3).toString("hex") === "ffd8ff" },
  "image/png": { ext: "png", maxSize: 10 * MB, matches: (b) => b.subarray(0, 4).toString("hex") === "89504e47" },
  "image/webp": {
    ext: "webp",
    maxSize: 10 * MB,
    matches: (b) => b.subarray(0, 4).toString("latin1") === "RIFF" && b.subarray(8, 12).toString("latin1") === "WEBP",
  },
  "video/mp4": { ext: "mp4", maxSize: 50 * MB, matches: (b) => b.subarray(4, 8).toString("latin1") === "ftyp" },
};

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }

  const rule = ALLOWED[file.type];
  if (!rule) {
    return NextResponse.json({ error: "Use a JPG, PNG, WEBP or MP4 file." }, { status: 415 });
  }
  if (file.size > rule.maxSize) {
    return NextResponse.json({ error: `File is too large (limit ${rule.maxSize / MB} MB).` }, { status: 413 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (!rule.matches(bytes)) {
    return NextResponse.json({ error: "This file doesn't look like a valid image or video." }, { status: 415 });
  }

  const name = `${randomUUID()}.${rule.ext}`;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceKey) {
    const res = await fetch(`${supabaseUrl}/storage/v1/object/${BUCKET}/${name}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${serviceKey}`, apikey: serviceKey, "Content-Type": file.type },
      body: bytes,
    });
    if (!res.ok) {
      console.error("Supabase upload failed", res.status, await res.text());
      return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 502 });
    }
    return NextResponse.json({ url: `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${name}` });
  }

  // Local development only: files go to the web app's public folder.
  // Railway's normal disk is wiped on deploy, so production needs a volume or Supabase.
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "File storage isn't configured yet." }, { status: 500 });
  }
  const dir = path.resolve(process.cwd(), "../web/public/uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), bytes);
  const webUrl = process.env.NEXT_PUBLIC_WEB_URL ?? "http://localhost:3000";
  return NextResponse.json({ url: `${webUrl}/uploads/${name}` });
}
