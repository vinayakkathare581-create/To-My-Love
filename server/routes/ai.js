const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/ai-message
router.post('/ai-message', async (req, res) => {
    try {
        const { name } = req.body;
        const recipientName = name || 'My Everything';

        const prompt = `Write a deeply emotional, cinematic, and loving birthday message for my sister, ${recipientName}. 
It should be about 3-4 paragraphs long. The tone should be heartfelt, expressing how much she means to me, 
recalling the bond we share, and wishing her the best for the future. Make it sound genuine and poetic but not overly cliché.`;

        // Check if API key is provided
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
             return res.json({ 
                 message: `Happy Birthday, ${recipientName}! (This is a fallback message because the OpenAI API key is missing. Add your key in the server/.env file to generate dynamic messages.) You mean the world to me, and I hope this year brings you as much joy as you bring to everyone around you.` 
             });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        res.json({ message: completion.choices[0].message.content });
    } catch (error) {
        console.error('OpenAI Error:', error);
        res.status(500).json({ error: 'Failed to generate message' });
    }
});

// POST /api/tts
router.post('/tts', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
            return res.status(503).json({ error: 'OpenAI API key missing. TTS disabled.' });
        }

        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "nova", // Nova has a warm, emotional tone
            input: text,
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());
        
        // Send back as base64 for easy frontend audio playback
        const base64Audio = buffer.toString('base64');
        res.json({ audio: `data:audio/mp3;base64,${base64Audio}` });
    } catch (error) {
        console.error('TTS Error:', error);
        res.status(500).json({ error: 'Failed to generate speech' });
    }
});

module.exports = router;
