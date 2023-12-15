const express = require('express');
const igdb = require('./models/igdb.js');
const app = express();


// Serve static webpage and files
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Routes here VVVV
// Authenticate with IGDB API Route
app.get('/authenticate', async (req, res) => {
  try {
      const tokenResponse = await igdb.getAccessToken();
      console.log('Token Response', tokenResponse);
      res.json({ tokenResponse });
  } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).send('Authentication failed');
  }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Started server on http://localhost:${port}`);
  });