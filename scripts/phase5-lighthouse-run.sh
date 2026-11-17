#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p docs/phase5/lighthouse
PORT=3111 npm run serve > /tmp/yesbe-phase5-lighthouse-serve.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT

for _ in $(seq 1 100); do
  if curl -sf http://localhost:3111/ >/dev/null; then break; fi
  sleep 0.1
done

SPECS=(
  'home:/'
  'about:/about'
  'services:/services'
  'case-studies:/case-studies'
  'industry-healthcare:/industries/healthcare'
  'custom-software:/services/custom-software'
  'contact:/contact'
)

for spec in "${SPECS[@]}"; do
  name=${spec%%:*}
  path=${spec#*:}
  npm exec --yes --package=lighthouse@13.6.0 -- lighthouse "http://localhost:3111${path}" \
    --quiet --chrome-flags="--headless" --throttling-method=devtools \
    --only-categories=performance,accessibility,best-practices,seo \
    --output=json --output-path="docs/phase5/lighthouse/${name}.json"
done

node - <<'NODE'
const fs = require('node:fs');
const path = require('node:path');
const dir = 'docs/phase5/lighthouse';
const rows = [];
for (const file of fs.readdirSync(dir).filter((name) => name.endsWith('.json') && name !== 'summary.json').sort()) {
  const report = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  const { categories, audits } = report;
  rows.push({
    file,
    performance: Math.round(categories.performance.score * 100),
    accessibility: Math.round(categories.accessibility.score * 100),
    bestPractices: Math.round(categories['best-practices'].score * 100),
    seo: Math.round(categories.seo.score * 100),
    lcp: audits['largest-contentful-paint'].displayValue,
    cls: audits['cumulative-layout-shift'].displayValue,
  });
}
fs.writeFileSync(path.join(dir, 'summary.json'), `${JSON.stringify(rows, null, 2)}\n`);
for (const row of rows) {
  console.log(row.file.padEnd(34), row.performance, row.accessibility, row.bestPractices, row.seo, row.lcp, row.cls);
}
NODE
