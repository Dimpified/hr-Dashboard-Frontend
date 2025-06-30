"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Ongoing (40%)", "Planned (40%)", "Unachieved (20%)"],
  datasets: [
    {
      data: [40, 40, 20],
      backgroundColor: ["#a78bfa", "#f87171", "#fde68a"],
      borderWidth: 0,
    },
  ],
};

const options = {
  cutout: "70%",
  plugins: {
    legend: {
      display: false,
    },
  },
};

const DepartmentPerformanceDonut = () => (
  <div className="bg-white p-4 rounded-lg shadow w-full max-w-xs">
    <h2 className="text-sm font-semibold mb-4">
      Departmental Performance (Monthly)
    </h2>
    <div className="relative flex items-center justify-center h-[200px]">
      <Doughnut data={data} options={options} />
      <div className="absolute text-lg font-bold text-gray-800">100%</div>
    </div>
  </div>
);

export default DepartmentPerformanceDonut;
