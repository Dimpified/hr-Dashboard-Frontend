import { useEffect, useState } from "react";
import StatsCard from "../card/StatsCard";
import { useSelector } from "react-redux";
import api from "../../api/dashboardApi";
import Skeleton from "../ui/Skeleton";

const Stats = () => {
  const user = useSelector((state) => state?.auth?.user?.profileData);
  const userDepartment = useSelector((state) => state?.auth?.user?.department);
  const userEmail = useSelector((state) => state?.auth?.user?.email);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const [totalEmployee, setTotalEmployee] = useState("");
  const [totalDepartment, setTotalDepartment] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const [employeeRes, departmentRes] = await Promise.all([
        api.getTotalEmployee({
          accessToken,
          refreshToken,
          department: userDepartment,
        }),
        api.getTotalDepartment({
          accessToken,
          refreshToken,
          email: userEmail,
          department: userDepartment,
        }),
      ]);

      setTotalEmployee(employeeRes);
      setTotalDepartment(departmentRes);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [accessToken, refreshToken]);

  // const fetchTotalEmployee = async () => {
  //   try {
  //     const response = await api.getTotalEmployee({
  //       accessToken,
  //       refreshToken,
  //       department: userDepartment,
  //     });
  //     setTotalEmployee(response);
  //   } catch (error) {
  //     console.log("Error at fetching Total Employee:", error);
  //   }
  // };
  // const fetchTotalDeparment = async () => {
  //   try {
  //     const response = await api.getTotalDepartment({
  //       accessToken,
  //       refreshToken,
  //       email: userEmail,
  //       department: userDepartment,
  //     });
  //     setTotalDepartment(response);
  //   } catch (error) {
  //     console.log("Error at fetching Total EMployee:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchTotalEmployee();
  //   fetchTotalDeparment();
  // }, [accessToken, refreshToken]);

  // if (isLoading) {
  //   return <Skeleton isLoading={isLoading} height="h-32" />;
  // }

  return (
    <div className="grid grid-col-1 lg:grid-cols-3 gap-4">
      {/* {isLoading ? (
        <Skeleton isLoading={isLoading} height="h-20" />
      ) : ( */}
      <StatsCard
        title="Total Employees"
        value={totalEmployee.totalEmployees || 0}
        position="1"
      />
      {/* )} */}
      {/* {isLoading ? (
        <Skeleton isLoading={isLoading} height="h-20" />
      ) : ( */}
      <StatsCard
        title="Total Team"
        value={totalDepartment?.teams || 0}
        position="2"
      />
      {/* )} */}
      {/* {isLoading ? (
        <Skeleton isLoading={isLoading} height="h-20" />
      ) : ( */}
      <StatsCard title="Total Payroll" value="0" position="3" />
      {/* )} */}
    </div>
  );
};

export default Stats;
