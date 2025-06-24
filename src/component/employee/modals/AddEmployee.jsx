import { useSelector } from "react-redux";
import api from "../../../api/dashboardApi";
import { useState } from "react";
import { showToast } from "../../../component/ShowToast";
import { FaSpinner } from "react-icons/fa";

const AddEmployeeModal = ({ isOpen, onClose }) => {
  const { accessToken, refreshToken } = useSelector((state) => state?.auth);
  const userDetails = useSelector((state) => state?.auth?.user);
  const initialFormData = {
    email: "",
    role: "",
    department: userDetails?.department,
    contractType: "",
    contractEndDate: "",
    dateOfResumption: "",
    team: "",
    cadre: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log("Submitting form data:", formData);

    try {
      const response = await api.onboardEmployee({
        accessToken,
        refreshToken,
        formData,
      });

      setFormData(initialFormData);
      onClose();
      showToast(response.message);
    } catch (error) {
      console.log(error);
      showToast(error.message || "Failed to onboard employee", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-[3px] bg-black/20 transition duration-300">
      <div className="bg-white rounded-lg shadow-lg w-96 md:w-[600px] p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold text-gray-800">Add Employee</h2>
        <p className="text-sm text-gray-500 mb-4">Kindly enter the details</p>

        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="text-gray-600 block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                placeholder="Email Address"
              />
            </div>

            {/* Role */}
            <div>
              <label className="text-gray-600 block mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              >
                <option value="">- Select Role -</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Content Writer/ Media Associate">
                  Content Writer/ Media Associate
                </option>
                <option value="UI/UX Developer">UI/UX Developer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Customer support">Customer support</option>
                <option value="Product Development Team Lead">
                  Product Development Team Lead
                </option>
                <option value="Marketing Team Lead">Marketing Team Lead</option>
                <option value="Finance Team Lead">Finance Team Lead</option>
                <option value="SIWES attachment">SIWES attachment</option>
                <option value="Brand Identity Designer">
                  Brand Identity Designer
                </option>
                <option value="HR">HR</option>
                <option value="Cyber security">Cyber security</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Finance">Finance</option>
                <option value="Social Media/ Graphics designer">
                  Social Media/ Graphics designer
                </option>
                <option value="Backend Developer Team Lead">
                  Backend Developer Team Lead
                </option>
                <option value="Mobile App Developer">
                  Mobile App Developer
                </option>
                <option value="Engineering Team Lead">
                  Engineering Team Lead
                </option>
                <option value="Design/development Team Lead">
                  Design/development Team Lead
                </option>
                <option value="Marketing Team Lead">Marketing Team Lead</option>
                <option value="Product Team Lead">Product Team Lead</option>
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="text-gray-600 block mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none bg-sec6"
                placeholder="Department"
                readOnly
              />
            </div>

            {/* Team */}
            <div>
              <label className="text-gray-600 block mb-1">Team</label>
              <select
                name="team"
                value={formData.team}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              >
                <option value="">- Select Team -</option>
                <option value="Engineering">Engineering</option>
                <option value="Design/development">Design/development</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="HR">HR</option>
                <option value="Product">Product</option>
                <option value="Mobile App">Mobile App</option>
              </select>
            </div>

            {/* Cadre */}
            <div>
              <label className="text-gray-600 block mb-1">Cadre</label>
              <select
                name="cadre"
                value={formData.cadre}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              >
                <option value="">- Select Cadre -</option>
                <option value="Intern">Intern</option>
                <option value="semi-associate">Semi-Associate</option>
                <option value="Associate">Associate</option>
                <option value="Senior Associate">Senior Associate</option>
                <option value="Manager">Manager</option>
                <option value="Senior Manager">Senior Manager</option>
                <option value="Vice President">Vice President</option>
                <option value="President">President</option>
              </select>
            </div>

            {/* Date of Resumption */}
            <div>
              <label className="text-gray-600 block mb-1">
                Date of Resumption
              </label>
              <input
                type="date"
                name="dateOfResumption"
                value={formData.dateOfResumption}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
            </div>

            {/* Contract Type */}
            <div>
              <label className="text-gray-600 block mb-1">Contract Type</label>
              <select
                name="contractType"
                value={formData.contractType}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              >
                <option value="">- Select Option -</option>
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Contract End Date */}
            <div>
              <label className="text-gray-600 block mb-1">
                Contract End Date
              </label>
              <input
                type="date"
                name="contractEndDate"
                value={formData.contractEndDate}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              className="px-4 py-2 border border-gray-400 rounded-lg text-gray-600 hover:cursor-pointer hover:bg-gray-200"
              onClick={() => setFormData(initialFormData)}
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary11 text-white rounded-lg hover:bg-primary4 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
