# YouTube SEO Optimizer

Advanced YouTube optimization tool with A/B testing, analytics integration, and automated metadata management.

## 🚀 Features

### A. Optimization Actions (YouTube Data API)
- **A/B Test Titles & Descriptions**: Programmatically test different metadata combinations
- **Automated Tag Management**: Bulk update tags across hundreds of videos
- **Playlist Automation**: Auto-organize videos to increase session time
- **Bulk Thumbnail Testing**: Test different thumbnails for maximum CTR

### B. Data-Driven Strategy (YouTube Analytics API)
- **High-Impact Keywords**: Identify search terms driving traffic
- **Audience Retention Analysis**: Auto-flag videos with drop-off points
- **Cross-Platform Tracking**: Integrate with external traffic sources
- **A/B Test Results**: Automated performance reporting

## 🛠️ Setup

1. **Clone the repository**
```bash
git clone https://github.com/Aviator456ghj/youtube-seo-optimizer.git
cd youtube-seo-optimizer
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure YouTube API**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable YouTube Data API v3 and YouTube Analytics API
   - Create credentials (OAuth 2.0 Client ID)
   - Download credentials JSON

4. **Environment Setup**
```bash
cp .env.example .env
# Edit .env with your API credentials
```

5. **Run the application**
```bash
npm run dev
```

## 📊 Dashboard Features

- **Video Management**: Bulk edit titles, descriptions, tags
- **A/B Testing**: Set up and monitor title/thumbnail tests
- **Analytics Dashboard**: Real-time performance metrics
- **Automation Rules**: Set up automated optimizations
- **Keyword Research**: Discover high-impact search terms

## 🔧 API Endpoints

### YouTube Operations
- `POST /api/youtube/videos/update` - Update video metadata
- `GET /api/youtube/videos/:id` - Get video details
- `POST /api/youtube/videos/bulk-update` - Bulk update multiple videos

### Analytics
- `GET /api/analytics/search-terms` - Get search traffic data
- `GET /api/analytics/retention/:videoId` - Get audience retention
- `GET /api/analytics/performance` - Overall channel performance

### A/B Testing
- `POST /api/abtest/create` - Create new A/B test
- `GET /api/abtest/results/:testId` - Get test results
- `PUT /api/abtest/stop/:testId` - Stop running test

## 🚀 Deployment

### Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Vercel
```bash
vercel --prod
```

### Docker
```bash
docker build -t youtube-seo-optimizer .
docker run -p 3000:3000 youtube-seo-optimizer
```

## 📈 Usage Examples

### A/B Test Video Titles
```javascript
// Create A/B test
const test = await fetch('/api/abtest/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    videoId: 'your-video-id',
    titleA: 'Beginner Guitar Lesson',
    titleB: 'How to Play Guitar: First 5 Riffs You Need to Know',
    duration: 7 // days
  })
});
```

### Bulk Update Tags
```javascript
// Update tags for multiple videos
const update = await fetch('/api/youtube/videos/bulk-update', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    videos: ['video-id-1', 'video-id-2'],
    tags: ['guitar', 'music', 'tutorial', 'beginner']
  })
});
```

## 🔐 Security

- OAuth 2.0 authentication with YouTube
- API rate limiting
- Secure credential storage
- CORS protection

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

- Create an issue for bug reports
- Join our Discord for community support
- Check the wiki for detailed documentation