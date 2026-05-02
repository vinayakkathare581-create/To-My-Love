const express = require('express');
const router = express.Router();

// In-memory storage for simplicity (can be upgraded to DB or JSON file)
const wishes = [];

// POST /api/wish - Save a wish
router.post('/wish', (req, res) => {
    try {
        const { author, text, emoji } = req.body;
        
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        const newWish = {
            id: Date.now().toString(),
            author: author || 'Anonymous',
            text,
            emoji: emoji || '💖',
            timestamp: new Date().toISOString()
        };

        wishes.push(newWish);
        res.status(201).json(newWish);
    } catch (error) {
        console.error('Error saving wish:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/wishes - Retrieve all wishes
router.get('/wishes', (req, res) => {
    try {
        res.status(200).json(wishes);
    } catch (error) {
        console.error('Error retrieving wishes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
