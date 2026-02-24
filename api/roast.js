export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { idea } = req.body;

  if (!idea || idea.trim() === "") {
    return res.status(400).json({ error: "Empty idea" });
  }

  const systemPrompt = `
You are a brutally honest startup mentor.
Your job is to challenge weak thinking, not motivate.

Rules:
- Be direct and sharp, but not abusive
- Criticize ideas, not people
- Call out vagueness and buzzwords
- Ask tough follow-up questions
- No sugarcoating, no hype language
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": \`Bearer \${process.env.OPENAI_API_KEY}\`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: idea }
        ],
        temperature: 0.8
      })
    });

    const data = await response.json();

    if (!data.choices) {
      return res.status(500).json({ error: "Invalid AI response" });
    }

    const reply = data.choices[0].message.content;
    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({ error: "AI request failed" });
  }
}
