// src/lib/utils/highlight.ts
import hljs from 'highlight.js';

export function highlightCode(code: string, lang?: string): string {
  // If a language is specified and highlight.js supports it, use it
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
    } catch (err) {
      // Fallback to auto-detection if the specific language fails
    }
  }
  
  // Auto-detect the language if none was provided
  try {
    return hljs.highlightAuto(code).value;
  } catch (err) {
    // Final fallback: escape HTML to prevent errors if highlighting completely fails
    return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}