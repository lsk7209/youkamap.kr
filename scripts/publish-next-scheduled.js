const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.join(__dirname, "..");
const articlesPath = path.join(root, "content", "articles.json");
const statePath = path.join(root, "content", "publish-state.json");

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const force = args.has("--force");
const nowArg = process.argv.find((arg) => arg.startsWith("--now="));
const now = nowArg ? new Date(nowArg.slice("--now=".length)) : new Date();

if (Number.isNaN(now.getTime())) {
  throw new Error(`Invalid --now value: ${nowArg}`);
}

const articles = JSON.parse(fs.readFileSync(articlesPath, "utf8"));
const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
const intervalMs = Number(state.intervalHours || 5) * 60 * 60 * 1000;
const lastPublishedAt = new Date(state.lastPublishedAt || 0);
const elapsed = now.getTime() - lastPublishedAt.getTime();

const next = articles
  .filter((article) => article.status === "scheduled")
  .sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt))[0];

const result = {
  now: now.toISOString(),
  intervalHours: state.intervalHours || 5,
  lastPublishedAt: state.lastPublishedAt,
  elapsedHours: Math.floor((elapsed / 60 / 60 / 1000) * 100) / 100,
  wouldPublish: Boolean(next && (force || elapsed >= intervalMs)),
  slug: next ? next.slug : null,
  title: next ? next.title : null,
  dryRun,
};

if (!next || (!force && elapsed < intervalMs)) {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

if (dryRun) {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

const idx = articles.findIndex((article) => article.slug === next.slug);
articles[idx] = {
  ...articles[idx],
  status: "published",
  publishedAt: now.toISOString(),
  date: new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", month: "2-digit", day: "2-digit" }).format(now).replace(/\s/g, "").replace(/\.$/, ""),
};
state.lastPublishedAt = now.toISOString();

fs.writeFileSync(articlesPath, `${JSON.stringify(articles, null, 2)}\n`, "utf8");
fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
execFileSync(process.execPath, [path.join(__dirname, "build-blog.js")], { stdio: "inherit", cwd: root });

console.log(JSON.stringify({ ...result, published: true }, null, 2));
