import { useState } from "react";
import { FaFilter, FaPlus } from "react-icons/fa";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";
import { useNavigate } from "react-router-dom";
import ViewFeedbackModal from "../modals/ViewFeedbackModal";

const FeedbackTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Design 1",
      assigned: "Mr Debo",
      duration: "2 Weeks",
      date: "Jan 6, 2025",
      status: "Completed",
    },
    {
      id: 2,
      name: "Design 2",
      assigned: "Mr Sam",
      duration: "2 Weeks",
      date: "Jan 11, 2025",
      status: "Pending",
    },
    {
      id: 3,
      name: "Design 3",
      assigned: "Mr Amez",
      duration: "3 Days",
      date: "Jan 12, 2025",
      status: "In Progress",
    },
    {
      id: 4,
      name: "Design 4",
      assigned: "Mr Oboige",
      duration: "1 Month",
      date: "Jan 10, 2025",
      status: "In Progress",
    },
  ]);

  const navigate = useNavigate();

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-red-100 text-red-600";
      case "In Progress":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-5 rounded-lg shadow-lg mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-sec11 uppercase">
          Feedback MESSAGES
        </h2>
        <ButtonSmallPurple
          padding=""
          width=""
          height=""
          className="flex items-center text-white px-4 py-2.5 rounded-lg transition"
          onClick={() => navigate("/admin/feedback-form")}
        >
          <FaPlus className="mr-2" /> Add Message
        </ButtonSmallPurple>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full lg:w-1/3 rounded-lg focus:ring-primary11"
        />
        <ButtonSmallPurple
          padding=""
          width=""
          height=""
          className="flex items-center border px-4 py-2.5 rounded-lg"
        >
          <FaFilter className="mr-2" /> Filter
        </ButtonSmallPurple>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-purple-100 text-sec11 whitespace-nowrap">
              <th className="p-3">Feedback TITLE</th>
              <th className="p-3">DEPARTMENT</th>
              <th className="p-3">DATE</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {messages.map((task) => (
              <tr key={task.id} className="border-t text-sec11">
                <td className="p-3">{task.name}</td>
                <td className="p-3">{task.assigned}</td>
                <td className="p-3">{task.date}</td>

                <td className="p-3 space-y-2 lg:space-y-0 lg:space-x-2">
                  <ButtonSmallWhite
                    padding=""
                    width=""
                    height=""
                    className="px-7 lg:px-4 py-1 rounded-lg h-auto"
                    onClick={() => setIsFeedbackModalOpen(true)}
                  >
                    View
                  </ButtonSmallWhite>
                  <ButtonSmallPurple
                    padding=""
                    width=""
                    height=""
                    className="px-7 lg:px-4 py-1 rounded-lg h-auto"
                  >
                    Reply
                  </ButtonSmallPurple>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Task Modal */}
      <ViewFeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </div>
  );
};

export default FeedbackTable;
