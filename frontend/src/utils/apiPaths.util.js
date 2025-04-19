
export const BASE_URL = "https://cryptotracker-0qr5.onrender.com"


export const API_PATHS = {
  DASHBOARD: {
    FETCH_COINS: "/fetchCoins",
    CHART_DATA: (id) => `/${id}/chartData`,
    GET_COIN: (id) => `/${id}`,
    TOP_MOVERS: "/topMovers",
  },
};
