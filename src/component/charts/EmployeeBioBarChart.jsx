import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EmployeeBioBarChart = () => {
  // Dummy Data
  const data = {
    labels: [
      "Jan 11",
      "Jan 12",
      "Jan 13",
      "Jan 14",
      "Jan 15",
      "Jan 16",
      "Jan 17",
    ],
    datasets: [
      {
        label: "Work Hours",
        data: [6, 8, 7, 4, 6, 3, 2], // Replace with actual work hours
        backgroundColor: "rgba(124, 58, 237, 0.7)", // Purple color
        borderRadius: 5,
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: { stepSize: 2 },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl">
      {/* <div className="flex justify-between">
        <h3 className="text-lg font-semibold">Employee Work Hours</h3>
        <select className="border py-1 mr-1 rounded-md text-sm">
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
      <p className="text-sm text-gray-500">0H 0Mins</p> */}
      <div className="h-60 mt-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default EmployeeBioBarChart;
