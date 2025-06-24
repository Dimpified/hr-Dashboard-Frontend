import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import PerformanceChart from "../charts/PerformanceChart";
import EmployeeBioBarChart from "../charts/EmployeeBioBarChart";
import { useEffect, useState } from "react";
import { showToast } from "../ShowToast";
import { useSelector } from "react-redux";
import api from "../../api/dashboardApi";
import Skeleton from "../ui/Skeleton";
import { formatDate } from "../../utils/dateHelper";

const EmployeePerformance = () => {
  const navigate = useNavigate();

  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await api.getProjects({
        accessToken,
        refreshToken,
        userId: id,
      });
      setProjects(response);
      showToast(response?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [accessToken, refreshToken]);

  return (
    <DashboardLayout>
      <div className="flex justify-center items-center p-2 md:p-4">
        <div className="md:p-6 w-full">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Performance Details
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => navigate("/admin/employee")}
            >
              &times;
            </button>
          </div>

          {/* Performance Details */}
          <div className="space-y-6">
            {/* Attendance */}

            <div className="h-[90vh">
              <PerformanceChart />
            </div>

            {/* Performance */}
            <div className="p-4 shadow-lg rounded-lg">
              <h3 className="text-md font-semibold text-gray-700">
                Performance
              </h3>
              <p className="text-gray-600">70.5% (January)</p>
              <EmployeeBioBarChart />
            </div>

            {/* Projects Completed */}
            <div className="p-4 shadow-lg rounded-lg">
              {loading ? (
                <Skeleton isLoading={loading} />
              ) : (
                <>
                  {" "}
                  <h3 className="text-lg font-semibold text-gray-700">
                    Projects
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-primary6">
                    <div className="shadow-lg p-2 rounded-lg border border-primary6">
                      <label className="mb-4 italic underline">
                        Ongoing Tasks
                      </label>
                      <ul className="space-y-2 mt-4">
                        {projects?.ongoingTasks?.length > 0 &&
                          projects?.ongoingTasks.map((item) => (
                            <li className="flex justify-between" key={item.id}>
                              <span>{item.name}</span>
                              <span
                                className={`${
                                  item.status === "completed"
                                    ? "text-ter6"
                                    : "text-sec10"
                                }`}
                              >
                                {item.status}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="shadow-lg p-2 rounded-lg border border-primary6">
                      <label className="mb-4 italic underline">
                        Completed Tasks
                      </label>
                      <ul className="space-y-2 mt-4">
                        {projects?.completedTasks?.length > 0 &&
                          projects?.completedTasks.map((item, index) => (
                            <li
                              className="flex justify-between list-disc"
                              key={item.id}
                            >
                              <span className="space-x-2">
                                <span>{index + 1}.</span>
                                <span>{item.name}</span>
                              </span>
                              <span>{formatDate(item.endDate)}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              className="px-4 py-2 border rounded-lg text-gray-500"
              onClick={() => navigate(-1)}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-primary11 text-white rounded-lg hover:bg-primary4"
              onClick={() => navigate("/admin/employee")}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeePerformance;
