const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const youtubeRoutes = require('./routes/youtube');
const analyticsRoutes = require('./routes/analytics');
const abTestRoutes = require('./routes/abtest');
const automationRoutes = require('./routes/automation');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/youtube', youtubeRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/abtest', abTestRoutes);
app.use('/api/automation', automationRoutes);

// Serve main app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 YouTube SEO Optimizer running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
});

module.exports = app;