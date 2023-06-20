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
    `/profile/update-profile/${data.get('user_entity_id')}`,
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
  return axios.post('/email/add-email', data);
};

const updateEmail = (data: any) => {
  return axios.patch(`/email/update-email/${data.pmail_id}`, data);
};

const removeEmail = (id: any) => {
  return axios.delete(`/email/remove-email/${id}`, id);
};

const addPhoneNumber = (data: any) => {
  return axios.post('/phone/add-phone', data);
};

const updatePhoneNumber = (phone_number: any) => {
  return axios.patch(
    `/phone/update-phone/${phone_number.uspo_number}`,
    phone_number
  );
};

const removePhoneNumber = (phone_number: any) => {
  return axios.delete(`/phone/remove-phone/${phone_number}`, phone_number);
};

//Profile Address
const getCity = () => {
  return axios.get('/address/get-city');
};

const getAddressType = () => {
  return axios.get('/address/address-type');
};

const addAddress = (data: any) => {
  return axios.post('/address/add-address', data);
};

const updateAddress = (data: any) => {
  return axios.patch(`address/update-address/${data.address_id}`, data);
};

const removeAddress = (id: any) => {
  return axios.delete(`/address/remove-address/${id}`, id);
};

//Profile Education
const addEducation = (data: any) => {
  return axios.post(`/education/add-education`, data);
};

const updateEducation = (data: any) => {
  return axios.patch(`/education/update-education/${data.usdu_id}`, data);
};

const removeEducation = (id: any) => {
  return axios.delete(`/education/remove-education/${id}`, id);
};

//Profile Experiences
const addExperiences = (data: any) => {
  return axios.post(`/experiences/add-experiences`, data);
};

const updateExperiences = (data: any) => {
  return axios.patch(`/experiences/edit-experiences/${data.usex_id}`, data);
};

const removeExperiences = (id: any) => {
  return axios.delete(`/experiences/remove-experiences/${id}`, id);
};

//Profile Skill
const getSkill = () => {
  return axios.get(`/skills/get-skills`);
};

const addSkill = (data: any) => {
  return axios.post(`/skills/add-skills`, data);
};

const removeSkill = (id: any) => {
  return axios.delete(`skills/remove-skills/${id}`, id);
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
  addEducation,
  updateEducation,
  removeEducation,
  addExperiences,
  updateExperiences,
  removeExperiences,
  getSkill,
  addSkill,
  removeSkill,
};
