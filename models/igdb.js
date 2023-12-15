//client secret: 73e8glvmrl55z9q7ckwhj7wdo9tplz
//client ID: 93ug1degpxnaga64g466c83nkeg6tv
//URL:

const axios = require('axios');

const clientId = '93ug1degpxnaga64g466c83nkeg6tvD'; // Replace with your actual Client ID
const clientSecret = '73e8glvmrl55z9q7ckwhj7wdo9tplz'; // Replace with your actual Client Secret

async function getAccessToken() {
    try {
        const url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;
        const response = await axios.post(url, null);
        const accessToken = response.data.access_token;
        console.log('Access Token:', accessToken);
        return accessToken;
    } catch (error) {
        console.error('Error fetching access token:', error);
        return null;
    }
}

// Call the function to test it
getAccessToken();