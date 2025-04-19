import { useEffect } from "react"
import Charts from "../components/charts/Charts"
import CoinDetails from "../components/charts/CoinDetails"
import Market from "../components/Market"
import Movers from "../components/Movers"
import SearchBar from "../components/SearchBar"
import Volume from "../components/Volume"
import { useChartStore } from "../stores/chart.store"
import { useCoinStore } from "../stores/coin.store"

const Dashboard = () => {

    const { fetchCoins, fetchingCoins} = useCoinStore();
  
    const { fetchChartData} = useChartStore()

  
  
    useEffect(() => {
      fetchCoins();
    }, [fetchCoins]);
  
    if (fetchingCoins) {
      return (
        <div className="grid min-h-screen w-full place-content-center bg-light dark:bg-dark">
          <p className="text-xl font-semibold text-accent dark:text-white"><img src="/loading.svg" alt="" /></p>
        </div>
      );
    }
  
    return (
      <div className="gridLayout min-h-auto w-full bg-lightGradient bg-no-repeat bg-cover dark:bg-darkGradient">
        <div className="search z-10 mt-10 flex items-center justify-center md:mt-0">
          <SearchBar />
        </div>
  
        <div className="marketcap">
          <Movers />
        </div>
  
        <div className="chart">
          <Charts />
        </div>
  
        <div className="chart2">
          <Volume />
        </div>
      </div>
    );
}

export default Dashboard
