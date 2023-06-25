import axios from '../config/endpoint';

const viewEmployee = () => {
  return axios.get('/placement');
};
const viewTalents = () => {
  return axios.get('/placement/talents');
};

const viewTalentsJob = () => {
  return axios.get('/placement/talentsJob');
};

const findEmployee = (data: any) => {
  return axios.get(`/placement/findemployee/${data}`)
}

const deptHistory = (data: any) => {
  return axios.get(`/placement/depthistory/${data}`)
}

const salaryHistory = (data: any) => {
  return axios.get(`/placement/salhistory/${data}`)
}

const searchUser = () => {
  return axios.get('/placement/search');
};
const searchClient = () => {
  return axios.get('/placement/client');
};

const department = () => {
  return axios.get('placement/dpm');
};
const masterJoRo = () => {
  return axios.get('placement/masterjoro');
};
const usersRoles = () => {
  return axios.get('placement/usersRoles');
};
const jobType = () => {
  return axios.get('placement/jobType');
};
const accountManager = () => {
  return axios.get('placement/AM');
};

const createDataEmployee = (data: any) => {
  return axios.post('/placement/create', data);
};
const createEmployeeTalents = (data: any) => {
  return axios.post('/placement/contract', data);
};
const updateEmployee = (data: any) => {
  return axios.patch('/placement/update', data);
};

export default {
  viewEmployee,
  viewTalents,
  viewTalentsJob,
  createDataEmployee,
  createEmployeeTalents,
  searchUser,
  searchClient,
  department,
  masterJoRo,
  usersRoles,
  jobType,
  accountManager,
  findEmployee,
  deptHistory,
  salaryHistory,
  updateEmployee
};
