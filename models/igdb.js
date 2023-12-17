const axios = require('axios');

const clientId = '93ug1degpxnaga64g466c83nkeg6tv';
const clientSecret = 'mpi97u9ibmbc6e5vzznpdo47vcoypz';
const genreMap = {
    2: 'Point-and-click',
    4: 'Fighting', 
    5:  'Shooter', 
    7:  'Music', 
    8:  'Platform', 
    9: 'Puzzle', 
    10: 'Racing', 
    11: 'Real Time Strategy (RTS)', 
    12: 'Role-playing (RPG)', 
    13: 'Simulator', 
    14: 'Sport', 
    15: 'Strategy', 
    16: 'Turn-based strategy (TBS)', 
    24: 'Tactical',
    25: "Hack and slash/Beat 'em up", 
    26: 'Quiz/Trivia', 
    30: 'Pinball', 
    31: 'Adventure', 
    32: 'Indie' ,
    33: 'Arcade',
    34: 'Visual Novel' ,
    35: 'Card & Board Game', 
    36: 'MOBA', 
}

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

    const apiUrl = "https://api.igdb.com/v4/games";
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`,
        },
        data: `fields name, genres, summary, first_release_date, url; limit 5; where genres = (${genre}); sort first_release_date desc;`
    };

    try {
        const response = await axios(apiUrl, options);
        const games = response.data;

        // Transform the game data here
        const transformedGames = games.map(game => {
            return {
                name: game.name,
                genres: game.genres.map(id => genreMap[id] || `Genre ID: ${id}`),
                summary: game.summary,
                releaseDate: new Date(game.first_release_date * 1000).toLocaleDateString("en-US"),
                url: game.url,
            };
        });

        return transformedGames;
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
const genre = '31';
searchVideoGames(genre)
    .then(data => {
        console.log('Search Results:', data);
    })

module.exports = {getAccessToken, searchVideoGames};