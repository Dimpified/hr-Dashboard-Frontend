import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import api from "../../api/dashboardApi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateHelper";
import Skeleton from "../ui/Skeleton";

import { IoCall, IoPersonSharp } from "react-icons/io5";
import { MdOutlineHealthAndSafety } from "react-icons/md";

const EmployeeBioData = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [bioData, setBioData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBioData = async () => {
    setLoading(true);
    try {
      const response = await api.getEmployeeBioData({
        accessToken,
        refreshToken,
        id,
      });

      setBioData(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBioData();
  }, [accessToken, refreshToken, id]);

  return (
    <DashboardLayout>
      <div className="flex justify-center items-center min-h-screen p-2 md:p-4">
        <div className="md:p-6 w-full">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-sec6 pb-3 mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Employee Bio-data
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => navigate(-1)}
            >
              &times;
            </button>
          </div>
          {loading ? (
            <Skeleton
              isLoading={loading}
              className="p-4 shadow-lg rounded-lg"
            />
          ) : (
            <>
              {" "}
              {/* Employee Details */}
              <div className="bg-white rounded-xl shadow-md p-6 space-y-8 border border-gray-100">
                {/* Section: Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b pb-2 mb-4">
                    <span className="text-blue-600">
                      <IoPersonSharp />
                    </span>{" "}
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <p>
                      <span className="font-medium text-gray-600">Name:</span>{" "}
                      {bioData?.name}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Email Address:
                      </span>{" "}
                      {bioData?.email}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Department:
                      </span>{" "}
                      {bioData?.department}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Date of Resumption:
                      </span>{" "}
                      {formatDate(bioData?.dateOfResumption)}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Contract Type:
                      </span>{" "}
                      {bioData?.contractType}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Date of Birth:
                      </span>{" "}
                      {formatDate(bioData?.dob)}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Phone:</span>{" "}
                      {bioData?.phone}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Address:
                      </span>{" "}
                      {bioData?.address}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Marital Status:
                      </span>{" "}
                      {bioData?.maritalStatus}
                    </p>
                  </div>
                </div>

                {/* Section: Emergency Contact */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b pb-2 mb-4">
                    <span className="text-red-500">
                      <IoCall />
                    </span>{" "}
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <p>
                      <span className="font-medium text-gray-600">
                        Next of Kin:
                      </span>{" "}
                      {bioData?.nextOfKinName}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Contact:
                      </span>{" "}
                      {bioData?.nextOfKinContact}
                    </p>
                    <p className="md:col-span-2">
                      <span className="font-medium text-gray-600">
                        Address:
                      </span>{" "}
                      {bioData?.nextOfKinAddress}
                    </p>
                  </div>
                </div>

                {/* Section: Health Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b pb-2 mb-4">
                    <span className="text-green-600">
                      <MdOutlineHealthAndSafety size={20} />
                    </span>{" "}
                    Health Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <p>
                      <span className="font-medium text-gray-600">
                        Blood Group:
                      </span>{" "}
                      {bioData?.bloodGroup}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Genotype:
                      </span>{" "}
                      {bioData?.genotypes}
                    </p>
                    <p className="md:col-span-2">
                      <span className="font-medium text-gray-600">
                        Allergies:
                      </span>{" "}
                      {bioData?.allergies?.join(", ") || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              {/* Navigation Buttons */}
              <div className="mt-6 flex justify-between">
                <button
                  className="px-4 py-2 border rounded-lg text-gray-500 cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  Previous
                </button>
                <button
                  className="px-4 py-2 bg-primary11 text-white rounded-lg hover:bg-primary4 cursor-pointer"
                  onClick={() => navigate(`/admin/employeeperformance/${id}`)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeBioData;
