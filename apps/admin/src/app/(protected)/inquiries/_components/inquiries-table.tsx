"use client";

import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@fano/utils";
import { updateInquiryStatus } from "../_actions";

interface Inquiry {
  id: string;
  type: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  message: string;
  property?: { title: string; slug: string } | null;
  agent?: { firstName: string; lastName: string } | null;
  createdAt: Date;
}

interface InquiriesTableProps {
  inquiries: Inquiry[];
  total: number;
  page: number;
  pageSize: number;
}

const statusColors: Record<string, string> = {
  new: "bg-amber-50 text-amber-700",
  contacted: "bg-blue-50 text-blue-700",
  in_progress: "bg-purple-50 text-purple-700",
  closed: "bg-green-50 text-green-700",
};

export function InquiriesTable({ inquiries, total, page, pageSize }: InquiriesTableProps) {
  async function handleStatusChange(id: string, status: string) {
    const result = await updateInquiryStatus(id, status as never);
    if (result.success) toast.success("Status updated");
    else toast.error("Failed to update status");
  }

  return (
    <div>
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Contact</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Type</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Related To</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Message</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    No inquiries found
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{inq.firstName} {inq.lastName}</p>
                      <a href={`mailto:${inq.email}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        {inq.email}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <span className="capitalize text-muted-foreground text-xs">{inq.type}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {inq.property ? (
                        <Link href={`/properties/${inq.property.slug}`} className="hover:text-foreground transition-colors line-clamp-1">
                          {inq.property.title}
                        </Link>
                      ) : inq.agent ? (
                        `${inq.agent.firstName} ${inq.agent.lastName}`
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-xs text-muted-foreground line-clamp-2">{inq.message}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        defaultValue={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className={cn(
                          "px-2 py-1 rounded-lg text-xs font-medium border-0 cursor-pointer focus:outline-none",
                          statusColors[inq.status] ?? "bg-secondary text-muted-foreground"
                        )}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {Math.ceil(total / pageSize) > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <p>Page {page} of {Math.ceil(total / pageSize)}</p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={`?page=${page - 1}`} className="h-8 px-3 rounded-lg border border-border flex items-center hover:bg-secondary transition-colors">
                Previous
              </Link>
            )}
            {page < Math.ceil(total / pageSize) && (
              <Link href={`?page=${page + 1}`} className="h-8 px-3 rounded-lg border border-border flex items-center hover:bg-secondary transition-colors">
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
