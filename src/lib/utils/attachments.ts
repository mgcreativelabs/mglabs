// =============================================
// ATTACHMENTS — src/lib/utils/attachments.ts
// =============================================
// File-handling helpers for the MG Labs AI chat composer
// (src/app/mg-ai/MGAIChat.tsx). Two kinds of files are supported:
//
//   - images  → read as a base64 data URL, shown as a thumbnail,
//                sent to vision-capable models as an image_url part.
//   - text    → read as plain text and inlined into the composer
//                as a fenced block (formatTextAttachment), since
//                every text-capable provider already handles plain
//                text uniformly — no separate upload plumbing needed.
//
// Anything else is reported to the caller as "unsupported" so the
// UI can show a clear error instead of silently failing.

/** Images larger than this are rejected client-side before upload. */
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8MB

const TEXT_EXTENSIONS = [
  ".txt", ".md", ".markdown", ".csv", ".tsv", ".json", ".yaml", ".yml",
  ".xml", ".html", ".css", ".js", ".jsx", ".ts", ".tsx", ".py", ".java",
  ".c", ".cpp", ".h", ".hpp", ".cs", ".go", ".rs", ".rb", ".php", ".sql",
  ".sh", ".bash", ".log", ".env", ".ini", ".toml", ".conf",
];

export type FileKind = "image" | "text" | "unsupported";

/**
 * Classifies a File as "image" (renderable thumbnail, sent to vision
 * models), "text" (read and inlined into the composer), or
 * "unsupported" (rejected with an error message by the caller).
 */
export function classifyFile(file: File): FileKind {
  if (file.type.startsWith("image/")) return "image";

  if (file.type.startsWith("text/") || file.type === "application/json") {
    return "text";
  }

  const lower = file.name.toLowerCase();
  if (TEXT_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
    return "text";
  }

  return "unsupported";
}

/**
 * Reads a File as a base64 data URL (e.g. "data:image/png;base64,...").
 * Used for image attachments so they can be shown as thumbnails and
 * sent to vision-capable models without a separate upload endpoint.
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file as data URL."));
      }
    };
    reader.onerror = () => reject(reader.error ?? new Error("File read failed."));
    reader.readAsDataURL(file);
  });
}

/**
 * Reads a File as plain text. Used for text/code attachments, which
 * get inlined into the chat composer rather than uploaded separately.
 */
export function fileToText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file as text."));
      }
    };
    reader.onerror = () => reject(reader.error ?? new Error("File read failed."));
    reader.readAsText(file);
  });
}

/**
 * Formats a text file's contents as a fenced code block labeled with
 * its filename, ready to be appended into the composer's textarea.
 */
export function formatTextAttachment(fileName: string, content: string): string {
  const ext = fileName.includes(".") ? fileName.split(".").pop() : "";
  return `\n\n**${fileName}**\n\`\`\`${ext ?? ""}\n${content}\n\`\`\`\n`;
}
