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

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
