import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Employee from "../pages/Employee";
import Payroll from "../pages/Payroll";
import EmployeeBioData from "./employee/EmployeeBioData";
import EmployeePerformance from "./employee/EmployeePerformance";
import Login from "../pages/authentication/Login";
import Feedback from "../pages/Feedback";
import Training from "../pages/Training";
import HelpCenter from "../pages/HelpCenter";
import HelpCenterMessagePage from "../component/help-center/HelpCenterMessagePage";
import FeedbackMessagePage from "./feedback/FeedbackMessagePage";
import AddNewCourse from "./training/AddNewCourse";
import Tasks from "../pages/Tasks";
import Onboarding from "../pages/authentication/Onboarding";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/employee" element={<Employee />} />
        <Route path="/admin/view-all-tasks" element={<Tasks />} />
        <Route path="/admin/payroll" element={<Payroll />} />
        <Route path="/admin/feedback" element={<Feedback />} />
        <Route path="/admin/feedback-form" element={<FeedbackMessagePage />} />
        <Route path="/admin/training" element={<Training />} />
        <Route path="/admin/add-course" element={<AddNewCourse />} />
        <Route path="/admin/help-center" element={<HelpCenter />} />
        <Route path="/help-center-form" element={<HelpCenterMessagePage />} />
        <Route
          path="/admin/employeebiodata/:id"
          element={<EmployeeBioData />}
        />
        <Route
          path="/admin/employeeperformance/:id"
          element={<EmployeePerformance />}
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
