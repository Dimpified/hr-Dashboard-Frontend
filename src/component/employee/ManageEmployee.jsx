import { useState } from "react";
import OrganizationalChart from "../charts/OrganizationalChart";
import ManageEmployeeTable from "../tables/ManageEmployeeTable";
import EmployeeTabActions from "./EmployeeTabActions";
import RequestTimeOff from "../tables/RequestTimeOff";

const ManageEmployee = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ["Manage Employees", "Organization Chart", "Request Time Off"];

  return (
    <div className="min-h-screen">
      {/* Tabs Section */}
      <div className="flex flex-col lg:flex-row justify-between space-x-2 bg-white p-2 rounded-md shadow-md">
        <div className="flex flex-col lg:flex-row mb-10 lg:mb-0">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setSelectedTab(index)}
              className={`py-2 px-4 rounded-lg focus:outline-none ${
                selectedTab === index
                  ? "bg-primary11 text-white transition duration-300"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <EmployeeTabActions selectedTab={selectedTab} />
      </div>

      {/* Tab Panels */}
      <div className="mt-6">
        {selectedTab === 0 && <ManageEmployeeTable />}
        {selectedTab === 1 && (
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Organization Chart</h2>
            <p className="text-gray-600">
              This section contains the organizational chart.
            </p>
            <OrganizationalChart />
          </div>
        )}
        {selectedTab === 2 && (
          <div className="bg-white p-4 rounded-md shadow-md">
            <RequestTimeOff />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEmployee;
