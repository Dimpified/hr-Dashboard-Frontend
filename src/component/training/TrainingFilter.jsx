import { useState } from "react";
import { Heading } from "../Text";
import TrainingCards from "./TrainingCards";

const TrainingFilter = () => {
  const [filterType, setFilterType] = useState("Week");

  const handleChange = (type) => {
    setFilterType(type);
  };

  return (
    <div className="flex flex-col">
      <div className="flex px-10 py-2 justify-between items-center">
        <Heading
          className="text-2xl text-sec11 font-semibold"
          size=""
          color=""
          weight=""
          font=""
          lineHeight=""
        >
          All Trainings
        </Heading>
        <div>
          <ul className="flex items-center gap-3 text-sec11">
            <li
              className={`border py-1.5 px-3.5 ${
                filterType === "Today"
                  ? "bg-primary11 text-white"
                  : "text-primary11"
              } hover:bg-primary11 hover:text-white cursor-pointer rounded-lg transition-all duration-300`}
              onClick={() => handleChange("Today")}
            >
              Today
            </li>
            <li
              className={`border py-1.5 px-3.5 ${
                filterType === "Week"
                  ? "bg-primary11 text-white"
                  : "text-primary11"
              } hover:bg-primary11 hover:text-white cursor-pointer rounded-lg transition-all duration-300`}
              onClick={() => handleChange("Week")}
            >
              Week
            </li>
            <li
              className={`border py-1.5 px-3.5 ${
                filterType === "Month"
                  ? "bg-primary11 text-white"
                  : "text-primary11"
              } hover:bg-primary11 hover:text-white cursor-pointer rounded-lg transition-all duration-300`}
              onClick={() => handleChange("Month")}
            >
              Month
            </li>
          </ul>
        </div>
      </div>
      <TrainingCards filterType={filterType} />
    </div>
  );
};

export default TrainingFilter;
