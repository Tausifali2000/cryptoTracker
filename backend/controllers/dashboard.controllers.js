// controller/marketData.controller.js
import axios from "axios";

export const getMarketChart = async (req, res) => {
  const { coinId, days } = req.body;
  const vsCurrency = 'usd'; 

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: vsCurrency,
          days: days,
        },
        headers: {
          'x-cg-api-key': process.env.COINGECKO_API_KEY,
        }
      }
    );

    const rawData = response.data;

    const prices = rawData.prices.map(([timestamp, price]) => ({
      id: timestamp,
      price: price
    }));

    const volume = rawData.total_volumes.map(([timestamp, volume]) => ({
      id: timestamp,
      volume: volume
    }));

    res.status(200).json({ prices, volume });
  } catch (error) {
    console.error('Error fetching market chart:', error.message);
    res.status(500).json({ error: 'Failed to fetch market chart' });
  }
};


export const getCoinMarkets = async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': process.env.COINGECKO_API_KEY, 
        },
        params: {
          vs_currency: req.query.vs_currency || 'usd',
          order: req.query.order || 'market_cap_desc',
         
          page: req.query.page || 1,
          sparkline: req.query.sparkline || false,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    console.error('Error fetching coin markets:', err.message);
    res.status(500).json({ error: 'Failed to fetch coin market data' });
  }
};

export const getTopMovers = async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY,
      },
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 250, // Fetch max to compare
        page: 1,
        price_change_percentage: '24h'
      }
    });

    const sorted = response.data
      .filter(coin => coin.price_change_percentage_24h !== null)
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);

    const topGainers = sorted.slice(0, 5);
    const topLosers = sorted.slice(-5).reverse(); // Last 5, in ascending order

    res.status(200).json({ topGainers, topLosers });

  } catch (error) {
    console.error('Error fetching top movers:', error.message);
    res.status(500).json({ error: 'Failed to fetch top movers' });
  }
};

export const getCoinById = async (req, res) => {
  const coinId = req.body;

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}`,
      {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': process.env.COINGECKO_API_KEY,
        }
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    console.error(`Error fetching data for coin "${coinId}":`, err.message);
    res.status(500).json({ error: 'Failed to fetch coin data by ID' });
  }
};
