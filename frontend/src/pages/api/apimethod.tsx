import axios from '../config/endpoint';
import Cookies from 'js-cookie';

axios.interceptors.request.use((config: any) => {
  try {
    const token = Cookies.get('access_token');
    config.headers['Authorization'] = token;
    return config;
  } catch (error: any) {
    console.log(error.message);
  }
});

axios.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async error => {
    if (error.response.status === 401) {
      Cookies.remove('access_token');
      localStorage.removeItem('userData');
    }
    return Promise.reject(error);
  }
);
//Login
const authLogin = (data: any) => {
  return axios.post('/auth/signin', data);
};

//Signup
const authSignUp = (data: any) => {
  return axios.post('/auth/signup', data);
};

//Users
const getAllUsers = () => {
  return axios.get('/users');
};

const getUsersById = (id: any) => {
  return axios.get(`/users/${id}`);
};

//Settings
const updateProfile = (data: any) => {
  return axios.patch(
    `/users/update-profile/${data.get('user_entity_id')}`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

const updatePassword = (data: any) => {
  return axios.patch(`/users/update-password/${data.user_entity_id}`, data);
};

export default {
  authLogin,
  authSignUp,
  getAllUsers,
  getUsersById,
  updateProfile,
  updatePassword,
};
