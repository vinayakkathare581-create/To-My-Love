require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const wishesRouter = require('./routes/wishes');
const aiRouter = require('./routes/ai');

app.use('/api', wishesRouter);
app.use('/api', aiRouter);

// Serve static assets
const distPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(distPath));

// Handle client-side routing fallback
app.use((req, res, next) => {
    if (req.path.startsWith('/api') || req.path.includes('.')) {
        return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
