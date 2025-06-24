import AxiosInterceptor from "../component/AxiosInterceptor";

const PLAIN_API_URL = `${import.meta.env.VITE_API_URL}`;

const generateCode = async ({ accessToken, refreshToken, userEmail }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.post(`${PLAIN_API_URL}/code/generate`, {
      email: userEmail,
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};
const getTotalEmployee = async ({ accessToken, refreshToken, department }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/total-employees/${department}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const getEmployees = async ({ accessToken, refreshToken, department }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/user/department?department=${department}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const getEmployeeBioData = async ({ accessToken, refreshToken, id }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/employee-biodata/${id}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};
const getTotalDepartment = async ({
  accessToken,
  refreshToken,
  email,
  department,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/total-team/${department}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};
const getTotalOrganization = async ({
  accessToken,
  refreshToken,
  userEmail,
  department,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/organizations/${department}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};
const getSupportTicket = async ({ accessToken, refreshToken }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(`${PLAIN_API_URL}/getSupportTicket`);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve all users"
    );
  }
};

const onboardEmployee = async ({ accessToken, refreshToken, formData }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.post(`${PLAIN_API_URL}/signup`, formData);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to onboard Employee"
    );
  }
};

const getTotalProject = async ({ accessToken, refreshToken, department }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/tasks/hr?department=${department}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to get all project"
    );
  }
};

const getSuggestionByDept = async ({
  accessToken,
  refreshToken,
  department,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/department-feedback?department=${department}`
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unable to check-In");
  }
};

const getAttendance = async ({ accessToken, refreshToken, filter, userId }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/attendance/${userId}?type=${filter}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to get all project"
    );
  }
};

const getTaskDetails = async ({ accessToken, refreshToken, taskId }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/tasks/view/${taskId}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to get Task Details"
    );
  }
};

const updateTaskApprovalStatus = async ({
  accessToken,
  refreshToken,
  taskId,
  status,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.patch(
      `${PLAIN_API_URL}/task/${taskId}/${status}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to update task status"
    );
  }
};

const getHelpData = async ({ accessToken, refreshToken, department }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/getSupportTicket/${department}`
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unable to check-In");
  }
};

const getLeaves = async ({ accessToken, refreshToken, department }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/accepted-leaves/${department}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve leaves"
    );
  }
};

const getProjects = async ({ accessToken, refreshToken, userId }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/user-tasks/${userId}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve Projects"
    );
  }
};

const getRequest = async ({ accessToken, refreshToken, department }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/leaves/${department}`
    );

    return response?.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve Projects"
    );
  }
};

const getRequestSingle = async ({ accessToken, refreshToken, requestId }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(`${PLAIN_API_URL}/leave/${requestId}`);

    return response?.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve Single Request"
    );
  }
};

const submitHelpCenterMessage = async ({
  accessToken,
  refreshToken,
  id,
  responseMessage,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.put(
      `${PLAIN_API_URL}/replyToTicket/${id}`,
      {
        response: responseMessage,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unable to check-In");
  }
};

const getSingleHelpCenterMessage = async ({
  accessToken,
  refreshToken,
  id,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(`${PLAIN_API_URL}/getTickets/${id}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unable to check-In");
  }
};

const rejectRequest = async ({ accessToken, refreshToken, requestId }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.patch(
      `${PLAIN_API_URL}/leave/${requestId}?action=rejected`
    );

    return response?.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to reject Request"
    );
  }
};

const approveRequest = async ({ accessToken, refreshToken, requestId }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.patch(
      `${PLAIN_API_URL}/leave/${requestId}?action=approved`
    );

    return response?.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to retrieve Single Request"
    );
  }
};

export default {
  generateCode,
  getTotalEmployee,
  getTotalDepartment,
  getTotalOrganization,
  getSupportTicket,
  getEmployees,
  getEmployeeBioData,
  onboardEmployee,
  getTotalProject,
  getSuggestionByDept,
  getAttendance,
  getTaskDetails,
  updateTaskApprovalStatus,
  getHelpData,
  getLeaves,
  submitHelpCenterMessage,
  getProjects,
  getRequest,
  getRequestSingle,
  rejectRequest,
  approveRequest,
  getSingleHelpCenterMessage,
};
