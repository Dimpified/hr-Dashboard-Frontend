const PaymentMethod = () => {
  const paymentDetails = {
    cardholder: "Get Funded Africa",
    account: "0280379022",
    expiration: "00/00",
    method: "Debit Card .Master",
  };
  return (
    <div className="my-6 p-3 lg:p-6 border border-primary11 rounded-md text-primary4 space-y-10">
      <div className="flex  flex-col lg:flex-row  items-center justify-between ">
        <div className="text-lg font-semibold">Payment Method</div>
        <button className="border border-primary11 p-2 rounded-md text-lg font-semibold">
          Change Payment Method
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:items-center justify-center lg:justify-between">
        <div className="flex flex-col lg:space-y-3">
          <div>Cardholder Name</div>
          <div className="text-lg font-semibold">
            {paymentDetails.cardholder}
          </div>
        </div>
        <div className="flex flex-col lg:space-y-3">
          <div>Account Number</div>
          <div className="text-lg font-semibold">{paymentDetails.account}</div>
        </div>
        <div className="flex flex-col lg:space-y-3">
          <div>Expiration Date</div>
          <div className="text-lg font-semibold">
            {paymentDetails.expiration}
          </div>
        </div>
        <div className="flex flex-col lg:space-y-3">
          <div>Payment Method</div>
          <div className="text-lg font-semibold">{paymentDetails.method}</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
