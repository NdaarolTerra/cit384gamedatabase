const axios = require('axios');

async function vndbSearch(searchTerm, maxResults = 5) {

    const url = "https://api.vndb.org/kana/vn";
    /*let img;
    let titles;
    let desc;
    let screenshots;*/

    const query = {           //"Himukai"
    filters: ["search", "=", searchTerm ],
    fields: "title, image.url, description, screenshots.url" 
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
        axios(url, options)
        .then(response => {

            title: response.data.results.title;
            img: response.data.results.image.url;
            desc: response.data.results.description;
            scrshots: response.data.results.screenshots.url;
            /*let img = response.data.results[0].image.url;
            let title = response.data.results[0].title;
            let scrshots = response.data.results[0].screenshots.url;
            let desc = response.data.results[0].description;
            console.log(img);
            console.log(title);
            console.log(desc);
            console.log(scrshots);*/
        })
    } catch(error) {
        console.error('Error:', error);
    };

}
  module.exports = {vndbSearch};