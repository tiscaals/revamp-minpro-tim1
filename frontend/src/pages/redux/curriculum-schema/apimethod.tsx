import axios from '../../config/endpoint';

const findAllCurr = async () => {
  try {
    // console.log("saga");
    const response = await axios.get('/program-entity/cek');
    return response;
  } catch (error) {
    throw error;
  }
};

const createCurr = async (data: any) => {
  try {
    // console.log(data.get('image'));
    const response: any = await axios.post('/program-entity/create', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const createSection = async (data: any) => {
  try {
    // console.log(data);
    const result = await axios.post('/program-entity/sections', data);
    // const { sect_id } = result.data;

    // return { sect_id };
    return result;
  } catch (error) {
    throw error;
  }
};

const createSectionDetail = async (sect_id: any, data: any) => {
  const result = await axios.post(`/program-entity/section/${sect_id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getCurrnumber = () => {
  return axios.get('/program-entity/currentNumber');
};

const currById = (id: any) => {
  return axios.get(`/program-entity/getOne/${id}`);
};

const getCategory = async () => {
  try {
    const response = await axios.get('/master/all');
    return response;
  } catch (error) {
    throw error;
  }
};
const getInstructor = () => {
  return axios.get('/hr-dto/cek');
};

const sectionMerge = async () => {
  try {
    const response = await axios.get(`/program-entity/getMerged`);
    // console.log("abg",response.data.mergedData[0]);
    return response;
  } catch (error) {
    throw error;
  }
};

const sectionMergeUp = async (id: any) => {
  try {
    console.log("id",id);
    const response = await axios.get(`/program-entity/getMergedUp/${id}`);
    console.log('abg', response.data.mergedData[0]);
    return response;
  } catch (error) {
    throw error;
  }
};

const getAllTable = async (id: any) => {
  console.log(id);
  return await axios.get(`/program-entity/getAll/${id}`);
};

const updateProgramEntity = async (id: any, data: any) => {
  return await axios.put(`/program-entity/updateProgram/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getUserHr = async()=>{
  return await axios.get(`/program-entity/getUserHr`) 
}

export default {
  findAllCurr,
  createCurr,
  getCurrnumber,
  getCategory,
  getInstructor,
  createSection,
  createSectionDetail,
  currById,
  sectionMerge,
  getAllTable,
  updateProgramEntity,
  sectionMergeUp,
  getUserHr
};
