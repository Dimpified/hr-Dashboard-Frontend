import { IoShareSocial } from "react-icons/io5";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";
import Welcome from "../Welcome";
import { LiaSwatchbookSolid } from "react-icons/lia";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router";

const TrainingHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center bg-ter1 my-4 px-4 rounded-2xl">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-4">
        <LiaSwatchbookSolid className="text-primary11 place-self-center w-10 h-10 lg:w-24 lg:h-24 mt-3 lg:mt-0 " />
        <Welcome header="Training Opportunity" message="Manage all training" />
      </div>
      <div className="flex items-center justify-between gap-2">
        <ButtonSmallWhite
          className="p-2 rounded-lg flex h-auto items-center space-x-1.5 hover:bg-primary11 hover:text-white cursor-pointer"
          width=""
          padding=""
        >
          <IoShareSocial /> <span>Share Link</span>
        </ButtonSmallWhite>
        <ButtonSmallPurple
          className="p-2 rounded-lg flex items-center space-x-1.5 hover:bg-primary11 hover:text-primary12 cursor-pointer"
          width=""
          padding=""
          height=""
          onClick={() => navigate("/admin/add-course")}
        >
          <IoIosAdd />
          <span>Add Course</span>
        </ButtonSmallPurple>
        <ButtonSmallPurple
          className="p-2 rounded-lg flex items-center bg-sec8 space-x-1.5 hover:bg-primary11 cursor-pointer"
          width=""
          padding=""
          height=""
        >
          <IoIosAdd />
          <span>Schedule Training</span>
        </ButtonSmallPurple>
      </div>
    </div>
  );
};

export default TrainingHeader;
