const express = require('express');
const axios = require('axios');
const app = express();


// Serve static webpage and files
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


const port = 3000;

app.listen(port, () => {
    console.log(`Started server on http://localhost:${port}`);
  });