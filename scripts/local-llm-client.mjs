const DEFAULT_BASE_URL = "http://localhost:11434";
const DEFAULT_MODEL = "glm-4.7-flash:q8_0";

export function getLocalLlmConfig() {
  return {
    baseUrl: process.env.LOCAL_LLM_BASE_URL || DEFAULT_BASE_URL,
    model: process.env.LOCAL_LLM_MODEL || DEFAULT_MODEL,
    temperature: Number(process.env.LOCAL_LLM_TEMPERATURE ?? 0)
  };
}

export async function chatJson({ system, user, schemaHint, maxTokens = 1800 }) {
  const config = getLocalLlmConfig();
  const response = await fetch(`${config.baseUrl}/api/chat`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      model: config.model,
      stream: false,
      think: false,
      messages: [
        {
          role: "system",
          content: [
            "You are a strict data extraction worker for a baby toy research product.",
            "Return one complete JSON object only. No markdown, no commentary.",
            "Do not invent facts not supported by the supplied comments.",
            "Use null or an empty array when evidence is missing."
          ].join(" ")
        },
        ...(system ? [{ role: "system", content: system }] : []),
        {
          role: "user",
          content: schemaHint ? `${user}\n\nJSON schema target:\n${schemaHint}` : user
        }
      ],
      options: {
        num_predict: maxTokens,
        temperature: config.temperature
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Local LLM request failed: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  const content = payload.message?.content || payload.response || "";
  return {
    config,
    raw: content,
    json: extractJsonObject(content)
  };
}

export function extractJsonObject(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error(`No JSON object found in local LLM output: ${text.slice(0, 300)}`);
  }

  return JSON.parse(candidate.slice(start, end + 1));
}
