import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/DIMP logo colored.png";
import OverviewImg from "../assets/overview.svg";
import CalendarImg from "../assets/CalendarDots.svg";
import cashImg from "../assets/cash.svg";
import ticketImg from "../assets/ticket.svg";
import subscriptionImg from "../assets/subscription.svg";
import logOutImg from "../assets/SignOut.svg";
import { Heading, TextSpan } from "../component/Text";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../assets/person.png";
import { RiMenu3Line } from "react-icons/ri";
import { MdCancel, MdOutlineCancel } from "react-icons/md";
import { logout } from "../features/authentication";
import api from "../api/dashboardApi";
import { lowerSteps } from "../data/constant";

const steps = [
  {
    label: "Dashboard",
    link: "/admin/dashboard",
    icon: OverviewImg,
    permission: "overView",
  },
  {
    label: "Employee",
    link: "/admin/employee",
    icon: CalendarImg,
    permission: "userBase",
  },
  {
    label: "Payroll",
    link: "/admin/payroll",
    icon: subscriptionImg,
    permission: "subscription",
  },
  {
    label: "Feedback",
    link: "/admin/feedback",
    icon: cashImg,
    permission: "transaction",
  },
  {
    label: "Training",
    link: "/admin/training",
    icon: ticketImg,
    permission: "supportTicket",
  },
];

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  // const userPlan = useSelector((state) => state?.auth?.user.role);
  // const userPermissions = PERMISSIONS[userPlan] || PERMISSIONS["Admin"] || {};
  // const userImage = useSelector((state) => state.auth.user?.image || null);
  const user = useSelector((state) => state?.auth?.user.profile);
  const userProfile = useSelector((state) => state?.profile?.profile);

  const userRole = useSelector((state) => state?.auth?.user?.role);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  // const userEmail = useSelector((state) => state?.auth?.user.email);

  const getNotification = async () => {
    try {
      // Ensure tokens exist before making the API call
      if (!accessToken || !refreshToken) return;

      const response = await api.notificationData({
        accessToken,
        refreshToken,
        // userEmail,
      });

      console.log("emao:", userEmail);
      setNotifications(response);
    } catch (error) {
      console.error("Could not get notifications:", error);
    }
  };

  useEffect(() => {
    getNotification();
  }, [accessToken, refreshToken]);

  // Toggle the sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  const [isResSidebarOpen, setResIsSidebarOpen] = useState(false);

  // Function to handle the button click
  const toggleResSidebar = () => {
    setResIsSidebarOpen(!isResSidebarOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Utility function to truncate messages
  const truncateMessage = (message, maxLength = 60) => {
    return message.length > maxLength
      ? `${message.slice(0, maxLength)}...`
      : message;
  };

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count > 0) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-primary1 font-display">
      {/* Sidebar */}
      <div
        className={`hidden lg:block h-full transition-all relative duration-300 p-3 ${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-sec1 border-r border-gray-200 flex flex-col`}
      >
        {/* Logo */}
        <div className={`flex justify-center pb-2 border-b-2 border-primary6`}>
          {isSidebarOpen ? (
            <>
              <Link to="/admin/dashboard">
                <img
                  src={Logo}
                  alt="Logo"
                  className={`transition-all duration-300 place-self-center ${
                    isSidebarOpen ? "w-11" : "hidden"
                  }`}
                />
              </Link>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="flex items-center text-xl my-4"
            >
              <RiMenu3Line size={25} />
            </button>
          )}
        </div>

        {/* Sidebar Links */}
        <div className="flex-grow flex flex-col mt-3 items-start space-y-1">
          {steps.map((step, index) => {
            const isActive = step.isActive
              ? step.isActive(location.pathname)
              : location.pathname === step.link;

            return (
              <Link
                to={step.link}
                key={index}
                className={`flex items-center w-full hover:bg-primary11 hover:text-white rounded-lg p-2 transition-all duration-300 ${
                  isActive ? "bg-primary11 text-white" : ""
                }`}
              >
                <img
                  src={step.icon}
                  alt={step.label}
                  className={` transition-all duration-300 ${
                    isSidebarOpen ? "mr-3 w-6 h-6" : "w-24 h-6"
                  }`}
                />
                {isSidebarOpen && (
                  <Heading
                    level={4}
                    size="lg"
                    lineHeight="leading-1"
                    color={isActive ? "primary4" : "primary4"}
                    className={`font-semibold xl:text-[13px] lg:text-[11px] ${
                      isActive ? "font-bold" : "font-normal"
                    }`}
                  >
                    {step.label}
                  </Heading>
                )}
              </Link>
            );
          })}
          <div className="w-full border-t-2 border-sec6">
            <div
              className={`font-semibold py-2 ${isSidebarOpen ? "" : "hidden"}`}
            >
              OTHERS
            </div>
            {lowerSteps.map((step, index) => {
              const isActive = step.isActive
                ? step.isActive(location.pathname)
                : location.pathname === step.link;

              return (
                <Link
                  to={step.link}
                  key={index}
                  className={`flex items-center w-full hover:bg-primary11 rounded-lg p-2 transition-all duration-300 ${
                    isActive ? "bg-primary11 text-white" : ""
                  }`}
                >
                  <img
                    src={step.icon}
                    alt={step.label}
                    className={` transition-all duration-300 ${
                      isSidebarOpen ? "mr-3 w-6 h-6" : "w-24 h-6"
                    }`}
                  />
                  {isSidebarOpen && (
                    <Heading
                      level={4}
                      size="lg"
                      lineHeight="leading-1"
                      color={isActive ? "primary4" : "primary4"}
                      className={`font-semibold xl:text-[13px] lg:text-[11px] ${
                        isActive ? "font-bold" : "font-normal"
                      }`}
                    >
                      {step.label}
                    </Heading>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Logout Button */}
        <div className="bottom-6 absolute hover:shadow-md ">
          <button
            onClick={handleLogout}
            className={`flex items-center p-2 text-red-700 transition-all duration-300 ${
              isSidebarOpen ? "justify-start" : "justify-center"
            }`}
          >
            <img
              src={logOutImg}
              alt="Logout"
              className="w-6 h-6 transition-all duration-300 mr-4"
            />
            {isSidebarOpen && (
              <Heading
                level={4}
                size="lg"
                lineHeight="leading-1"
                className="font-semibold xl:text-[13px] lg:text-[11px]"
              >
                Log Out
              </Heading>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full h-screen grid grid-cols-1 font-body ">
        <div className="hidden lg:block">
          <div className="flex items-center justify-between bg-white p-4 border-b-2 border-primary6">
            {isSidebarOpen ? (
              <button
                onClick={toggleSidebar}
                className="flex items-center text-xl"
              >
                <RiMenu3Line size={25} />
              </button>
            ) : (
              <>
                <img
                  src={Logo}
                  alt="Logo"
                  className={`transition-all duration-300 w-28`}
                />
              </>
            )}
            <div className="flex justify-between w-4/12">
              {/* Navigation Links */}
              {/* <div className="relative flex items-center lg:space-x-4 ">
                <LongInputWithPlaceholder
                  type="text"
                  placeholder="Search here..."
                  className="appearance-none bg-transparent border rounded-lg w-full text-gray-700 leading-tight pr-44 focus:border-primary11"
                />
                <IoIosSearch size={30} className="absolute right-0" />
              </div> */}
            </div>

            {/* User Controls (Notification, Theme Switch, Profile) */}
            <div className="flex items-center mr-8">
              {/* <img
                src={NotificationIcon}
                alt="Notifications"
                className="w-8 h-auto p-1 cursor-pointer border border-sec2 rounded-lg hover:bg-primary6 mr-4"
                onClick={toggleNotification}
              /> */}
              {/* <img
                src={ThemeSwitchIcon}
                alt="Theme Switch"
                className="w-6 h-6 cursor-pointer mr-3"
              /> */}

              <img
                src={userProfile?.imageUrl || user?.profile?.imageUrl || Avatar}
                alt="user image"
                className="rounded-full border-2 border-primary5 bg-primary5 w-8 h-8 mr-2"
              />

              <div className="flex flex-col justify-center space-y-1 text-sec11">
                <TextSpan
                  size=""
                  color=""
                  weight="font-medium"
                  lineHeight="leading-none"
                  className="text-sm"
                >
                  {user?.user?.fullName}
                </TextSpan>
                <TextSpan
                  size=""
                  color=""
                  weight="font-medium"
                  lineHeight="leading-none"
                  className="text-xs"
                >
                  {/* {user.role} */}
                </TextSpan>
              </div>
              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div
                  className="absolute right-20 top-12 bg-white bg-opacity-100 shadow-lg border border-gray-200 rounded-lg w-80 p-4"
                  style={{ zIndex: 999 }}
                >
                  <div className="flex justify-between items-center border-b border-primary6 pb-2 mb-2">
                    <Heading
                      level={4}
                      size="lg"
                      lineHeight="leading-1"
                      className="font-semibold text-lg"
                    >
                      Notifications
                    </Heading>
                    <button
                      onClick={toggleNotification}
                      className="text-gray-500"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="border-b border-primary6 py-4">
                    <p className="text-gray-700 font-semibold mb-2">Today</p>
                    {/* Check if there are notifications */}
                    {notifications.length === 0 ? (
                      <p className="text-gray-500 text-center">
                        No new notifications
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {notifications
                          .slice(0, 3)
                          .map((notification, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <FontAwesomeIcon
                                icon={faEnvelope}
                                className="w-5 h-5 text-gray-600"
                              />
                              <div className="flex-1">
                                <p className="font-semibold">
                                  {notification.type}
                                </p>
                                <p className="text-[12px] text-gray-500">
                                  {truncateMessage(notification.message, 60)}
                                </p>
                              </div>
                              <p className="text-xs text-gray-400">
                                {getRelativeTime(notification.date)}
                              </p>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  <Link
                    to="/notification"
                    className="block text-center text-primary11 mt-3"
                  >
                    View all notifications
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          {/* Header with logo and menu button */}
          <div className="w-full lg:hidden flex items-center justify-between bg-white p-4 border-b-2 border-primary6">
            <Link to="/admin/dashboard">
              <img
                src={Logo}
                alt="Logo"
                className={`transition-all duration-300 w-9`}
              />
            </Link>
            <button
              onClick={toggleResSidebar}
              className="flex items-center text-xl"
            >
              {isResSidebarOpen ? <MdOutlineCancel /> : <RiMenu3Line />}
            </button>
          </div>

          {/* Fullscreen overlay menu */}
          {isResSidebarOpen && (
            <div className="lg:hidden">
              <div
                className="fixed inset-0 backdrop-blur-sm z-40"
                onClick={toggleResSidebar}
              ></div>

              {/* Sidebar */}
              <div
                className={`fixed top-0 right-0 bg-primary1 border-l-4 border-sec10 rounded-l-3xl z-50 flex flex-col items-center justify-around space-y-8 transition-transform duration-300 font-body ${
                  isResSidebarOpen ? "translate-x-0" : "translate-x-full"
                }`}
                style={{ width: "200px", height: "100vh" }}
              >
                {/* Cancel button */}
                {isResSidebarOpen ? (
                  <>
                    <button
                      onClick={toggleResSidebar}
                      className="absolute top-4 right-4 text-3xl hover:text-primary11"
                    >
                      <MdCancel size={35} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={toggleResSidebar}
                      className="absolute top-4 right-4 text-3xl"
                    >
                      <RiMenu3Line size={25} />
                    </button>
                  </>
                )}
                {/* Navigation items */}
                <nav className="text-center">
                  <ul className="text-lg space-y-5">
                    <li>
                      <Link
                        to="/admin/dashboard"
                        onClick={toggleResSidebar}
                        className="hover:text-primary11 hover:text-xl"
                      >
                        Dashboard
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/admin/employee"
                        onClick={toggleResSidebar}
                        className="hover:text-primary11 hover:text-xl"
                      >
                        Employee
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/payroll"
                        onClick={toggleResSidebar}
                        className="hover:text-primary11 hover:text-xl"
                      >
                        Payroll
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/feedback"
                        onClick={toggleResSidebar}
                        className="hover:text-primary11 hover:text-xl"
                      >
                        Feedback
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/training"
                        onClick={toggleResSidebar}
                        className="hover:text-primary11 hover:text-xl"
                      >
                        Training
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/help-center"
                        onClick={toggleResSidebar}
                        className="hover:text-primary11 hover:text-xl"
                      >
                        Help center
                      </Link>
                    </li>

                    {/* <li>
                      <Link
                        to="/admin/notification"
                        onClick={toggleResSidebar}
                        className="hover:text-primary11 hover:text-xl"
                      >
                        Notifications
                      </Link>
                    </li> */}

                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-sec8 hover:text-xl"
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="col-span-1 overflow-y-auto overflow-x-hidden ">
          <div className="px-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
