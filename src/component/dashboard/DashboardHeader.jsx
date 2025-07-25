import { RxDashboard } from "react-icons/rx";
import Welcome from "../Welcome";

const DashboardHeader = () => {
  return (
    // <div className="flex flex-col lg:flex-row justify-between items-center bg-ter1 my-4 px-4 rounded-2xl">
    <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-4">
      <RxDashboard className="text-primary11 place-self-center w-10 h-10 mt-3 lg:mt-0" />
      <Welcome header="Dashboard" message="" />
    </div>
    // </div>
  );
};

export default DashboardHeader;
