import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GOOGLE_GEMINI_API_KEY is not configured");
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const generatedText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error("No generated text received from API");
    }

    res.status(200).json({
      generated_text: generatedText,
    });
  } catch (error) {
    console.error(
      "Error communicating with Gemini API:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Error communicating with Gemini API",
      details: error.response?.data?.error || error.message,
    });
  }
}
