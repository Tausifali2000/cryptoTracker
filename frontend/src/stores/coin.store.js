import { create } from 'zustand';
import { API_PATHS } from '../utils/apiPaths.util.js';
import { toast } from "react-hot-toast";
import { axiosInstance } from '../utils/axiosInstance.util.js';

export const useCoinStore = create((set) => ({
  coins: [],
  selectedCoin: null,

  fetchingCoins: false,
  fetchingCoinId: false,

  error: null,

  fetchCoins: async () => {
    set({ fetchingCoins: true, error: null });

    try {
      
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.FETCH_COINS);
      set({ coins: response.data,  fetchingCoins: false });
    
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      set({
        fetchingCoins: false,
        error: error.response?.data?.message || "Failed to load dashboard"
      });
      toast.error(error.response?.data?.message || "Dashboard fetch error");
    }
  },

  fetchCoinById: async (coinId) => {
    set({ fetchingCoinId: true, error: null });

    try {
      
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_COIN(coinId));
      set({ selectedCoin: response.data, fetchingCoinId: false });
     
    } catch (error) {
      console.error("Failed to load Currency:", error);
      set({
        fetchingCoinId: false,
        error: error.response?.data?.message || "Failed to load Currency"
      });
      toast.error(error.response?.data?.message || "Failed to load Currency");
    }
  },

  setSelectedCoin: (coinId) => {
    set({ selectedCoin: coinId });
  },


}));
