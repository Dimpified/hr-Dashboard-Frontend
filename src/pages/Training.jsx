import TrainingFilter from "../component/training/TrainingFilter";
import TrainingHeader from "../component/training/TrainingHeader";
import DashboardLayout from "../layout/DashboardLayout";
import { FiClock } from "react-icons/fi";

const Training = () => {
  return (
    <DashboardLayout>
      <div className="relative">
        {/* Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-blur-[1px] rounded-lg">
          <FiClock className="text-6xl text-primary11 mb-3 " />
          <h2 className="text-3xl font-bold text-primary11">Coming Soon</h2>
          <p className="text-primary11 mt-1">This feature is on the way!</p>
        </div>

        <div className="opacity-20 blur-sm pointer-events-none select-none">
          <TrainingHeader /> <TrainingFilter />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Training;
