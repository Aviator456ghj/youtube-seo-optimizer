const express = require('express');
const { google } = require('googleapis');
const router = express.Router();

const youtube = google.youtube('v3');

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI
);

// Get authorization URL
router.get('/auth', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/youtube',
      'https://www.googleapis.com/auth/youtube.force-ssl',
      'https://www.googleapis.com/auth/youtubepartner'
    ]
  });
  res.json({ authUrl });
});

// Handle OAuth callback
router.post('/auth/callback', async (req, res) => {
  try {
    const { code } = req.body;
    const { tokens } = await oauth2Client.getAccessToken(code);
    oauth2Client.setCredentials(tokens);
    
    // Store tokens securely (implement your storage logic)
    res.json({ success: true, message: 'Authentication successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get video details
router.get('/videos/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    
    const response = await youtube.videos.list({
      auth: oauth2Client,
      part: ['snippet', 'statistics', 'status'],
      id: [videoId]
    });

    if (response.data.items.length === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json(response.data.items[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update video metadata (A/B Testing Core)
router.put('/videos/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    const { title, description, tags, categoryId } = req.body;

    const updateData = {
      id: videoId,
      snippet: {}
    };

    if (title) updateData.snippet.title = title;
    if (description) updateData.snippet.description = description;
    if (tags) updateData.snippet.tags = tags;
    if (categoryId) updateData.snippet.categoryId = categoryId;

    const response = await youtube.videos.update({
      auth: oauth2Client,
      part: ['snippet'],
      requestBody: updateData
    });

    res.json({
      success: true,
      video: response.data,
      message: 'Video updated successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bulk update videos
router.post('/videos/bulk-update', async (req, res) => {
  try {
    const { videos, updates } = req.body;
    const results = [];

    for (const videoId of videos) {
      try {
        const updateData = {
          id: videoId,
          snippet: { ...updates }
        };

        const response = await youtube.videos.update({
          auth: oauth2Client,
          part: ['snippet'],
          requestBody: updateData
        });

        results.push({
          videoId,
          success: true,
          data: response.data
        });
      } catch (error) {
        results.push({
          videoId,
          success: false,
          error: error.message
        });
      }
    }

    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get channel videos
router.get('/channel/videos', async (req, res) => {
  try {
    const { maxResults = 50, pageToken } = req.query;

    // First get channel ID
    const channelResponse = await youtube.channels.list({
      auth: oauth2Client,
      part: ['id'],
      mine: true
    });

    const channelId = channelResponse.data.items[0].id;

    // Get channel videos
    const response = await youtube.search.list({
      auth: oauth2Client,
      part: ['snippet'],
      channelId,
      type: 'video',
      order: 'date',
      maxResults: parseInt(maxResults),
      pageToken
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update thumbnail
router.post('/videos/:videoId/thumbnail', async (req, res) => {
  try {
    const { videoId } = req.params;
    const { thumbnailUrl } = req.body;

    // Note: This requires uploading the thumbnail file
    // Implementation depends on your file upload strategy
    
    res.json({
      success: true,
      message: 'Thumbnail update endpoint ready',
      note: 'Implement file upload for thumbnail updates'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;