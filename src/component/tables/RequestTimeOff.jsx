import { useEffect, useState } from "react";
import EditRequestTimeModal from "../employee/modals/EditRequestTime";
import { useSelector } from "react-redux";
import api from "../../api/dashboardApi";
import { formatDate } from "../../utils/dateHelper";
import { FaSpinner } from "react-icons/fa";
import Skeleton from "../ui/Skeleton";

const ITEMS_PER_PAGE = 5;

const RequestTimeOff = () => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const userDepartment = useSelector((state) => state?.auth?.user?.department);

  const [requests, setRequests] = useState([]);
  const [refetch, setRefresh] = useState(false);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await api.getRequest({
        accessToken,
        refreshToken,
        department: userDepartment,
      });
      const data = response?.data || [];
      setRequests(data);
      setFilteredRequests(data);
    } catch (error) {
      console.log("Error getting Requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [accessToken, refreshToken, refetch]);

  // Filter based on search input
  useEffect(() => {
    const filtered = requests.filter((employee) =>
      `${employee.userName} ${employee.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredRequests(filtered);
    setCurrentPage(1);
  }, [searchTerm, requests]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRequests = filteredRequests.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="bg-white p-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Request Time Off</h2>
        <input
          type="text"
          placeholder="Search by name or email"
          className="border px-3 py-1 rounded-md text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <Skeleton isLoading={loading} />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Department</th>
                  <th className="p-3 text-left">Date of Resumption</th>
                  <th className="p-3 text-left">Contract Type</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRequests.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-500">
                      No requests found.
                    </td>
                  </tr>
                ) : (
                  paginatedRequests.map((employee) => (
                    <tr key={employee.id} className="">
                      <td className="p-3">{employee.userName}</td>
                      <td className="p-3">{employee.email}</td>
                      <td className="p-3">{employee.department}</td>
                      <td className="p-3">
                        {formatDate(employee.dateOfResumption)}
                      </td>
                      <td className="p-3">{employee.contractType}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-md text-sm ${
                            employee.status === "approved"
                              ? "bg-green-100 text-green-600"
                              : employee.status === "rejected"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {employee.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          className="bg-primary11 text-white px-4 py-1 rounded-md"
                          onClick={() => {
                            setSelectedId(employee.id);
                            setIsModalOpen(true);
                          }}
                          disabled={employee.status !== "pending"}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-1 rounded-md border ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600"
              }`}
            >
              Previous
            </button>

            <span className="text-sm text-gray-700">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredRequests.length)}{" "}
              of {filteredRequests.length} employees
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-4 py-1 rounded-md border ${
                currentPage === totalPages || totalPages === 0
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      {selectedId && (
        <EditRequestTimeModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedId(null);
          }}
          requestId={selectedId}
          onUpdate={() => setRefresh((prev) => !prev)}
        />
      )}
    </div>
  );
};

export default RequestTimeOff;
