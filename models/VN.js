const axios = require('axios');

async function vndbSearch(daimei) {

    const url = "https://api.vndb.org/kana/vn";

    const query = {           //"Himukai"
    "filters": ["search", "=", daimei ],
    "fields": "title, image, description, screenshots",
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
        const henji = axios(url, options);
        const v_novels = henji.data;

        const nantokage = v_novels.map(novels => {
            return {
                title: novels.title,
                img: novels.image,
                desc: novels.description,
                scrshots: novels.screenshots,
            };
        });
    } 
    catch (error) {
        console.error('Error:', error);
    };

}
  module.exports = {vndbSearch};