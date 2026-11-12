// Admin server actions return { success: false, error } instead of throwing, so the
// cause used to vanish. This logs it server-side and gives the editor a message that
// says what to do, with the generic fallback the action passes in.
const KNOWN: Record<string, string> = {
  P2002: "Something with this name already exists. Change the title and try again.",
  P2024: "The database was busy and the request timed out. Please try again in a moment.",
  P2025: "That record no longer exists. Refresh the page and try again.",
  P1001: "Could not reach the database. Please try again in a moment.",
};

export function actionFailed(fallback: string, error: unknown): { success: false; error: string } {
  const code = (error as { code?: string } | null)?.code;
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[admin] ${fallback}`, code ? `(${code})` : "", message.split("\n").slice(-1)[0]);
  return { success: false, error: (code && KNOWN[code]) || fallback };
}
