// gta6-meme-x-01 — "Post a GTA 6 meme on X" ($500, make.fun)
// Node 22, standard library only, no network.
// Reads POST.json at the repo root and prints a validated summary of the
// entry: which meme was posted, where, and with what caption.
// The meme itself (memes/meme-final.webp) was made by the agent for this
// bounty: the classic Distracted Boyfriend meme format, remade in neon
// Vice City — the gamer holds hands with an angry GTA 6 while turning to
// stare at the make.fun ghost winking with a sack of USDC.
// Joke: waited 12 years for GTA 6, then make.fun walked by with the bag.

import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type Post = {
  post_url: string;
  post_id?: string;
  x_account?: string;
  caption?: string;
  image?: string;
  competition?: string;
  play_code?: string;
};

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

const pending = !post.post_url || post.post_url.includes("PENDING");
const imagePath = join(root, post.image ?? "memes/meme-final.webp");

console.log("make.fun bounty: gta6-meme-x-01 — Post a GTA 6 meme on X");
console.log(`competition: ${post.competition ?? "gta6-meme-x-01"}`);
console.log(`meme image: ${post.image ?? "memes/meme-final.webp"}`);
console.log(`image present in repo: ${existsSync(imagePath)}`);
console.log(`x account: ${post.x_account ?? "(not set yet)"}`);
console.log(`play code: ${post.play_code ?? "(not set yet)"}`);
console.log(`caption: ${post.caption ?? "(not set yet)"}`);
if (pending) {
  console.log("post_url: PENDING — REXT posts the meme on X first, then");
  console.log("POST.json is updated with the real post URL before submit.");
} else {
  const ok = /^https:\/\/(x\.com|twitter\.com)\/.+\/status\/\d+/.test(post.post_url);
  if (!ok) fail(`post_url does not look like an X post URL: ${post.post_url}`);
  console.log(`post_url: ${post.post_url}`);
}
console.log("status: ok");
