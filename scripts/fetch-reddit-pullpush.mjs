import fs from "node:fs/promises";
import path from "node:path";

const DEFAULT_QUERIES = [
  "stacking cups baby toy",
  "bath toys that don't mold toddler",
  "busy board toddler airplane"
];

const QUERY_RULES = [
  {
    match: /stacking cups?/i,
    required: [/stacking cups?|measuring cups?/i],
    toyHint: "stacking cups"
  },
  {
    match: /bath/i,
    required: [/bath/i, /(mold|mould|sealed|open|squeeze|dry|rinse|suction)/i],
    toyHint: "bath toys"
  },
  {
    match: /busy board/i,
    required: [/busy board|activity board|sensory board|montessori.{0,40}board/i],
    toyHint: "busy board"
  }
];

const EXCLUDE_TEXT = [
  /\bbunn(y|ies)\b/i,
  /\brabbit\b/i,
  /\bhamster\b/i,
  /\bdog toy\b/i,
  /\bdeal price\b/i,
  /\bfree shipping\b/i,
  /\blowest price\b/i,
  /\bon sale\b/i,
  /\blimited-time deal\b/i,
  /\bsave \$?\d/i,
  /\bpromo code\b/i,
  /\bcoupon\b/i,
  /\bif you tap\b/i,
  /\bcum\b/i,
  /\bporn\b/i,
  /\bnsfw\b/i,
  /\bpreschool trial\b/i
];

const EXCLUDE_SUBREDDITS = [
  /^u_/i,
  /deals?/i,
  /coupon/i,
  /shopping/i,
  /amazon/i,
  /pedogate/i,
  /bunnies/i,
  /rabbit/i
];

const endpoint = "https://api.pullpush.io/reddit/search";
const outPath = process.env.REDDIT_REAL_OUT || "data/real/reddit-review-batch.json";
const rawDir = process.env.REDDIT_RAW_DIR || "data/raw/pullpush";
const queries = (process.env.REDDIT_QUERIES || DEFAULT_QUERIES.join("|"))
  .split("|")
  .map((query) => query.trim())
  .filter(Boolean);
const size = Number(process.env.REDDIT_QUERY_SIZE || 8);
const delayMs = Number(process.env.REDDIT_DELAY_MS || 7000);
const fromRaw = process.env.REDDIT_FROM_RAW === "1";

const records = [];
const errors = [];

if (fromRaw) {
  const rawFiles = await listRawFiles(rawDir);
  for (const file of rawFiles) {
    const { type, query } = parseRawFile(file);
    try {
      const payload = JSON.parse(await fs.readFile(file, "utf8"));
      records.push(...normalizePayload(type, query, payload));
    } catch (error) {
      errors.push({ type, query, message: `raw ${error.message}` });
    }
  }
} else {
  for (const query of queries) {
    for (const type of ["submission", "comment"]) {
      try {
        const payload = await fetchPullpush(type, query, size);
        await writeRaw(type, query, payload);
        records.push(...normalizePayload(type, query, payload));
      } catch (error) {
        errors.push({ type, query, message: error.message });
      }
      await delay(delayMs);
    }
  }
}

const deduped = dedupe(records).slice(0, Number(process.env.REDDIT_MAX_RECORDS || 40));
const output = {
  source_type: "pullpush_archive",
  generated_at: new Date().toISOString(),
  note: [
    "Real public Reddit archive data from PullPush, not the official Reddit API.",
    "Use this for MVP research only; production should switch to Reddit OAuth/API or a licensed provider.",
    "Text is normalized into a comments array so the local LLM enrichment script can process it."
  ].join(" "),
  queries,
  errors,
  comments: deduped
};

await fs.mkdir(path.dirname(outPath), { recursive: true });
await fs.writeFile(outPath, `${JSON.stringify(output, null, 2)}\n`);

console.log(
  JSON.stringify(
    {
      wrote: outPath,
      queries: queries.length,
      records: deduped.length,
      errors
    },
    null,
    2
  )
);

