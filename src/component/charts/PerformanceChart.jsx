import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api/dashboardApi";
import { showToast } from "../ShowToast";
import { TextSpan } from "../Text";
import { FaChartLine } from "react-icons/fa";
import Skeleton from "../ui/Skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const PerfomanceChart = () => {
  const { id } = useParams();

  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [attendance, setAttendance] = useState([]);
  const [timeRange, setTimeRange] = useState("weekly");
  const [loading, isLoading] = useState(false);

  const fetchAttendance = async () => {
    isLoading(true);
    try {
      const response = await api.getAttendance({
        accessToken,
        refreshToken,
        filter: timeRange,
        userId: id,
      });
      setAttendance(response?.data?.data);
      showToast(response?.message);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [accessToken, refreshToken, timeRange]);

  const getColor = (score) => {
    if (score <= 40) return "#FF4C4C"; // Red
    if (score <= 70) return "#FFD93D"; // Yellow
    return "#4CAF50"; // Green
  };

  const getChartData = () => {
    if (timeRange === "weekly") {
      const weeks = attendance?.map((item) => item.week);
      const totals = attendance?.map((item) => item.averageScore);
      const colors = totals.map(getColor);

      return {
        labels: weeks,
        datasets: [
          {
            label: "Attendance",
            data: totals,
            backgroundColor: colors,
            borderRadius: 5,
          },
        ],
      };
    } else if (timeRange === "monthly") {
      const months = attendance.map((item) => item.month);
      const averageScores = attendance.map((item) => item.averageScore);
      const colors = averageScores.map(getColor);

      return {
        labels: months,
        datasets: [
          {
            label: "Average Score",
            data: averageScores,
            backgroundColor: colors,
            borderRadius: 5,
          },
        ],
      };
    }
  };

  const calculateTotalAverage = () => {
    if (attendance.length === 0) return 0;
    const total = attendance.reduce((sum, item) => sum + item.averageScore, 0);
    return (total / attendance.length).toFixed(2);
  };

  const totalAverageScore = calculateTotalAverage();

  const data = getChartData();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full my-5">
      {/* Header */}
      {loading ? (
        <Skeleton isLoading={loading} />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FaChartLine
                size={40}
                className="text-primary5 border shadow p-2 rounded-lg"
              />
              <TextSpan size="" color="" className="text-primary5 text-lg">
                Attendance
              </TextSpan>
              <div>{totalAverageScore}%</div>
            </div>
            {/* Dropdown */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border rounded-md px-2 py-1 text-primary5"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Bar Chart */}
          <div className="h-64">
            <Bar data={data} options={options} />
          </div>
        </>
      )}
    </div>
  );
};

export default PerfomanceChart;
