import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

export const API_URL = `${BACKEND_URL}/api/users/`;

//Registe user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData, {
    withCredentials: true, //send together with token example
  });
  return response.data;
};

//login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  return response.data;
};

//logout user
const logout = async () => {
  const response = await axios.get(API_URL + 'logout');
  return response.data.message;
};

// user loginStatus
const loginStatus = async () => {
  const response = await axios.get(API_URL + 'loggedin');
  return response.data;
};

// getuser
const getUser = async () => {
  const response = await axios.get(API_URL + 'user');
  return response.data;
};

// update profile
// update profile
const updateUser = async (userData, userId) => {
  const response = await axios.patch(`${API_URL}update/${userId}`, userData);
  return response.data;
};

// update profile
const updatePhoto = async (userData) => {
  const response = await axios.patch(API_URL + 'updatephoto', userData);
  return response.data;
};

// forget password
export const forgetPassword = async (email) => {
    const response = await axios.post(`${API_URL}forgetPassword`, { email });
    return response.data.message;
  };

  // checkEmail
export const emailExistsInMongoDB = async (email) => {
    const response = await axios.post(`${API_URL}checkEmail`, { email });
    return response.data.exists; // Assuming the backend returns { exists: true/false }
  };
  

const authService = {
  register,
  login,
  logout,
  loginStatus,
  getUser,
  updateUser,
  updatePhoto,
  forgetPassword,
  emailExistsInMongoDB
};
export default authService;
