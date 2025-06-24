import DashboardLayout from "../../layout/DashboardLayout";
import FeedbackFormGreetings from "./FeedbackFormGreetings";
import FeedbackMessageForm from "./FeedbackMessageForm";

const FeedbackMessagePage = () => {
  return (
    <DashboardLayout>
      <FeedbackFormGreetings />
      <FeedbackMessageForm />
    </DashboardLayout>
  );
};

export default FeedbackMessagePage;
