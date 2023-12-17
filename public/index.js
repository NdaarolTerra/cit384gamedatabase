new Vue({
    el: '#app',
    data: {
        searchTerm: ''
    },
    methods: {
        searchGames() {
            console.log('Searching for:', this.searchTerm);

            fetch('/igdb/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchTerm: this.searchTerm })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Search Results:', data);
            
            })
            .catch(error => {
                console.error('Error fetching games:', error);
            });
        }
    }
});