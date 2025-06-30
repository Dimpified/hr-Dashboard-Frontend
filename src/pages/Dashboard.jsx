import DashboardLayout from "../layout/DashboardLayout";
import Stats from "../component/dashboard/Stats";
import EmployeeTable from "../component/tables/EmployeeTable";
import WorkHoursChart from "../component/charts/WorkHoursChart";
import TimeOffCard from "../component/card/TimeOffCard";
import DailyAttendance from "../component/dashboard/DailyAttendance";
import DashboardHeader from "../component/dashboard/DashboardHeader";
import { useSelector } from "react-redux";
import EmployeeTurnoverChart from "../component/group-hr/EmployeeTurnoverChart";
import DepartmentPerformanceDonut from "../component/group-hr/DepartmentPerformanceDonut";

const Dashboard = () => {
  const userRole = useSelector((state) => state?.auth?.user?.role);

  return (
    <DashboardLayout>
      <DashboardHeader />
      <Stats />
      <DailyAttendance />
      {userRole === "group-hr" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <EmployeeTurnoverChart />
          <DepartmentPerformanceDonut />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <WorkHoursChart />
          <TimeOffCard />
        </div>
      )}

      <EmployeeTable />
    </DashboardLayout>
  );
};

export default Dashboard;
