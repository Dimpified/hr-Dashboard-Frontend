"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      label: "Increase",
      data: [50, 70, 60, 65, 60],
      backgroundColor: "#22c55e",
      borderRadius: 5,
    },
    {
      label: "Decrease",
      data: [30, 40, 30, 35, 40],
      backgroundColor: "#f87171",
      borderRadius: 5,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        boxWidth: 12,
        padding: 10,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (val: any) => val + "%",
      },
    },
  },
};

const EmployeeTurnoverChart = () => (
  <div className="bg-white p-4 rounded-lg shadow w-full">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h2 className="text-sm font-semibold">Employee Turn Over Rate</h2>
        <p className="text-xs text-gray-400">(Employees leaving)</p>
      </div>
      <select className="text-sm border px-2 py-1 rounded">
        <option>January</option>
      </select>
    </div>
    <Bar data={data} options={options} />
  </div>
);

export default EmployeeTurnoverChart;
