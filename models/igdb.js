const axios = require('axios');

const clientId = '93ug1degpxnaga64g466c83nkeg6tv';
const clientSecret = 'mpi97u9ibmbc6e5vzznpdo47vcoypz';

async function getAccessToken() {
    const url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;

    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw error;
    }
}

module.exports = {getAccessToken};