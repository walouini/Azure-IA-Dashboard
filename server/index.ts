import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
const apiKey = process.env.AZURE_OPENAI_API_KEY!;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT!;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2024-02-15-preview";
const port = Number(process.env.PORT || 8787);

if (!endpoint || !apiKey || !deployment) {
  console.error("❌ Missing Azure OpenAI env vars. Check .env");
  process.exit(1);
}

// POST /api/chat
app.post("/api/chat", async (req, res) => {
  try {
    const { messages = [], temperature = 0.2 } = req.body || {};

    const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

    const azureRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        messages,
        temperature,
        // max_tokens: 512, // optionnel
      }),
    });

    if (!azureRes.ok) {
      const errText = await azureRes.text();
      console.error("Azure error:", azureRes.status, errText);
      return res.status(azureRes.status).send(errText);
    }

    const data = await azureRes.json();
    const reply = data?.choices?.[0]?.message?.content ?? "(pas de réponse)";
    res.json({ reply });
  } catch (e: any) {
    console.error(e);
    res.status(500).send(e?.message || "Server error");
  }
});

app.listen(port, () => {
  console.log(`✅ server running on http://localhost:${port}`);
});
