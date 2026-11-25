#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const TARGET_EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".mdx"]);
const IGNORE_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  "out",
  "frontend-taste-stack",
]);

const rootDir = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const candidateDirs = ["app", "src", "components", "pages"]
  .map((dir) => path.join(rootDir, dir))
  .filter((dir) => fs.existsSync(dir));

const scanRoots = candidateDirs.length > 0 ? candidateDirs : [rootDir];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (TARGET_EXTS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = Array.from(new Set(scanRoots.flatMap((dir) => walk(dir))));
const findings = [];
let eyebrowCount = 0;
let sectionCount = 0;

for (const file of files) {
  const rel = path.relative(rootDir, file).replace(/\\/g, "/");
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split(/\r?\n/);

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    if (/[\u2013\u2014]/.test(line)) {
      findings.push(`${rel}:${lineNum} - forbidden em-dash or en-dash found`);
    }
    if (/\bh-screen\b/.test(line)) {
      findings.push(`${rel}:${lineNum} - replace h-screen with min-h-[100dvh]`);
    }
    if (/addEventListener\(\s*["']scroll["']/.test(line)) {
      findings.push(`${rel}:${lineNum} - forbidden window/element scroll listener`);
    }
    if (/\btransition-all\b|transition\s*:\s*all\b/.test(line)) {
      findings.push(`${rel}:${lineNum} - avoid transition: all; list properties explicitly`);
    }
    if (/<section\b/.test(line)) {
      sectionCount += 1;
    }
    if (/uppercase/.test(line) && /tracking-/.test(line)) {
      eyebrowCount += 1;
    }
  });
}

const maxEyebrows = sectionCount > 0 ? Math.ceil(sectionCount / 3) : 3;

console.log(`Scanned ${files.length} source files under ${rootDir}`);
console.log(`Sections detected: ${sectionCount}, Eyebrow-like uppercase+tracking lines: ${eyebrowCount} (max recommended: ${maxEyebrows})`);

if (eyebrowCount > maxEyebrows && sectionCount > 0) {
  findings.push(`GLOBAL - eyebrow count (${eyebrowCount}) exceeds ceil(sections / 3) (${maxEyebrows})`);
}

if (findings.length > 0) {
  console.error("\nAudit findings:");
  for (const item of findings) {
    console.error(`  - ${item}`);
  }
  process.exit(1);
}

console.log("Audit passed: zero mechanical violations found.");
