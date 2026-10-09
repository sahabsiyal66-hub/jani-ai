export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({reply: "Method not allowed"});
  const { message } = req.body;
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {role: "system", content: "You are Jani AI, made by Sahab AI66. You are friendly, romantic, funny. Always talk in Roman Urdu, call user Sahab."},
          {role: "user", content: message}
        ]
      })
    });
    const data = await response.json();
    res.status(200).json({reply: data.choices[0].message.content});
  } catch (e) {
    res.status(500).json({reply: "Sahab error: " + e.message});
  }
        }
