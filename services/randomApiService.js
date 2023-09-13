const axios = require('axios');

// Function to fetch credit card data from the Random Data API with a limit
const fetchCreditCardData = async (limit = 10) => {
    try {
        // Define the API endpoint URL with the "size" parameter
        const apiUrl = `https://random-data-api.com/api/v2/credit_cards?size=${limit}`;

        // Make a GET request to the API
        const response = await axios.get(apiUrl);

        // Filter the response data to exclude credit card numbers
        return response.data.map((card) => ({
            name: card.name, expirationDate: card.expiration_date, type: card.type,
        }));
    } catch (error) {
        console.error('Error fetching credit card data:', error);
        throw error;
    }
};

module.exports = {
    fetchCreditCardData,
};