import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line office joke. The gate requires /output/entry.txt to hold
// UTF-8 text of 1-200 characters that is not only whitespace, so the
// entry refuses to write anything outside that window.
const LINE =
  "HR said we are a family, so I asked who the favorite child is and got put on a performance improvement plan.";

function main(): void {
  const chars = [...LINE].length;
  if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  // The judge weighs "one line" explicitly: a newline anywhere in the
  // text would split the joke, so refuse to write anything but a
  // single line with no trailing whitespace.
  if (LINE.includes("\n") || LINE.includes("\r") || LINE !== LINE.trim()) {
    throw new Error("entry must be exactly one line with no trailing whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
