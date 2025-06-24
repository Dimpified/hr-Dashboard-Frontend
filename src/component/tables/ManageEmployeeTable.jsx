import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import api from "../../api/dashboardApi";
import { formatDate } from "../../utils/dateHelper";
import { Button } from "../Buttons";
import Skeleton from "../ui/Skeleton";

const ManageEmployeeTable = () => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth?.user);

  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await api.getEmployees({
        accessToken,
        refreshToken,
        department: user?.department,
      });
      setEmployees(response?.data || []);
    } catch (error) {
      console.log("Error getting employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [accessToken, refreshToken]);

  // Filter employees based on search term
  const filteredEmployees = employees?.filter((emp) => {
    const fullName = emp?.profile?.fullName?.toLowerCase() || "";
    const email = emp?.user?.email?.toLowerCase() || "";
    const department = emp?.user?.department?.toLowerCase() || "";
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      department.includes(searchTerm.toLowerCase())
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md my-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-3">
        <h2 className="text-2xl font-semibold">Manage Employees</h2>
        <input
          className="border p-1 rounded-md "
          type="text"
          placeholder="Search by name, email or department"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      {loading ? (
        <Skeleton isLoading={loading} />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full mt-4 text-left p-4">
              <thead className="rounded-3xl">
                <tr className="bg-gray-300 text-sec3">
                  <th className="py-2 px-1">NAME</th>
                  <th className="py-2 px-1">EMAIL</th>
                  <th className="py-2 px-1">DEPARTMENT</th>
                  <th className="py-2 px-1">DATE OF RESUMPTION</th>
                  <th className="py-2 px-1">CADRE</th>
                  <th className="py-2 px-1">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((emp, index) => (
                  <tr key={index} className="">
                    <td className="py-2 px-1">{emp?.profile?.fullName}</td>
                    <td className="py-2 px-1">{emp?.user?.email}</td>
                    <td className="py-2 px-1">{emp?.user?.department}</td>
                    <td className="py-2 px-1">
                      {formatDate(emp?.user?.dateOfResumption)}
                    </td>
                    <td className="py-2 px-1">
                      <span
                        className={`px-2 py-1 text-xs rounded-md border border-primary11 italic font-semibold`}
                      >
                        {emp?.user?.cadre}
                      </span>
                    </td>
                    <td className="py-2 px-1">
                      <Button
                        label="View"
                        onClick={() =>
                          navigate(`/admin/employeebiodata/${emp.user?._id}`)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4 ">
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <div className="space-x-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md border ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md border ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageEmployeeTable;
