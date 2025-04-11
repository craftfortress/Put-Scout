require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static('public'));

// CoinGecko API endpoint for ETH price
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

app.get('/api/eth-price', async (req, res) => {
    try {
        const response = await axios.get(`${COINGECKO_API}/coins/ethereum/market_chart`, {
            params: {
                vs_currency: 'usd',
                days: 30,
                interval: 'daily'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching ETH price:', error.message);
        res.status(500).json({ error: 'Error fetching price data' });
    }
});

// Deribit API endpoint for options data
const DERIBIT_API = 'https://www.deribit.com/api/v2';

app.get('/api/options-data', async (req, res) => {
    try {
        // First get the current ETH price
        const priceResponse = await axios.get(`${DERIBIT_API}/public/get_index_price`, {
            params: {
                index_name: 'eth_usd'
            }
        });
        const currentPrice = priceResponse.data.result.index_price;

        // Then get options data
        const optionsResponse = await axios.get(`${DERIBIT_API}/public/get_book_summary_by_currency`, {
            params: {
                currency: 'ETH',
                kind: 'option'
            }
        });

        console.log('Deribit API Response:', JSON.stringify(optionsResponse.data, null, 2));

        if (!optionsResponse.data || !optionsResponse.data.result) {
            throw new Error('Invalid response from Deribit API');
        }

        // Process and format the options data
        const options = optionsResponse.data.result.map(option => {
            const instrumentParts = option.instrument_name.split('-');
            return {
                strike: parseFloat(instrumentParts[2]),
                expiration_timestamp: new Date(instrumentParts[1]).getTime(),
                mark_iv: option.mark_iv || 0,
                mark_price: option.mark_price || 0,
                option_type: instrumentParts[3].toLowerCase(),
                instrument_name: option.instrument_name,
                underlying_price: currentPrice
            };
        });

        // Filter for put options only and sort by expiration
        const putOptions = options
            .filter(opt => opt.option_type === 'p')
            .sort((a, b) => a.expiration_timestamp - b.expiration_timestamp);

        if (putOptions.length === 0) {
            throw new Error('No put options found');
        }

        res.json({ result: putOptions });
    } catch (error) {
        console.error('Error fetching options data:', error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
        res.status(500).json({ error: 'Error fetching options data: ' + error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 