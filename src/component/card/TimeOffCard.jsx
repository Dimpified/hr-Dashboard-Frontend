import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api/dashboardApi";
import Skeleton from "../ui/Skeleton";

const TimeOffCard = () => {
  const [leaves, setLeaves] = useState([]);
  const [leavesName, setLeavesName] = useState([]);
  const [leavesTeam, setLeavesTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    const fetchLeaves = async () => {
      setLoading(true);
      try {
        const response = await api.getLeaves({
          accessToken,
          refreshToken,
          department: user?.department,
        });

        
        setLeaves(
          Array.isArray(response?.data)
            ? response.data.map((item) => item.leave)
            : []
        );
        setLeavesName(
          Array.isArray(response?.data)
            ? response.data.map((item) => item.userName)
            : []
        );
        setLeavesTeam(
          Array.isArray(response?.data)
            ? response.data.map((item) => item.team)
            : []
        );
      } catch (error) {
        console.error("Error fetching Leaves:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [accessToken, refreshToken]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold">2025</h3>
      <div className="flex justify-between mt-2">
        <p className="font-medium">Time Off</p>
        {/* <p className="text-gray-500">Birthday</p> */}
      </div>
      {loading ? (
        <Skeleton isLoading={loading} height="h-72" />
      ) : (
        <>
          <div className="mt-4 flex flex-col space-y-3 h-72 overflow-y-auto">
            {leaves?.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
              >
                <p className="text-sm">
                  {leavesName} - {leavesTeam}
                </p>
                <span className="text-xs bg-primary11 text-white px-2 py-1 rounded-md whitespace-nowrap">
                  {item?.type}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TimeOffCard;
