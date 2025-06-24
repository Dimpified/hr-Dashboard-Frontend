import { useSelector } from "react-redux";
import api from "../../../api/dashboardApi";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { showToast } from "../../ShowToast";
import Skeleton from "../../ui/Skeleton";

const EditRequestTimeModal = ({ isOpen, onClose, requestId, onUpdate }) => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [request, setRequest] = useState({});
  const [leaveType, setLeaveType] = useState("");
  const [medicalImage, setMedicalImage] = useState(null);
  const [loading, setLoading] = useState({ approve: false, reject: false });
  const [detailsLoading, setDetailsLoading] = useState(false);

  const fetchRequest = async () => {
    setDetailsLoading(true);
    try {
      const response = await api.getRequestSingle({
        accessToken,
        refreshToken,
        requestId,
      });
      setRequest(response?.data || {});
      setLeaveType(response?.data?.leave?.type || "");
    } catch (error) {
      console.log("Error getting Requests:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchRequest();
    }
  }, [isOpen, accessToken, refreshToken]);

  const handleApprove = async () => {
    setLoading((prev) => ({ ...prev, approve: true }));
    try {
      await api.approveRequest({ accessToken, refreshToken, requestId });
      showToast("Request approved successfully!");
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Approve error:", error);
      showToast("Failed to approve request.");
    } finally {
      setLoading((prev) => ({ ...prev, approve: false }));
    }
  };

  const handleReject = async () => {
    setLoading((prev) => ({ ...prev, reject: true }));
    try {
      await api.rejectRequest({ accessToken, refreshToken, requestId });
      showToast("Request rejected.");
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Reject error:", error);
      showToast("Failed to reject request.");
    } finally {
      setLoading((prev) => ({ ...prev, reject: false }));
    }
  };

  const handleMedicalImageChange = (e) => {
    setMedicalImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-[3px] bg-black/20 transition duration-300 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg h-[80vh] w-96 md:w-[600px] p-6 relative overflow-y-auto hide-scrollbar">
        <div className="flex justify-between w-[550px]">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Request Time
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Kindly view the details
            </p>
          </div>
          <button
            className=" text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {detailsLoading ? (
          <div className="">
          <Skeleton isLoading={detailsLoading} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="">
            <div className="space-y-4 grid grid-cols-2 gap-3">
              {/* Name */}
              <div>
                <label className="text-gray-600 block mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  defaultValue={request.userName || ""}
                  readOnly
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-600 block mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-lg"
                  defaultValue={request.email || ""}
                  readOnly
                />
              </div>

              {/* Department */}
              <div>
                <label className="text-gray-600 block mb-1">Department</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  defaultValue={request.department || ""}
                  readOnly
                />
              </div>

              {/* Leave Type */}
              <div>
                <label className="text-gray-600 block mb-1">Leave Type</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  defaultValue={leaveType || ""}
                  readOnly
                />
              </div>

              {/* Leave From */}
              <div>
                <label className="text-gray-600 block mb-1">Leave From</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-lg"
                  defaultValue={request.from ? request.from.split("T")[0] : ""}
                  readOnly
                />
              </div>

              {/* Leave To */}
              <div>
                <label className="text-gray-600 block mb-1">Leave To</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-lg"
                  defaultValue={request.to ? request.to.split("T")[0] : ""}
                  readOnly
                />
              </div>

              {/* Medical Image */}
              {leaveType === "sick leave" && (
                <div className="col-span-2">
                  <label className="text-gray-600 block mb-1">
                    Medical Image
                  </label>
                  {request.medicalImage && (
                    <img
                      src={request.medicalImage}
                      alt="Uploaded Medical"
                      className="mb-3 max-h-60 w-full object-contain border border-primary12 shadow-sm rounded"
                    />
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="text-gray-600 block mb-1">Reason</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                defaultValue={request.shortDescription || ""}
                readOnly
              />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={handleReject}
                disabled={loading.reject}
                className={`px-4 py-2 border rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center gap-2 ${
                  loading.reject ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading.reject ? (
                  <>
                    <FaSpinner className="animate-spin" /> Rejecting...
                  </>
                ) : (
                  "Reject"
                )}
              </button>

              <button
                type="button"
                onClick={handleApprove}
                disabled={loading.approve}
                className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 ${
                  loading.approve ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading.approve ? (
                  <>
                    <FaSpinner className="animate-spin" /> Approving...
                  </>
                ) : (
                  "Approve"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditRequestTimeModal;
