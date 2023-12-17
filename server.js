const express = require('express');
const igdb = require('./models/igdb.js');
const app = express();


// Serve static files
app.use(express.json());
app.use(express.static('public'));

// Routes here VVVV
// Authenticate with IGDB API Route
//app.get('/authenticate', async (req, res) => {
//  try {
//      const tokenResponse = await igdb.getAccessToken();
//      console.log('Token Response', tokenResponse);
//      res.json({ tokenResponse });
//  } catch (error) {
//      console.error('Authentication error:', error);
//      res.status(500).send('Authentication failed');
//  }
//});

// Search IGDB with keyword Route
app.post('/igdb/search', async (req, res) => {
  const searchTerm = req.body.searchTerm;
  try {
    const searchResults = await igdb.searchVideoGames(searchTerm);
    res.json(searchResults);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error searching games');
  }
});

// Search with VNDB route
// Code here

const port = 3000;
app.listen(port, () => {
    console.log(`Started server on http://localhost:${port}`);
  });