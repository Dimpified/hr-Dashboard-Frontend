import { Heading, TextSpan } from "./Text";
import { useSelector } from "react-redux"; // Ensure you import useSelector

const Welcome = ({ header, message }) => {
  const user = useSelector((state) => state?.auth?.user.profile);
  const userProfile = useSelector((state) => state?.profile?.profile);
  const userRole = useSelector((state) => state?.auth?.user?.role);
  const defaultMessage =
    user || userProfile ? (
      <TextSpan
        color=""
        className="flex items-center justify-center lg:justify-start whitespace-nowrap"
      >
        Welcome Back{" "}
        <div className="font-semibold ms-1">
          {userProfile?.fullName || user?.fullName}
        </div>
        !
      </TextSpan>
    ) : (
      `Hi User, welcome back to Dimp ${userRole || "Staff"}!`
    );
  return (
    <div className="w-full flex flex-col py-4 lg:py-10 space-y-3">
      <Heading
        level={1}
        className="text-center lg:text-left text-xl md:text-3xl"
        size=""
        color=""
        weight="font-semibold"
        font="font-body"
        lineHeight="leading-1"
      >
        {header}
      </Heading>
      <TextSpan className="text-primary5 text-center lg:text-left">
        {message || defaultMessage}
      </TextSpan>
    </div>
  );
};

Welcome.defaultProps = {
  header: "Overview for Sales Department",
};

export default Welcome;
