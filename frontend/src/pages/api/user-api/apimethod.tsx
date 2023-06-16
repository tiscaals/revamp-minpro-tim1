import axios from '../../config/endpoint';
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

const addEmail = (data: any) => {
  return axios.post('/users/add-email', data);
};

const updateEmail = (data: any) => {
  return axios.patch(`/users/update-email/${data.pmail_id}`, data);
};

const removeEmail = (id: any) => {
  return axios.delete(`/users/remove-email/${id}`, id);
};

const addPhoneNumber = (data: any) => {
  return axios.post('/users/add-phone', data);
};

const updatePhoneNumber = (phone_number: any) => {
  return axios.patch(
    `/users/update-phone/${phone_number.uspo_number}`,
    phone_number
  );
};

const removePhoneNumber = (phone_number: any) => {
  return axios.delete(`/users/remove-phone/${phone_number}`, phone_number);
};

//Profile Address
const getCity = () => {
  return axios.get('/address/get-city');
};

const getAddressType = () => {
  return axios.get('/address/address-type');
};

const addAddress = (data: any) => {
  return axios.post('/users/add-address', data);
};

const updateAddress = (data: any) => {
  return axios.patch(`users/update-address/${data.address_id}`, data);
};

const removeAddress = (id: any) => {
  return axios.delete(`/users/remove-address/${id}`, id);
};

export default {
  authLogin,
  authSignUp,
  getAllUsers,
  getUsersById,
  updateProfile,
  updatePassword,
  addEmail,
  updateEmail,
  removeEmail,
  addPhoneNumber,
  updatePhoneNumber,
  removePhoneNumber,
  getCity,
  getAddressType,
  addAddress,
  updateAddress,
  removeAddress,
};
