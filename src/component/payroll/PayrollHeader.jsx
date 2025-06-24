import { ButtonSmallPurple } from "../Buttons";
import Welcome from "../Welcome";
import { CiWallet } from "react-icons/ci";

const PayrollHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center bg-ter1 my-4 px-4 rounded-2xl">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-4">
        <CiWallet className="text-primary11 place-self-center w-10 h-10 lg:w-24 lg:h-24 mt-3 lg:mt-0 " />
        <Welcome header="Payroll" message="Manage all payments" />
      </div>
      <ButtonSmallPurple
        width=""
        height=""
        padding=""
        className="px-4 py-2 text-white rounded-lg"
      >
        Pay All Invoices
      </ButtonSmallPurple>
    </div>
  );
};

export default PayrollHeader;
