import { IoClose } from "react-icons/io5";
import { ButtonSmallPurple } from "../Buttons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../../api/dashboardApi";
import { showToast } from "../ShowToast";

const ViewHelpCenterModal = ({ isOpen, onClose, ticket }) => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth?.user);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!responseMessage.trim()) {
      showToast("Response message cannot be empty", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await api.submitHelpCenterMessage({
        accessToken,
        refreshToken,
        id: ticket?._id,
        responseMessage,
      });

      showToast(response.message || "Response sent successfully");
      setResponseMessage("");
      onClose();
    } catch (error) {
      console.log(error);
      showToast("Failed to send response", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleMessage = async () => {
    try {
      const response = await api.getSingleHelpCenterMessage({
        accessToken,
        refreshToken,
        id: ticket?.userId,
      });
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleMessage();
  }, [ticket?.userId, isOpen]);

  const handleClose = () => {
    setResponseMessage("");
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-opacity-100 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-lg shadow-xl p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold text-sec11">Help Details:</h2>
          <button
            onClick={handleClose}
            className="text-primary5 hover:text-sec11"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form className="p-8" onSubmit={handleSubmit}>
          {/* Help Message Field */}
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-1">
              Help Details:
            </label>
            <textarea
              className="w-full rounded-lg focus:border-none focus:ring-primary11 h-16"
              placeholder="Briefly describe..."
              value={ticket?.message}
              readOnly
            ></textarea>
          </div>

          {/* HR Response Field */}
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-1">
              HR Response:
            </label>
            <textarea
              className="w-full rounded-lg focus:border-none focus:ring-primary11 h-16"
              placeholder="Enter your response..."
              value={data?.response ? data.response : responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
              // readOnly={ticket?.message !== "" || null ? true : false}
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between w-full">
            <ButtonSmallPurple
              padding=""
              width=""
              type="button"
              className="py-3.5 bg-white text-primary11 border border-primary11 px-6 rounded-lg place-self-end hover:bg-sec6 cursor-pointer"
              onClick={handleClose}
            >
              Close
            </ButtonSmallPurple>
            <ButtonSmallPurple
              padding=""
              width=""
              type="submit"
              disabled={loading || data?.response !== ""}
              className={`py-3.5 px-6 rounded-lg place-self-end cursor-pointer ${
                loading || data?.response !== ""
                  ? "bg-gray-400 cursor-not-allowed"
                  : "hover:bg-primary4"
              }`}
            >
              {loading ? "Sending..." : "Send"}
            </ButtonSmallPurple>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewHelpCenterModal;
