import { create } from 'zustand';
import { API_PATHS } from '../utils/apiPaths.util.js';
import { toast } from "react-hot-toast";
import { axiosInstance } from '../utils/axiosInstance.util.js';

export const useMoversStore = create((set) => ({
  topGainers: [],
  topLosers: [],
  fetchingMovers: false,

  fetchMovers: async () => {
    set({ fetchingMovers: true });

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.TOP_MOVERS);
      const { topGainers, topLosers } = response.data;

      set({
        topGainers: topGainers || [],
        topLosers: topLosers || [],
        fetchingMovers: false,
      });
    } catch (error) {
      console.error("Failed to fetch top movers:", error.message);
      toast.error("Failed to fetch top movers");
      set({ fetchingMovers: false });
    }
  },
}));
