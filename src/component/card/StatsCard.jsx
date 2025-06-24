import { TextSpan } from "../Text";

const StatsCard = ({ title, value, position }) => {
  const colorChange = (position) => {
    switch (position) {
      case "1":
        return "bg-linear-to-tr from-[#2C3387] to-[#180E2B]";
      case "2":
        return "bg-linear-to-tr from-[#C9C42A] to-[#100F01]";
      case "3":
        return "bg-linear-to-tr from-[#008361] to-[#004D3A]";
      default:
        return "bg-linear-to-tr from-sec10 to-sec11";
    }
  };

  return (
    <div className="py-6 justify-between text-white">
      <div
        className={`flex flex-col justify-center shadow-xl rounded-lg p-4 ${colorChange(
          position
        )} space-y-4 hover:scale-105 transition duration-300`}
      >
        <TextSpan size="" color="" className="text-xl text-white">
          {title}
        </TextSpan>
        <TextSpan size="" color="" className="text-3xl">
          {value}
        </TextSpan>
      </div>
    </div>
  );
};

export default StatsCard;
