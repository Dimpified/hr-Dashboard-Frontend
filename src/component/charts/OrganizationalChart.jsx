import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api/dashboardApi";
import { FaSpinner } from "react-icons/fa";
import Skeleton from "../ui/Skeleton";

const TEAM_COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-primary11",
  "bg-pink-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-red-500",
  "bg-orange-500",
];

const OrganizationalChart = () => {
  const userDepartment = useSelector((state) => state?.auth?.user?.department);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [groupedByTeam, setGroupedByTeam] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchTotalOrganization = async () => {
    setLoading(true);
    try {
      const response = await api.getTotalOrganization({
        accessToken,
        refreshToken,
        department: userDepartment,
      });

      const data = response.Dimpified;

      // Group by team
      const grouped = data.reduce((acc, member) => {
        const team = member.team || "Others";
        if (!acc[team]) acc[team] = [];
        acc[team].push(member);
        return acc;
      }, {});

      // Sort team members: Team Leads first
      const sortedGrouped = {};
      for (const team in grouped) {
        const members = grouped[team];
        const teamLeads = members.filter((m) =>
          m.role.toLowerCase().includes("team lead")
        );
        const others = members.filter(
          (m) => !m.role.toLowerCase().includes("team lead")
        );
        sortedGrouped[team] = [...teamLeads, ...others];
      }

      setGroupedByTeam(sortedGrouped);
    } catch (error) {
      console.log("Error at fetching Total Employee:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalOrganization();
  }, [accessToken, refreshToken]);

  return (
    <>
      {loading ? (
        <Skeleton isLoading={loading} />
      ) : (
        <>
          {" "}
          <div className="bg-gray-100 min-h-screen flex justify-center items-start overflow-auto py-10">
            <div className="w-full max-w-6xl px-4">
              <div className="flex flex-col items-center mb-6">
                <div className="bg-white px-4 py-2 rounded-lg shadow-md text-center">
                  <p className="font-semibold">
                    Debo Omotala{" "}
                    <span className="text-sm text-primary11 ml-1">(CEO)</span>
                  </p>
                  <p className="text-sm text-gray-500">Employee - 001</p>
                </div>
                <div className="w-1 h-6 bg-gray-700"></div>
              </div>

              {/* Teams */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(groupedByTeam).map(([team, members], index) => {
                  const colorClass =
                    TEAM_COLORS[index % TEAM_COLORS.length] || "bg-gray-400";

                  return (
                    <div key={team} className="flex flex-col items-center">
                      <div
                        className={`${colorClass} text-white px-4 py-2 rounded-lg shadow-md mb-2`}
                      >
                        {team}
                      </div>
                      <div className="w-1 h-6 bg-gray-700"></div>
                      {members.map((member) => (
                        <div
                          key={member.email}
                          className="bg-white px-4 py-2 rounded-lg shadow-md text-center mt-2"
                        >
                          <p className="font-semibold">
                            {member.name}
                            {member.role
                              .toLowerCase()
                              .includes("team lead") && (
                              <span className="text-sm text-primary11 ml-1">
                                (Team Lead)
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default OrganizationalChart;
