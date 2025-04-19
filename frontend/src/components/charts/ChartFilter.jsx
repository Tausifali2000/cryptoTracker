import { useEffect } from "react";
import { useChartStore } from "../../stores/chart.store";


const data = [
  { id: 1, value: 1, text: "1D" },
  { id: 2, value: 3, text: "3D" },
  { id: 3, value: 7, text: "7D" },
  { id: 4, value: 30, text: "1M" },
  { id: 5, value: 365, text: "1Y" },
];

const ChartFilter = () => {
  const {  fetchChartData, setFilter, selectedFilter } = useChartStore();

  useEffect(() => {
    fetchChartData();
  }, [selectedFilter]);



  return (
    <ul className="absolute right-0 top-0 flex gap-2">
      {data.map((item) => (
        <li key={item.id}>
          <button
            className={`${
              Number(selectedFilter) === item.value
                ? "bg-accent text-white "
                : "bg-transparent"
            }  rounded-md px-2 py-1 text-xs dark:text-DarkSecondary`}
            onClick={() => setFilter(String(item.value))}
          >
            {item.text}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ChartFilter;
