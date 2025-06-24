import ManageEmployeeTable from "../component/employee/ManageEmployee";
import DashboardLayout from "../layout/DashboardLayout";
import EmployeeHeader from "../component/employee/EmployeeHeader";

const Employee = () => {
  return (
    <DashboardLayout>
      <EmployeeHeader />
      <ManageEmployeeTable />
    </DashboardLayout>
  );
};

export default Employee;
