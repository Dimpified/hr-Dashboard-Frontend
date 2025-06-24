import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import api from "../../api/dashboardApi";
import { showToast } from "../ShowToast";
import { FaSpinner } from "react-icons/fa";

const ViewTaskModal = ({ isOpen, onClose, id }) => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const [viewDetails, setViewDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approvalLoading, setapprovalLoading] = useState(false);

  const fetchViewDetails = async () => {
    try {
      setLoading(true);
      const response = await api.getTaskDetails({
        accessToken,
        refreshToken,
        taskId: id,
      });
      setViewDetails(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const markTaskApproved = async () => {
    try {
      setapprovalLoading(true);
      const response = await api.updateTaskApprovalStatus({
        accessToken,
        refreshToken,
        taskId: id,
        status: "approve",
      });
      showToast(response.message);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setapprovalLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && id) {
      fetchViewDetails();
    }
  }, [accessToken, refreshToken, id, isOpen]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatPriority = (priority) => {
    if (!priority) return "N/A";
    return priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <div className="flex justify-between items-center border-b space-x-2 pb-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            My Task Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500 font-medium">
            Loading task details...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="border-b flex items-center space-x-2 py-2">
                <span className="font-semibold">Task Name:</span>
                <div className="mt-1">{viewDetails?.name || "N/A"}</div>
              </div>
              <div className="border-b flex items-center space-x-2 py-2">
                <span className="font-semibold">Assigned By:</span>
                <div className="mt-1">{viewDetails?.assignerName}</div>
              </div>
              <div className="border-b flex items-center space-x-2 py-2">
                <span className="font-semibold">Assigned To:</span>
                <div className="mt-1">{viewDetails?.assigneeName}</div>
              </div>
              <div className="border-b flex items-center space-x-2 py-2">
                <span className="font-semibold">Duration:</span>
                <div className="mt-1">
                  {formatPriority(viewDetails?.duration) || "N/A"}
                </div>
              </div>
              <div className="border-b flex items-center space-x-2 py-2">
                <span className="font-semibold">Start Date:</span>
                <div className="mt-1">
                  {formatDate(viewDetails?.startingDate)}
                </div>
              </div>
              <div className="border-b flex items-center space-x-2 py-2">
                <span className="font-semibold">End Date:</span>
                <div className="mt-1">{formatDate(viewDetails?.endDate)}</div>
              </div>
              <div className="border-b flex items-center space-x-2 py-2">
                <span className="font-semibold">Team:</span>
                <div className="mt-1">{viewDetails?.team}</div>
              </div>

              {/* Description */}
              <div className="col-span-2 mt-4 border-b py-2">
                <label className="block text-gray-600 text-sm font-semibold mb-1">
                  Description
                </label>
                <textarea
                  className="w-full h-20 p-2 border border-gray-300 rounded-lg text-gray-500 bg-gray-50 cursor-not-allowed"
                  placeholder="Briefly describe..."
                  value={viewDetails?.shortDescription || ""}
                  disabled
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={markTaskApproved}
                className={` text-white font-semibold rounded-full px-4 py-2 text-sm focus:outline-none  ${
                  viewDetails?.approvalStatus === "approved"
                    ? "bg-primary7 cursor-no-drop"
                    : "bg-primary11 hover:bg-primary4 cursor-pointer"
                }`}
                disabled={
                  approvalLoading || viewDetails?.approvalStatus === "approved"
                    ? true
                    : viewDetails?.status === "pending" &&
                      viewDetails?.status === "inProgress"
                    ? true
                    : false
                }
              >
                {viewDetails?.approvalStatus === "approved" ? (
                  "Approved"
                ) : approvalLoading ? (
                  <div className="flex items-center space-x-2">
                    <FaSpinner className="animate-spin text-white text-lg" />
                    <span>Approving...</span>
                  </div>
                ) : (
                  "Approve"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewTaskModal;
