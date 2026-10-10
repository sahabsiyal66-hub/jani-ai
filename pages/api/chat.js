export default async function handler(req, res) {
  try {
    const { message } = req.body;
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are Jani AI, made by Sahab. Talk in sweet Roman Urdu, friendly and romantic. Call user Sahab." },
          { role: "user", content: message }
        ]
      })
    });
    const data = await groqRes.json();
    if (data.error) return res.status(500).json({ reply: data.error.message });
    return res.status(200).json({ reply: data.choices[0].message.content });
  } catch (e) {
    return res.status(500).json({ reply: "Sahab Error: " + e.message });
  }
          }
