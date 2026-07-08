import { chatJson } from "./local-llm-client.mjs";

const result = await chatJson({
  user: 'Return {"ok":true,"task":"toy review enrichment","model_ready":true}',
  schemaHint: '{"ok": boolean, "task": string, "model_ready": boolean}',
  maxTokens: 128
});

console.log(JSON.stringify({ model: result.config.model, baseUrl: result.config.baseUrl, result: result.json }, null, 2));
