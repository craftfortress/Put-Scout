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
        console.log('Current ETH price:', currentPrice);

        // Then get options data
        const optionsResponse = await axios.get(`${DERIBIT_API}/public/get_instruments`, {
            params: {
                currency: 'ETH',
                kind: 'option',
                expired: false
            }
        });

        console.log('Raw Deribit API Response:', JSON.stringify(optionsResponse.data, null, 2));

        if (!optionsResponse.data || !optionsResponse.data.result) {
            throw new Error('Invalid response from Deribit API');
        }

        console.log('Total options from API:', optionsResponse.data.result.length);

        // Process and format the options data
        const options = optionsResponse.data.result.map(option => {
            try {
                const instrumentParts = option.instrument_name.split('-');
                console.log('Processing option:', option.instrument_name, 'Parts:', instrumentParts);
                
                // Ensure we have all required parts
                if (instrumentParts.length < 4) {
                    console.log('Invalid instrument name format:', option.instrument_name);
                    return null;
                }
                
                const strike = parseFloat(instrumentParts[2]);
                const expiration = instrumentParts[1];
                const optionType = instrumentParts[3].toLowerCase();
                
                console.log('Parsed values:', { strike, expiration, optionType });
                
                return {
                    strike: strike,
                    expiration_timestamp: new Date(expiration).getTime(),
                    mark_iv: option.mark_iv || 0,
                    mark_price: option.mark_price || 0,
                    option_type: optionType,
                    instrument_name: option.instrument_name,
                    underlying_price: currentPrice
                };
            } catch (error) {
                console.error('Error processing option:', option.instrument_name, error);
                return null;
            }
        }).filter(opt => opt !== null); // Remove any null entries

        console.log('Total options after processing:', options.length);
        console.log('First few options:', options.slice(0, 3));

        res.json({ result: options });
    } catch (error) {
        console.error('Error fetching options data:', error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
        res.status(500).json({ error: 'Error fetching options data: ' + error.message });
    }
});

// Deribit API endpoint for ETH ATM IV
app.get('/api/eth-iv', async (req, res) => {
    try {
        // Get current ETH price first
        const priceResponse = await axios.get(`${DERIBIT_API}/public/get_index_price`, {
            params: {
                index_name: 'eth_usd'
            }
        });
        const currentPrice = priceResponse.data.result.index_price;
        console.log('Current ETH price for IV:', currentPrice);

        // Get ATM options data from Deribit
        const response = await axios.get(`${DERIBIT_API}/public/get_instruments`, {
            params: {
                currency: 'ETH',
                kind: 'option',
                expired: false
            }
        });

        if (!response.data || !response.data.result) {
            throw new Error('Invalid response from Deribit API');
        }

        // Find ATM options (strike closest to current price)
        const atmOptions = response.data.result
            .filter(opt => {
                const parts = opt.instrument_name.split('-');
                if (parts.length < 4) return false;
                const strike = parseFloat(parts[2]);
                return !isNaN(strike) && Math.abs(strike - currentPrice) / currentPrice < 0.1; // Within 10% of current price
            })
            .map(opt => ({
                ...opt,
                strike: parseFloat(opt.instrument_name.split('-')[2]),
                iv: opt.mark_iv || 0
            }));

        console.log('ATM options found:', atmOptions.length);
        
        if (atmOptions.length === 0) {
            throw new Error('No ATM options found');
        }

        // Calculate average IV of ATM options
        const avgIV = atmOptions.reduce((sum, opt) => sum + opt.iv, 0) / atmOptions.length;
        console.log('Average IV:', avgIV);

        res.json({
            value: avgIV * 100, // Convert to percentage
            timestamp: Date.now()
        });
    } catch (error) {
        console.error('Error fetching ETH IV data:', error.message);
        res.status(500).json({ error: 'Error fetching IV data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 