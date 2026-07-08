# Local LLM Pipeline

TinyToy Scout uses a local Ollama model as the first-pass review extraction worker.

## Host

Ollama is expected at:

```text
http://localhost:11434
```

Current default model:

```text
glm-4.7-flash:q8_0
```

This machine also has larger local models available, including `glm-4.5-air:q5_k_m`, but the 31 GB GLM Flash model is the practical default for repeated enrichment runs.

## Commands

```bash
npm run llm:check
npm run llm:enrich
```

`llm:enrich` reads `data/review-samples.json` and writes:

```text
data/generated/local-llm-enrichment-sample.json
```

## Environment

Copy `.env.example` values into your shell if you want to override the defaults:

```bash
export LOCAL_LLM_BASE_URL=http://localhost:11434
export LOCAL_LLM_MODEL=glm-4.7-flash:q8_0
export LOCAL_LLM_TEMPERATURE=0
```

## Production Shape

1. Collect licensed Reddit/API exports with comment IDs, URLs, timestamps, subreddit, score, and raw text.
2. Batch comments by toy group and intent.
3. Use the local LLM to extract product mentions, repeated praise, complaints, cleaning risks, and safety watchouts.
4. Keep `evidence_comment_ids` with every summary.
5. Run deterministic scoring and CPSC recall checks outside the LLM.
6. Publish only summaries that can be traced back to source comments and safety checks.
