require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const wishesRouter = require('./routes/wishes');
const aiRouter = require('./routes/ai');

app.use('/api', wishesRouter);
app.use('/api', aiRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
