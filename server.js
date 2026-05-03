require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// CORS - only needed in development
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

// In-memory wish storage
let wishes = [];

// OpenAI client (lazy init)
let openai = null;
function getOpenAI() {
  if (!openai && process.env.OPENAI_API_KEY) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

// ============ API ROUTES ============

// POST /wish - Add a new wish
app.post("/wish", (req, res) => {
  try {
    const { name, message, emoji } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are required" });
    }
    const wish = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      emoji: emoji || "💖",
      timestamp: new Date().toISOString(),
    };
    wishes.unshift(wish);
    // Keep only latest 100 wishes
    if (wishes.length > 100) wishes = wishes.slice(0, 100);
    res.json({ success: true, wish });
  } catch (error) {
    console.error("Error adding wish:", error);
    res.status(500).json({ error: "Failed to add wish" });
  }
});

// GET /wishes - Get all wishes
app.get("/wishes", (req, res) => {
  res.json({ wishes });
});

// POST /ai-message - Generate AI birthday message
app.post("/ai-message", async (req, res) => {
  try {
    const client = getOpenAI();
    if (!client) {
      // Return a beautiful fallback message if no API key
      const fallbackMessages = [
        "To the most incredible sister in the world — you are the melody in my life's song, the light that guides me through every storm. On this special day, I wish you nothing but the purest joy, the warmest love, and dreams that take flight like butterflies in spring. Happy Birthday, my forever friend. 💖✨",
        "Dearest sister, you are a constellation of kindness, strength, and beauty. Every moment with you is a gift I treasure beyond words. May this year bring you laughter that echoes through your days and love that wraps around you like the warmest embrace. Happy Birthday, my heart. 🌟💝",
        "To my beautiful sister — you are the sunrise that paints my world with color, the gentle breeze that carries away my worries. On your birthday, I celebrate not just a day, but the miracle of having you in my life. You deserve galaxies of happiness. Happy Birthday! 🦋✨💖",
      ];
      const randomMessage =
        fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
      return res.json({ message: randomMessage });
    }

    const { name, tone } = req.body;
    const sisterName = name || "my dear sister";
    const messageTone = tone || "deeply emotional and poetic";

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a heartfelt poet writing birthday messages. Write in a ${messageTone} tone. The message should be 3-4 sentences, deeply moving, and feel personal. Use beautiful metaphors and express genuine love.`,
        },
        {
          role: "user",
          content: `Write an emotional and beautiful birthday message for ${sisterName}, my beloved sister. Make it feel like it comes from the deepest part of my heart. Include some emojis naturally.`,
        },
      ],
      max_tokens: 300,
      temperature: 0.9,
    });

    res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error("AI message error:", error);
    res.json({
      message:
        "You are the most beautiful soul I know. Every day with you is a blessing, and today we celebrate the incredible person you are. Happy Birthday, my everything! 💖✨🌟",
    });
  }
});

// POST /tts - Text to speech
app.post("/tts", async (req, res) => {
  try {
    const client = getOpenAI();
    if (!client) {
      return res.status(503).json({ error: "TTS service not available. Please configure OPENAI_API_KEY." });
    }

    const { text, voice } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const mp3 = await client.audio.speech.create({
      model: "tts-1",
      voice: voice || "nova",
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": buffer.length,
    });
    res.send(buffer);
  } catch (error) {
    console.error("TTS error:", error);
    res.status(500).json({ error: "Failed to generate speech" });
  }
});

// ============ SERVE REACT BUILD ============
app.use(express.static(path.join(__dirname, "client/build")));

// Catch-all route — serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`✨ Birthday Experience server running on port ${PORT}`);
  console.log(`🎂 Open http://localhost:${PORT} in your browser`);
  if (!process.env.OPENAI_API_KEY) {
    console.log("⚠️  No OPENAI_API_KEY set — AI features will use fallback messages");
  }
});
