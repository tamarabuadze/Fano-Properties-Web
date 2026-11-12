import { marked } from "marked";

// Article bodies come from the admin, where the editor is told Markdown is
// supported. Older articles were pasted as HTML. Convert only what is not HTML.
const HTML_BLOCK = /<(p|h[1-6]|ul|ol|li|div|section|article|blockquote|table|br|img|figure)\b/i;

export function articleBodyToHtml(content: string | null | undefined): string {
  const body = (content ?? "").trim();
  if (!body) return "";
  if (HTML_BLOCK.test(body)) return body;
  return marked.parse(body, { async: false, gfm: true, breaks: false }) as string;
}
