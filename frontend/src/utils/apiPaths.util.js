
export const BASE_URL = "http://localhost:5000/api/coins"


export const API_PATHS = {
  DASHBOARD: {
    FETCH_COINS: "/fetchCoins",
    CHART_DATA: (id) => `/${id}/chartData`,
    GET_COIN: (id) => `/${id}`,
    TOP_MOVERS: "/topMovers",
  },
};
