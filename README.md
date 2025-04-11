# ETH Options Analyzer

A real-time Ethereum options analysis tool that helps traders identify profitable put options based on customizable criteria. The application fetches live data from Deribit and CoinGecko to provide:

- Current ETH price trends with 30-day historical chart
- Comprehensive put options table with key metrics
- Smart recommendations based on:
  * Target ROI (3000%)
  * Timeframe (4 weeks)
  * Strike price analysis
  * Implied volatility
- Visual indicators for "good trades" based on realistic market conditions
- Recommended holding periods for each option
- Price movement requirements for both profit and target ROI

## Features

- **Real-time Data**: Live updates from Deribit and CoinGecko APIs
- **Interactive Chart**: 30-day ETH price history with interactive features
- **Smart Filtering**: Options are filtered based on realistic market conditions
- **ROI Analysis**: Calculates required price movements for both profit and target ROI
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop and mobile devices

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Modern web browser

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd eth-options-analyzer
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Quick Start

Use the provided startup script:
```bash
chmod +x start.sh
./start.sh
```

This script will:
- Kill any existing process on port 3000
- Install dependencies if needed
- Start the server

### Manual Start

1. Kill any existing process on port 3000 (if needed):
```bash
lsof -ti:3000 | xargs kill -9
```

2. Start the server:
```bash
node server.js
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Data Updates

- Price data refreshes every 5 minutes
- Options data updates in real-time
- Historical price data shows last 30 days

## Understanding the Interface

### Options Table
- **Strike Price**: The price at which the option can be exercised
- **Expiry Date**: Option expiration date and days remaining
- **Implied Volatility**: Current market volatility expectation
- **Option Premium**: Current price of the option
- **Price Drop for Profit**: Required price decrease to break even
- **Price Drop for 3000% ROI**: Required price decrease for target ROI
- **Recommended Hold**: Suggested holding period
- **Good Trade**: ✓ indicates options meeting all criteria

### Recommendations
The tool provides three types of recommendations:
1. Perfect Match: Options meeting all criteria
2. Best Alternative: Highest ROI options within timeframe
3. Best Available: Overall best options regardless of criteria

## Contributing

Feel free to submit issues and enhancement requests!

## License

[Your chosen license]

## Disclaimer

This tool is for educational purposes only. Always do your own research and never trade with money you can't afford to lose. Options trading carries significant risk. 