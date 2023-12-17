const axios = require('axios');

const clientId = '93ug1degpxnaga64g466c83nkeg6tv';
const clientSecret = 'mpi97u9ibmbc6e5vzznpdo47vcoypz';

// Get access token function
async function getAccessToken() {
    const url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;

    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Search by genre function
async function searchVideoGames(genre) {
    const accessTokenData = await getAccessToken();
    const accessToken = accessTokenData.access_token;   
    console.log(accessToken);

    const apiUrl = "https://api.igdb.com/v4/games";
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`,
        },
        data: `fields name, genres, url, first_release_date; limit 5; where genres = (${genre}); sort first_release_date desc;`
    };

    try {
        const response = await axios(apiUrl, options);
        const games = response.data;

        // Convert UNIX time format to MM/DD/YYYY
        games.forEach(game => {
            if (game.first_release_date) {
                game.first_release_date = new Date(game.first_release_date * 1000).toLocaleDateString("en-US");
            }
        });

        return games;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


// Genres
//{ id: 2, name: 'Point-and-click' },
//{ id: 4, name: 'Fighting' },
//{ id: 5, name: 'Shooter' },
//{ id: 7, name: 'Music' },
//{ id: 8, name: 'Platform' },
//{ id: 9, name: 'Puzzle' },
//{ id: 10, name: 'Racing' },
//{ id: 11, name: 'Real Time Strategy (RTS)' },
//{ id: 12, name: 'Role-playing (RPG)' },
//{ id: 13, name: 'Simulator' },
//{ id: 14, name: 'Sport' },
//{ id: 15, name: 'Strategy' },
//{ id: 16, name: 'Turn-based strategy (TBS)' },
//{ id: 24, name: 'Tactical' },
//{ id: 25, name: "Hack and slash/Beat 'em up" },
//{ id: 26, name: 'Quiz/Trivia' },
//{ id: 30, name: 'Pinball' },
//{ id: 31, name: 'Adventure' },
//{ id: 32, name: 'Indie' },
//{ id: 33, name: 'Arcade' },
//{ id: 34, name: 'Visual Novel' },
//{ id: 35, name: 'Card & Board Game' },
//{ id: 36, name: 'MOBA' }

// Testing
const genre = '36';
searchVideoGames(genre)
    .then(data => {
        console.log('Search Results:', data);
    })

module.exports = {getAccessToken, searchVideoGames};