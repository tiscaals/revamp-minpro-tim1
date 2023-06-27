import axios from '../../config/endpoint';

const findAllBatch = () => {
  return axios.get('/bootcamp');
};

const createBatch = (data: any) => {
  return axios.post('/bootcamp', data);
};

const editBatch = (data: any) => {
  return axios.patch(`/bootcamp/${data.batch.batch_id}`, data);
};

const findAllPrograms = () => {
  return axios.get('/bootcamp/programs');
};

const findAllTrainers = () => {
  return axios.get('/bootcamp/trainers');
};

const findAllRecStudents = (id: any) => {
  return axios.get(`/bootcamp/recstudents/${id}`);
};

const deleteBatch = (id: any) => {
  return axios.delete(`/bootcamp/${id}`);
};

const findOne = (id: number) => {
  return axios.get(`/bootcamp/one/${id}`);
};

const findroutes = () => {
  return axios.get('/bootcamp/routeactions');
};

const findAllCandidates = () => {
  return axios.get('/bootcamp/program-apply');
};

const updateParog = (data: any) => {
  return axios.patch(`/bootcamp/program-apply-progress/${data.id}`, data);
};

const updatePrap = (data: any) => {
  return axios.patch(
    `/bootcamp/program-apply/${data.userid}/${data.progid}`,
    data
  );
};

const findAllTraineesBatch = (id: number) => {
  return axios.get(`/bootcamp/batchtrainees/${id}`);
};

const findAllPrapUser = (id: number) => {
  return axios.get(`/bootcamp/prapuser/${id}`);
};

const findAllTalents = () => {
  return axios.get('/bootcamp/talents');
};

const updateChangeStatusBatch = (data: any) => {
  return axios.post(`/bootcamp/change-status-batch`, data);
};

const createEvals = (data: any) => {
  return axios.post('/bootcamp/evaluation', data);
};

const changeStatusTrainee = (data:any) => {
  return axios.patch(`/bootcamp/setresign/${data.batr_id}`,data)
}
export default {
  findAllBatch,
  createBatch,
  findAllPrograms,
  findAllTrainers,
  findAllRecStudents,
  deleteBatch,
  editBatch,
  findOne,
  findroutes,
  findAllCandidates,
  updateParog,
  updatePrap,
  findAllTraineesBatch,
  findAllTalents,
  createEvals,
  updateChangeStatusBatch,
  changeStatusTrainee,
  findAllPrapUser
};
