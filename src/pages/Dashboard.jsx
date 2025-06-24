import DashboardLayout from "../layout/DashboardLayout";
import Welcome from "../component/Welcome";

import { RxDashboard } from "react-icons/rx";
import Stats from "../component/dashboard/Stats";
import EmployeeTable from "../component/tables/EmployeeTable";
import WorkHoursChart from "../component/charts/WorkHoursChart";
import TimeOffCard from "../component/card/TimeOffCard";
import DailyAttendance from "../component/dashboard/DailyAttendance";
import DashboardHeader from "../component/dashboard/DashboardHeader";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <Stats />
      <DailyAttendance />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <WorkHoursChart />
        <TimeOffCard />
      </div>
      <EmployeeTable />
    </DashboardLayout>
  );
};

export default Dashboard;
