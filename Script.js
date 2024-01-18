document.addEventListener('DOMContentLoaded', function () {
    // Use a free IP geolocation API
    const apiUrl = 'https://ipapi.co/json/';

    // Fetch IP information from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract relevant information
            const ipDetails = `
                <strong>IP Address:</strong> ${data.ip}<br>
                <strong>City:</strong> ${data.city}<br>
                <strong>Region:</strong> ${data.region}<br>
                <strong>Country:</strong> ${data.country_name}<br>
                <strong>Latitude:</strong> ${data.latitude}<br>
                <strong>Longitude:</strong> ${data.longitude}<br>
            `;

            // Update the HTML content with IP details
            document.getElementById('ip-info').innerHTML = ipDetails;
        })
        .catch(error => {
            console.error('Error fetching IP details:', error);
            document.getElementById('ip-info').innerHTML = 'Failed to fetch IP details';
        });
});
