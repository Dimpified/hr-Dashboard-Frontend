import { useState } from "react";
import { FaUpload, FaEdit } from "react-icons/fa";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router";

const AddNewCourse = () => {
  const [formData, setFormData] = useState({
    organization: "Coursera",
    organizationLogo: "Coursera",
    briefDescription: "Beginner Friendly",
    jobLink: "wwwwwwwwwwwwwwwwwwww",
    image: null,
  });

  const navigate = useNavigate();

  const handleCancel = () => {
    setFormData({
      organization: "",
      organizationLogo: "",
      briefDescription: "",
      jobLink: "",
      image: null,
    });
    navigate(-1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  return (
    <DashboardLayout>
      <div className="mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-purple-900">
            Add New Learning
          </h2>
          <button className="flex items-center text-primary11 border border-primary11 px-3 py-1.5 rounded-lg">
            <FaEdit className="mr-2" /> Edit
          </button>
        </div>
        <p className="text-gray-500 mt-1 mb-4">
          Kindly add a new Learning course
        </p>

        {/* Form */}
        <form className="space-y-4">
          {/* Organization */}
          <div>
            <label className="block text-gray-700 font-medium">
              Organization
            </label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium">
              Image Upload
            </label>
            <label className="w-full border rounded-md flex flex-col items-center justify-center p-10 cursor-pointer text-gray-500">
              <FaUpload className="text-2xl mb-2" />
              <span>Upload</span>
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Organization Logo */}
          <div>
            <label className="block text-gray-700 font-medium">
              Organization Logo
            </label>
            <input
              type="text"
              name="organizationLogo"
              value={formData.organizationLogo}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          {/* Brief Description */}
          <div>
            <label className="block text-gray-700 font-medium">
              Brief Description
            </label>
            <input
              type="text"
              name="briefDescription"
              value={formData.briefDescription}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          {/* Job Link */}
          <div>
            <label className="block text-gray-700 font-medium">Job Link</label>
            <input
              type="text"
              name="jobLink"
              value={formData.jobLink}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-5">
            <button
              className="bg-red-100 text-red-600 px-6 py-2 rounded-md border border-red-600"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="bg-primary11 text-white px-6 py-2 rounded-md">
              Upload
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddNewCourse;