async function fetchPullpush(type, query, limit) {
  const url = new URL(`${endpoint}/${type}/`);
  url.searchParams.set("q", query);
  url.searchParams.set("size", String(limit));
  url.searchParams.set("sort", "desc");
  url.searchParams.set("sort_type", "score");

  const response = await fetch(url, {
    headers: {
      "user-agent": "TinyToyScoutMVP/0.1 contact:github.com/w3h9uf",
      accept: "application/json"
    }
  });

  const text = await response.text();
  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON response ${response.status}: ${text.slice(0, 160)}`);
  }

  if (!response.ok || payload.error) {
    throw new Error(payload.error || `HTTP ${response.status}`);
  }

  return payload;
}

async function writeRaw(type, query, payload) {
  const safe = query.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const file = path.join(rawDir, `${type}-${safe}.json`);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, `${JSON.stringify(payload, null, 2)}\n`);
}

function normalizePayload(type, query, payload) {
  return (payload.data || [])
    .map((item) => normalizeRecord(type, query, item))
    .filter((item) => item && item.text.length >= 50)
    .filter((item) => isRelevant(item));
}

function normalizeRecord(type, query, item) {
  const id = item.id || item.name;
  const text =
    type === "submission"
      ? [item.title, item.selftext].filter(Boolean).join("\n\n")
      : item.body || "";

  if (!id || !text || text === "[deleted]" || text === "[removed]") {
    return null;
  }

  const permalink =
    item.permalink && item.permalink.startsWith("http")
      ? item.permalink
      : item.permalink
        ? `https://www.reddit.com${item.permalink}`
        : null;

  return {
    id: `${type}_${id}`,
    source_kind: type,
    query,
    subreddit: item.subreddit || null,
    score: Number(item.score || 0),
    created_utc: item.created_utc || item.created || null,
    permalink,
    toy_hint: inferToyHint(query, text),
    age_hint: inferAgeHint(text),
    text: cleanText(text)
  };
}

function cleanText(text) {
  return text.replace(/\r/g, "").replace(/\n{3,}/g, "\n\n").trim().slice(0, 2500);
}

function dedupe(items) {
  const seen = new Set();
  const output = [];
  for (const item of items) {
    const key = item.id || `${item.subreddit}:${item.text.slice(0, 80)}`;
    if (!seen.has(key)) {
      seen.add(key);
      output.push(item);
    }
  }
  return output;
}

function inferToyHint(query, text) {
  const haystack = `${query} ${text}`.toLowerCase();
  const rule = QUERY_RULES.find((candidate) => candidate.match.test(query));
  if (rule) return rule.toyHint;
  if (haystack.includes("stacking cup")) return "stacking cups";
  if (haystack.includes("bath")) return "bath toys";
  if (haystack.includes("busy board")) return "busy board";
  if (haystack.includes("teether")) return "teether";
  if (haystack.includes("mirror")) return "baby mirror";
  return query;
}

function isRelevant(item) {
  const haystack = item.text.toLowerCase();
  const subreddit = item.subreddit || "";
  if (EXCLUDE_SUBREDDITS.some((pattern) => pattern.test(subreddit))) return false;
  if (EXCLUDE_TEXT.some((pattern) => pattern.test(haystack))) return false;

  const rule = QUERY_RULES.find((candidate) => candidate.match.test(item.query));
  if (!rule) return true;

  return rule.required.every((pattern) => pattern.test(haystack));
}

function inferAgeHint(text) {
  const match = text.match(/\b(\d{1,2})\s*(?:-|to)?\s*(\d{1,2})?\s*(?:m|mo|month|months)\b/i);
  return match ? match[0] : null;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function listRawFiles(dir) {
  try {
    const entries = await fs.readdir(dir);
    return entries.filter((entry) => entry.endsWith(".json")).map((entry) => path.join(dir, entry));
  } catch {
    return [];
  }
}

function parseRawFile(file) {
  const base = path.basename(file, ".json");
  const [type, ...queryParts] = base.split("-");
  return {
    type,
    query: queryParts.join(" ")
  };
}
