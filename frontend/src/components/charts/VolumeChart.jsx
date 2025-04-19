import { useState, useLayoutEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useCoinStore } from "../../stores/coin.store";
import { useChartStore } from "../../stores/chart.store";

ChartJS.register(
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const opts = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `Volume: ${formatNumber(context.raw)}`;
        },
      },
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
    },
    y: {
      ticks: {
        color: "rgba(162,102,246)",
        callback: function (value) {
          return formatNumber(value);
        },
      },
      grid: {
        display: false,
      },
    },
  },
};

// Format volume like 1.2M / 3.5B
const formatNumber = (num) => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
};

const VolumeChart = () => {
  const chartRef = useRef();
  const { selectedCoin } = useCoinStore();
  const { chartData, selectedFilter } = useChartStore();

  const [userData, setUserData] = useState({
    labels: [],
    datasets: [],
  });

  useLayoutEffect(() => {
    if (!chartData?.volume?.length || !chartRef.current) return;

    const ctx = chartRef.current?.ctx;
    const gradient = ctx?.createLinearGradient(0, 0, 0, 400);
    gradient?.addColorStop(0, "rgba(162, 102, 246, 1)");
    gradient?.addColorStop(0.5, "rgba(203, 159, 249, 1)");
    gradient?.addColorStop(1, "rgba(203, 159, 249, 1)");

    let filteredVolume = chartData.volume;

    if (selectedFilter === "1") {
      filteredVolume = [
        chartData.volume[0],
        chartData.volume[chartData.volume.length - 1],
      ];
    } else {
      const seen = new Set();
      filteredVolume = chartData.volume.filter((d) => {
        const key = new Date(d.id).toDateString();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    setUserData({
      labels: filteredVolume.map((d) => formatDate(d.id)),
      datasets: [
        {
          label: `${selectedCoin?.name || "Coin"} Volume`,
          data: filteredVolume.map((d) => d.volume),
          backgroundColor: gradient,
          borderColor: "transparent",
          borderWidth: 1,
        },
      ],
    });
  }, [chartData, selectedCoin, selectedFilter]);

  return <Bar ref={chartRef} data={userData} options={opts} />;
};

export default VolumeChart;
