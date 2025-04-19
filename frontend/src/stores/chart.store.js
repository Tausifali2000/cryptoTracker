import { create } from 'zustand';
import { API_PATHS } from '../utils/apiPaths.util.js';
import { toast } from "react-hot-toast";
import { axiosInstance } from '../utils/axiosInstance.util.js';
import { useCoinStore } from './coin.store.js'; // <-- import the coin store

export const useChartStore = create((set, get) => ({
  chartData: null,
  fetchingChart: false,
  selectedFilter: "7",
  error: null,

  setFilter: (filter) => set({ selectedFilter: filter }),

  fetchChartData: async () => {
    const { selectedCoin } = useCoinStore.getState(); 
    const { selectedFilter } = get();
    
    set({ fetchingChart: true, error: null });

    try {
      const response = await axiosInstance.post(
        API_PATHS.DASHBOARD.CHART_DATA(selectedCoin.id),
        {
          coinId: selectedCoin.id,
          days: selectedFilter,
        }
      );
      set({ chartData: response.data, fetchingChart: false });
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
      set({
        fetchingChart: false,
        error: error.response?.data?.message || "Failed to fetch chart data",
      });
      toast.error(error.response?.data?.message || "Chart data fetch error");
    }
  }
}));