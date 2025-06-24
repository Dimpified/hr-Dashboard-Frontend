const EditOrganizationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-[3px] bg-black/20 transition duration-300 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 md:w-[600px] p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold text-gray-800">
          Edit Organization
        </h2>
        <p className="text-sm text-gray-500 mb-4">Kindly enter the details</p>

        {/* Form Fields */}
        <form>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-gray-600 block mb-1">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                placeholder="Full name"
              />
            </div>

            {/* Role */}
            <div>
              <label className="text-gray-600 block mb-1">Role</label>
              <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none">
                <option value="">- Select Option -</option>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Marketer">Marketer</option>
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="text-gray-600 block mb-1">Department</label>
              <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none">
                <option value="">- Select Option -</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              className="px-4 py-2 border border-gray-400 rounded-lg text-gray-600"
            >
              Edit
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary11 text-white rounded-lg hover:bg-primary4"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrganizationModal;
