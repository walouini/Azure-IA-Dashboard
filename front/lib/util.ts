import type { ChatMessage } from "../component/ChatApp/ChatApp";

export async function sendChat(
  messages: ChatMessage[],
  opts: { temperature: number; systemPrompt: string | null; signal?: AbortSignal }
): Promise<string> {
  const payload = {
    messages: [
      ...(opts.systemPrompt
        ? [{ role: "system", content: opts.systemPrompt }]
        : []),
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ],
    temperature: opts.temperature,
  };

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: opts.signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }

  const json = (await res.json()) as { reply?: string };
  return json.reply ?? "(pas de réponse)";
}