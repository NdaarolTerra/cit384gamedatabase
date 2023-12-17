document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const searchTerm = document.getElementById('searchTerm').value;

    // Log the search term
    console.log('Searching for:', searchTerm);

    fetch('/igdb/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchTerm: searchTerm })
    })
    .then(response => response.json())
    .then(data => {
        // Log the output (response data)
        console.log('Search Results:', data); 
    })
    .catch(error => {
        console.error('Error fetching games:', error);
    });
});