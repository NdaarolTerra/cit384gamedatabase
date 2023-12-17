const axios = require('axios');

async function vndbSearch(daimei) {

    const url = "https://api.vndb.org/kana/vn";

    const query = {          //"Himukai"
    "filters": ["search", "=", daimei ],
    "fields": "id, title, image.url, description, screenshots.url, tags.name",
    "results": 5,
    };

    const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    data: JSON.stringify(query)
    };

    try {
        const nantokage = await axios(url, options);
        if (nantokage.data && nantokage.data.results) {
            return nantokage.data.results.map(novels => ({
                vndbid: novels.id,
                title: novels.title,
                img: novels.image,
                desc: novels.description,
                tags: novels.tags,
                scrshots: novels.screenshots.url,
            }));
        } 
        else {
            console.error('Invalid henji format:', henji.data);
            return[];
        }
    } 
    catch (error) {
        console.error('Error:', error);
        return[];
    }
}
/*// Testing
const daimei = 'Nukitashi';
vndbSearch(daimei)
    .then(data => {
        console.log('Search Results:', data);
    })*/
  module.exports = {vndbSearch};