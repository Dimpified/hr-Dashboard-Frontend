import { ButtonSmallPurple } from "../Buttons";
import { ShortInputWithPlaceholder } from "../Inputs";
import { Heading } from "../Text";
import api from "../../api/dashboardApi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const DailyAttendance = () => {
  const user = useSelector((state) => state?.auth?.user?.profileData);
  const userEmail = useSelector((state) => state?.auth?.user?.email);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCode = async () => {
    setLoading(true);
    try {
      const response = await api.generateCode({
        accessToken,
        refreshToken,
        userEmail,
      });

      setCode(response);
    } catch (error) {
      console.log("Error at fetching code:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-6 my-10 lg:my-4 flex flex-col lg:flex-row items-center justify-between gap-2">
      <div className="flex flex-col lg:flex-row items-center gap-2 lg:space-x-4">
        <Heading
          className="text-2xl lg:text-xl text-sec11"
          size=""
          color=""
          weight="font-semibold"
          font="font-body"
          lineHeight=""
        >
          Daily Attendance Code
        </Heading>
        <ShortInputWithPlaceholder
          placeholder="Attendance code..."
          value={code.data?.code || ""}
          size=""
          color=""
          weight="font-normal"
          lineHeight=""
          className="border-primary11 border-2 focus:ring-primary11 rounded-lg text-sec11"
          disabled
        />
      </div>
      <ButtonSmallPurple
        className="p-3 cursor-pointer hover:bg-primary4 disabled:opacity-50 disabled:cursor-not-allowed"
        width=""
        bg="primary11"
        padding=""
        height=""
        onClick={fetchCode}
        disabled={loading || code.data?.code ? true : false}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <FaSpinner className="animate-spin" />
            Generating...
          </div>
        ) : (
          "Generate Code"
        )}
      </ButtonSmallPurple>
    </div>
  );
};

export default DailyAttendance;
