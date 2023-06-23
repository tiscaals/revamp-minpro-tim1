import axios from '../config/endpoint';

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
  const result = await axios.post(
    `/program-entity/section/${sect_id}`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data' 
      }
    }
    );
  };
  
  const getCurrnumber = () => {
  return axios.get('/program-entity/currentNumber');
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
  return axios.get('/users-dto/test');
};

const viewSection = async () => {
  try {
    const response = await axios.get(`/program-entity/getSection`)
    return response
  } catch (error) {
    throw error
  }
};

const viewSectDetail = async ()=>{
  try {
    const response = await axios.get(`/program-entity/getSectionDetail`)
    return response
  } catch (error) {
    throw error
  }
}

// const updateCustomer=(data:any)=>{
//     return axios.patch(`/customer/${data.id}`, data.data)
// }

// const deleteUser=(id:any)=>{
//     return axios.delete(`/user/${id}`)
// }

export default {
  findAllCurr,
  createCurr,
  getCurrnumber,
  getCategory,
  getInstructor,
  createSection,
  createSectionDetail,
  viewSection,
  viewSectDetail
};
