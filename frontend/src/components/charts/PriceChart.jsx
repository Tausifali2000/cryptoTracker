import { useState, useLayoutEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useCoinStore } from "../../stores/coin.store";
import { useChartStore } from "../../stores/chart.store";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend
);

const opts = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        color: "rgba(162,102,246)",
      },
      grid: {
        display: false,
      },
      title: {
        display: true,
        text: "Date",
        color: "rgba(162,102,246)",
      },
    },
    y: {
      ticks: {
        color: "rgba(162,102,246)",
      },
      grid: {
        display: false,
      },
      title: {
        display: true,
        text: "Price",
        color: "rgba(162,102,246)",
      },
    },
  },
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
};

const PriceChart = () => {
  const chartRef = useRef();
  const { selectedCoin } = useCoinStore();
  const { chartData, selectedFilter } = useChartStore();

  const [userData, setUserData] = useState({
    labels: [],
    datasets: [],
  });

  useLayoutEffect(() => {
    if (!chartData?.prices?.length || !chartRef.current) return;

    const ctx = chartRef.current?.ctx;
    const gradient = ctx?.createLinearGradient(0, 0, 0, 400);
    gradient?.addColorStop(0, "rgba(162, 102, 246, 1)");
    gradient?.addColorStop(0.5, "rgba(203, 159, 249, 1)");
    gradient?.addColorStop(1, "rgba(203, 159, 249, 1)");

    let filteredPrices = chartData.prices;

    // Reduce points for clarity based on selectedFilter
    if (selectedFilter === "1") {
      // Just take start and end
      filteredPrices = [
        chartData.prices[0],
        chartData.prices[chartData.prices.length - 1],
      ];
    } else {
      // Group by day
      const seenDates = new Set();
      filteredPrices = chartData.prices.filter((item) => {
        const day = new Date(item.id).toDateString();
        if (seenDates.has(day)) return false;
        seenDates.add(day);
        return true;
      });
    }

    setUserData({
      labels: filteredPrices.map((d) => formatDate(d.id)),
      datasets: [
        {
          label: selectedCoin?.name || "Price",
          data: filteredPrices.map((d) => d.price),
          backgroundColor: gradient,
          borderColor: "transparent",
          fill: true,
          tension: 0.4,
        },
      ],
    });
  }, [chartData, selectedCoin, selectedFilter]);

  return <Line ref={chartRef} data={userData} options={opts} />;
};

export default PriceChart;
