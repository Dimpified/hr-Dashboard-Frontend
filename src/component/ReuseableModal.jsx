const ReuseableModal = ({ Children }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-[3px] bg-black/20 transition duration-300">
      <div className="bg-white rounded-lg shadow-lg w-96 md:w-[600px] p-6 relative">
        {Children}
      </div>
    </div>
  );
};

export default ReuseableModal;
