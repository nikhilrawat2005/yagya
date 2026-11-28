import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const SCAN_DIRS = ['app', 'src', 'components', 'config', 'data'];
const ALLOWED_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.css',
  '.mdx',
  '.json',
]);

const CHECKS = [
  {
    id: 'DRAFT_PLACEHOLDER',
    category: 'Draft Placeholders (Resolve before production launch)',
    regex: /\{\{[A-Z0-9_]+\}\}/g,
  },
  {
    id: 'TODO_MARKER',
    category: 'Unresolved TODOs',
    regex: /\bTODO\b/gi,
  },
  {
    id: 'OLD_EMAIL',
    category: 'Deprecated Email',
    regex: /care@yagyafoods\.in/gi,
  },
  {
    id: 'OLD_PHONE',
    category: 'Deprecated Phone',
    regex: /98765\s*43210/g,
  },
  {
    id: 'INVENTED_BRAND',
    category: 'Invented Brand / Legal Entity Name',
    regex: /Yagya Naturals/gi,
  },
  {
    id: 'RAW_DOC_TOKEN',
    category: 'Raw Document Placeholder Token',
    regex: /\[(?:Lab|Check|Verify Batch|Verify %|Insert Count)\]/gi,
  },
  {
    id: 'LEAKED_TEMPLATE_COPY',
    category: 'Leaked Template Copy',
    regex: /\byour brand\b/gi,
  },
  {
    id: 'FAKE_PROMO_CODE',
    category: 'Hardcoded Fake Promo Code',
    regex: /\b(?:PURE15|YAGYA10)\b/g,
  },
  {
    id: 'UNVERIFIED_CLAIM',
    category: 'Unverified / Contradictory Compliance Claim',
    regex: /Zero Added Sugar or Glaze|Lab[- ]Checked|Verified Nutrition|FSSAI Aligned|Zero Fillers|chemical whitening|sulfur bleaching|synthetic MSG/gi,
  },
  {
    id: 'EM_DASH',
    category: 'Disallowed Em-Dash Character',
    regex: /\u2014/g,
  },
];

function collectFiles(dirPath, seenRealPaths, out) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') {
      continue;
    }
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath, seenRealPaths, out);
    } else if (entry.isFile() && ALLOWED_EXTENSIONS.has(path.extname(entry.name))) {
      const real = fs.realpathSync(fullPath);
      if (!seenRealPaths.has(real)) {
        seenRealPaths.add(real);
        out.push(fullPath);
      }
    }
  }
}

const files = [];
const seen = new Set();
for (const dir of SCAN_DIRS) {
  collectFiles(path.join(ROOT_DIR, dir), seen, files);
}

const draftFindings = [];
const forbiddenFindings = [];

for (const filePath of files) {
  const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);

  lines.forEach((lineText, idx) => {
    for (const check of CHECKS) {
      check.regex.lastIndex = 0;
      const matches = lineText.match(check.regex);
      if (!matches) continue;
      for (const match of matches) {
        const entry = {
          file: relPath,
          line: idx + 1,
          rule: check.id,
          category: check.category,
          match,
        };
        if (check.id === 'DRAFT_PLACEHOLDER') {
          draftFindings.push(entry);
        } else {
          forbiddenFindings.push(entry);
        }
      }
    }
  });
}

console.log(`Scanned ${files.length} files across ${SCAN_DIRS.join(', ')}.`);

if (forbiddenFindings.length > 0) {
  console.error(`\n[FAIL] Found ${forbiddenFindings.length} forbidden/leaked string(s):`);
  for (const f of forbiddenFindings) {
    console.error(`  - ${f.file}:${f.line} [${f.rule}] "${f.match}"`);
  }
} else {
  console.log('\n[PASS] Zero forbidden/fake/leaked strings found.');
}

if (draftFindings.length > 0) {
  console.error(`\n[BLOCKED FOR LAUNCH] Found ${draftFindings.length} draft placeholder(s) ({{...}}):`);
  for (const d of draftFindings) {
    console.error(`  - ${d.file}:${d.line} [${d.rule}] "${d.match}"`);
  }
} else {
  console.log('\n[PASS] Zero draft {{...}} placeholders found.');
}

if (forbiddenFindings.length > 0 || draftFindings.length > 0) {
  process.exit(1);
}

console.log('\nLaunch check passed!');
