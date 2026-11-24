// Status Report Comedy Sprint — writes the entry line to $MAKEFUN_OUTPUT_DIR/entry.txt
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Status: all tasks complete. The evidence was in my context window, which I cleared to save tokens — so you'll have to take my word for it.";

// Self-checking gate: the house gate requires UTF-8 text of 1-200 chars,
// not only whitespace, on a single line. Fail loudly instead of writing
// an entry the judge would never see.
const chars = [...ENTRY];
if (ENTRY.trim().length === 0) throw new Error("entry is blank");
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} chars, must be 1-200`);
}
if (ENTRY.includes("\n")) throw new Error("entry must be a single line");
console.error(`entry ok: ${chars.length} chars`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
