import { FaFilter } from "react-icons/fa";

const payrollData = [
  {
    name: "Person 1",
    email: "person1@gmail.com",
    department: "Product Manager",
    ticketId: "#00000",
    amount: "N0",
    status: "Verifying",
  },
  {
    name: "Person 2",
    email: "person2@gmail.com",
    department: "Product Designer",
    ticketId: "#1111111",
    amount: "N0",
    status: "Pending",
  },
  {
    name: "Person 3",
    email: "person3@gmail.com",
    department: "Product Engineer",
    ticketId: "#00000",
    amount: "N0",
    status: "Paid",
  },
  {
    name: "Person 4",
    email: "person4@gmail.com",
    department: "Engineering",
    ticketId: "#00000",
    amount: "N0",
    status: "Paid",
  },
  {
    name: "Person 5",
    email: "person5@gmail.com",
    department: "Engineering",
    ticketId: "#00000",
    amount: "N0",
    status: "Paid",
  },
  {
    name: "Person 6",
    email: "person6@gmail.com",
    department: "Engineering",
    ticketId: "#00000",
    amount: "N0",
    status: "Verifying",
  },
  {
    name: "Person 7",
    email: "person7@gmail.com",
    department: "Engineering",
    ticketId: "#00000",
    amount: "N0",
    status: "Pending",
  },
  {
    name: "Person 8",
    email: "person8@gmail.com",
    department: "Engineering",
    ticketId: "#00000",
    amount: "N0",
    status: "Verifying",
  },
  {
    name: "Person 9",
    email: "person9@gmail.com",
    department: "Engineering",
    ticketId: "#00000",
    amount: "N0",
    status: "Pending",
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "Verifying":
      return (
        <span className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded-lg">
          Verifying
        </span>
      );
    case "Pending":
      return (
        <span className="px-2 py-1 text-xs text-red-600 bg-red-100 rounded-lg">
          Pending
        </span>
      );
    case "Paid":
      return (
        <span className="px-2 py-1 text-xs text-green-600 bg-green-100 rounded-lg">
          Paid
        </span>
      );
    default:
      return (
        <span className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-lg">
          Unknown
        </span>
      );
  }
};

const PayrollTable = () => {
  return (
    <div className="py-10 min-h-screen flex justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            LIST OF PAYROLLS
          </h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
              <FaFilter /> Filter
            </button>
          </div>
        </div>

        {/* Payroll Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-left">
                <th className="p-3">
                  <input type="checkbox" />
                </th>
                <th className="p-3">NAME</th>
                <th className="p-3">EMAIL</th>
                <th className="p-3">DEPARTMENT</th>
                <th className="p-3">TICKET ID</th>
                <th className="p-3">AMOUNT</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map((payroll, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                  <td className="p-3 text-primary11">{payroll.name}</td>
                  <td className="p-3">{payroll.email}</td>
                  <td className="p-3">{payroll.department}</td>
                  <td className="p-3">{payroll.ticketId}</td>
                  <td className="p-3">{payroll.amount}</td>
                  <td className="p-3">{getStatusBadge(payroll.status)}</td>
                  <td className="p-3">
                    <button className="px-3 py-1 bg-primary11 text-white text-xs rounded-lg hover:bg-primary4">
                      {payroll.status === "Paid" ? "View" : "Pay"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center text-gray-600">
          <p>Showing 1 to 11 of 13 employees</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-100">
              Previous
            </button>
            <button className="px-3 py-1 bg-primary11 text-white rounded-lg hover:bg-primary4">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollTable;
