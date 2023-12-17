new Vue({
    el: '#app',
    data: {
        searchTerm: ''
    },
    methods: {
        searchGames() {
            // Logging search on console
            console.log('Searching for:', this.searchTerm);

            // Post request to IGDB route
            fetch('/igdb/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchTerm: this.searchTerm })
            })
            .then(response => response.json())
            .then(data => {
                // Logging the array result on console
                console.log('Search Results:', data);
            
            })
            .catch(error => {
                console.error('Error fetching games:', error);
            });
        }
    }
});