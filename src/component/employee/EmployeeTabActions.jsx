import { BiEdit } from "react-icons/bi";
import { ShortInputWithPlaceholder } from "../Inputs";
import { useState } from "react";
import AddEmployeeModal from "./modals/AddEmployee";
import EditOrganizationModal from "./modals/EditOrganization";
import { useNavigate } from "react-router";

const EmployeeTabActions = ({ selectedTab }) => {
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isEditOrganizationOpen, setIsEditOrganizationOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      {selectedTab === 0 && (
        <div className="flex items-center justify-end space-x-1">
          {/* <ShortInputWithPlaceholder
            padding=""
            lineHeight=""
            className="rounded-lg"
            placeholder="Search Here...."
          /> */}

          <button
            className="ml-auto border border-primary11 text-primary11 px-3 py-2 rounded-md cursor-pointer"
            onClick={() => navigate("/admin/view-all-tasks")}
          >
            View Task
          </button>
          <button
            className="ml-auto bg-primary11 text-white px-3 py-2 rounded-md"
            onClick={() => setIsAddEmployeeOpen(true)}
          >
            + Add Employee
          </button>
        </div>
      )}
      {selectedTab === 1 && (
        <div className="flex items-center justify-end space-x-1">
          {/* <button
            className="flex items-center ml-auto border text-gray-400 hover:text-primary11 hover:border-primary11 px-3 py-2 rounded-md"
            onClick={() => setIsEditOrganizationOpen(true)}
          >
            <BiEdit />
            <span>Edit Organization</span>
          </button> */}
          <button
            className="ml-auto bg-primary11 text-white px-3 py-2 rounded-md"
            onClick={() => setIsAddEmployeeOpen(true)}
          >
            + Add Employee
          </button>
        </div>
      )}
      {selectedTab === 2 && (
        <div className="flex items-center justify-end space-x-1">
          {/* <ShortInputWithPlaceholder
            padding=""
            lineHeight=""
            className="rounded-lg"
            placeholder="Search Here...."
          /> */}
          <button
            className="ml-auto bg-primary11 text-white px-3 py-2 rounded-md"
            onClick={() => setIsAddEmployeeOpen(true)}
          >
            + Add Employee
          </button>
        </div>
      )}

      <AddEmployeeModal
        isOpen={isAddEmployeeOpen}
        onClose={() => setIsAddEmployeeOpen(false)}
      />

      <EditOrganizationModal
        isOpen={isEditOrganizationOpen}
        onClose={() => setIsEditOrganizationOpen(false)}
      />
    </div>
  );
};

export default EmployeeTabActions;
