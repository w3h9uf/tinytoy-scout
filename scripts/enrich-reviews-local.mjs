import fs from "node:fs/promises";
import path from "node:path";
import { chatJson } from "./local-llm-client.mjs";

const inputPath = process.argv[2] || "data/review-samples.json";
const outputPath = process.argv[3] || "data/generated/local-llm-enrichment-sample.json";
const maxRecords = Number(process.env.LLM_ENRICH_MAX_RECORDS || 16);
const maxTextChars = Number(process.env.LLM_ENRICH_MAX_TEXT_CHARS || 900);

const input = compactInput(JSON.parse(await fs.readFile(inputPath, "utf8")));

const schemaHint = `{
  "run_type": "local_llm_review_enrichment",
  "items": [
    {
      "toy_group": "string",
      "detected_products": ["string"],
      "age_bands": ["string"],
      "sentiment": {"positive": number, "mixed": number, "negative": number},
      "repeated_praise": ["string"],
      "common_complaints": ["string"],
      "safety_watchouts": ["string"],
      "cleaning_watchouts": ["string"],
      "avoid_if": ["string"],
      "parent_fit": "string",
      "confidence": "High | Medium | Low",
      "evidence_comment_ids": ["string"]
    }
  ]
}`;

const user = [
  "Extract structured baby/toddler toy review signals from the supplied comment batch.",
  "Only use the supplied comments as evidence.",
  "Do not claim these are real Reddit comments unless source_type says reddit_export.",
  "Group records by toy_hint. Do not merge unrelated toy mentions into the wrong toy_group.",
  "For detected_products, include only products or product-like names that belong to that toy_group.",
  "If one comment mentions several toys, use it as evidence only for the matching toy_hint unless the text clearly compares them.",
  "Ignore off-topic travel, safety, or parenting advice that is not about the toy itself.",
  "Keep bullets short and parent-facing.",
  "",
  JSON.stringify(input, null, 2)
].join("\n");

const result = await chatJson({
  user,
  schemaHint,
  maxTokens: 2400
});

const output = {
  generatedAt: new Date().toISOString(),
  model: result.config.model,
  baseUrl: result.config.baseUrl,
  inputPath,
  sourceType: input.source_type,
  inputRecordCount: input.comments?.length || 0,
  maxRecords,
  maxTextChars,
  ...normalizeEnrichment(result.json)
};

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${outputPath}`);

function normalizeEnrichment(enrichment) {
  return {
    ...enrichment,
    items: enrichment.items?.map((item) => ({
      ...item,
      sentiment: normalizeSentiment(item.sentiment)
    }))
  };
}

function normalizeSentiment(sentiment = {}) {
  const positive = Number(sentiment.positive || 0);
  const mixed = Number(sentiment.mixed || 0);
  const negative = Number(sentiment.negative || 0);
  const total = positive + mixed + negative;

  if (total === 0) {
    return { positive: 0, mixed: 0, negative: 0 };
  }

  return {
    positive: Math.round((positive / total) * 100),
    mixed: Math.round((mixed / total) * 100),
    negative: Math.max(0, 100 - Math.round((positive / total) * 100) - Math.round((mixed / total) * 100))
  };
}

function compactInput(raw) {
  const comments = (raw.comments || [])
    .slice(0, maxRecords)
    .map((comment) => ({
      id: comment.id,
      source_kind: comment.source_kind,
      query: comment.query,
      subreddit: comment.subreddit,
      score: comment.score,
      created_utc: comment.created_utc,
      permalink: comment.permalink,
      toy_hint: comment.toy_hint,
      age_hint: comment.age_hint,
      text: String(comment.text || "").slice(0, maxTextChars)
    }));

  return {
    source_type: raw.source_type,
    note: raw.note,
    queries: raw.queries,
    comments
  };
}
