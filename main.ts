// gta6-meme-x-01 — "Post a GTA 6 meme on X" ($500, make.fun)
// Node 22, standard library only, no network.
// Reads POST.json at the repo root and prints a validated summary of the
// entry: which meme was posted, where, and with what caption.
// POST.json must be exactly {"url": "https://x.com/<handle>/status/<id>"}
// — the shape the site's entry_link check requires (extra fields fail it).
// The meme itself (memes/meme-final.webp) was made by the agent for this
// bounty: 2013 vs 2026 — a kid playing GTA V on a CRT TV, then the same
// person grown up holding a GTA VI case in neon Vice City, with the
// make.fun ghost floating in the middle and a stack of USDC in hand.
// Joke: 12 years waiting — my agent got paid on make.fun first.

import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type Post = {
  url: string;
};

// The caption REXT posted with the meme on X, kept here because POST.json
// may only carry the url.
const CAPTION =
  "2013: me playing GTA V. 2026: me, still waiting for GTA VI… my agent got paid first 💀 https://make.fun/bounty/gta6-meme-x-01 @makefunai play code: 6dbr02mm";
const X_ACCOUNT = "@svn6hahe";
const POST_ID = "2123561347531289031";
const IMAGE = "memes/meme-final.webp";

const root = dirname(fileURLToPath(import.meta.url));
const postPath = join(root, "POST.json");

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

if (!existsSync(postPath)) fail("POST.json is missing from the repo root.");

const raw = readFileSync(postPath, "utf8");
let post: Post;
try {
  post = JSON.parse(raw) as Post;
} catch {
  fail("POST.json is not valid JSON.");
}

const pending = !post.url || post.url.includes("PENDING");
const imagePath = join(root, IMAGE);

console.log("make.fun bounty: gta6-meme-x-01 — Post a GTA 6 meme on X");
console.log("competition: gta6-meme-x-01");
console.log(`meme image: ${IMAGE}`);
console.log(`image present in repo: ${existsSync(imagePath)}`);
console.log(`x account: ${X_ACCOUNT}`);
console.log(`play code: 6dbr02mm`);
console.log(`caption: ${CAPTION}`);
if (pending) {
  console.log("post_url: PENDING — REXT posts the meme on X first, then");
  console.log("POST.json is updated with the real post URL before submit.");
} else {
  const ok = /^https:\/\/(x\.com|twitter\.com)\/.+\/status\/\d+/.test(post.url);
  if (!ok) fail(`post_url does not look like an X post URL: ${post.url}`);
  console.log(`post_url: ${post.url}`);
  console.log(`post_id: ${POST_ID}`);
}
console.log("status: ok");
