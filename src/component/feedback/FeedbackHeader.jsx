import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api/dashboardApi";

const FeedbackHeader = ({UpdateTrigger}) => {
  const [messages, setMessages] = useState([]);

  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.getSuggestionByDept({
          accessToken,
          refreshToken,
          department: user.department,
        });
        setMessages(response?.count);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [accessToken, refreshToken, UpdateTrigger]);
  return (
    <div className="flex flex-col px-4 py-8 shadow-lg my-4 bg-ter1 rounded-2xl">
      <div className="flex flex-col space-y-2">
        <div className="text-xl lg:text-3xl text-center lg:text-left font-semibold text-primary11">
          All Feedback(Weekly)
        </div>
        <div className="text-xl lg:text-3xl text-center lg:text-left text-sec11">
          0
        </div>
      </div>
    </div>
  );
};

export default FeedbackHeader;
