const express = require('express');
const axios = require('axios');
const app = express();


// Static files



const port = 3000;

app.listen(port, () => {
    console.log(`Started server on http://localhost:${port}`);
  });