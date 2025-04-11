# ETH Options Analyzer

A tool for analyzing Ethereum put options to find opportunities for 3000% ROI within 4 weeks.

## Features

- Real-time ETH price tracking
- Options data analysis with customizable criteria
- ROI calculations and recommendations
- Dark/light theme support
- Mobile-responsive design

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Open http://localhost:3000 in your browser

## How It Works

The analyzer:
1. Fetches real-time ETH price data
2. Retrieves available put options
3. Filters options based on your criteria:
   - 3000% ROI target
   - 4-week timeframe
   - Strike price below current ETH price
4. Provides recommendations for the best available options

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Future Improvements

### 📊 Core Indicators for ETH Put Analyzer

#### Implied Volatility (IV)
- [ ] **Current IV Levels**: Monitor the current IV, especially for at-the-money (ATM) options. Lower IV often results in cheaper option premiums.
- [ ] **IV Trends**: Track historical IV trends to identify periods when IV is below average, which may present better entry points for purchasing puts.
- [ ] **IV Skew**: Analyze the difference in IV between various strike prices to understand market sentiment and potential pricing inefficiencies.

#### Option Premiums
- [ ] **Current Premiums**: Assess the cost of put options at different strike prices and expirations to determine affordability and potential ROI.
- [ ] **Premium Trends**: Observe how premiums have changed over time in relation to IV and underlying price movements.

#### Historical ETH Price Movements
- [ ] **Price Volatility**: Examine past instances where ETH experienced significant price drops (e.g., 15% or more) within short periods to gauge the likelihood of similar future movements.
- [ ] **Support and Resistance Levels**: Identify key price levels where ETH has historically found support or faced resistance, which can inform strike price selection.

#### Technical Indicators
- [ ] **Relative Strength Index (RSI)**: Determine if ETH is overbought or oversold, which can signal potential price reversals.
- [ ] **Moving Averages (MA)**: Use short-term and long-term MAs to identify trend directions and potential crossover points.
- [ ] **Bollinger Bands**: Assess price volatility and potential breakout points.
- [ ] **MACD (Moving Average Convergence Divergence)**: Identify momentum shifts and potential entry/exit points.

#### Options Greeks
- [ ] **Delta**: Measure the sensitivity of the option's price to changes in the underlying ETH price.
- [ ] **Gamma**: Understand how Delta changes with the underlying price, indicating the option's convexity.
- [ ] **Theta**: Assess time decay to understand how the option's value erodes as expiration approaches.
- [ ] **Vega**: Evaluate sensitivity to changes in IV, which can significantly impact option pricing.

#### Market Sentiment Indicators
- [ ] **Put/Call Ratio**: Gauge overall market sentiment; a higher ratio may indicate bearish sentiment.
- [ ] **Open Interest**: Monitor the number of outstanding option contracts to assess market activity and liquidity.

### 🛠️ Implementation Considerations
- [ ] **Data Aggregation**: Utilize APIs from reputable sources to gather real-time and historical data on ETH prices, options metrics, and technical indicators.
- [ ] **Alert System**: Develop a notification mechanism that triggers when specific conditions align (e.g., IV below a certain threshold, favorable RSI levels, affordable premiums) to prompt potential trade opportunities.
- [ ] **Backtesting Module**: Incorporate a backtesting feature to simulate how the strategy would have performed historically under similar market conditions.
- [ ] **User Interface**: Design an intuitive dashboard that displays all relevant metrics, charts, and alerts to facilitate informed decision-making.

By integrating these indicators and tools, your ETH Put Analyzer can effectively identify and evaluate potential opportunities for high-ROI put option strategies under specific market conditions. 