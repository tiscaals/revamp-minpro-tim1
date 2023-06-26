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

/*--------------------------- Schema Job Hire ------------------------------*/
/*-------- CRUD JOB POST --------*/
const findAllJob = () => {
  // console.log("apimethod", data);
  return axios.get('/job-hire');
};

const findJobById = (data: any) => {
  // console.log("apimethod", data);
  const id: number = +data;
  return axios.get(`/job-hire/jobdetail?id=${id}`);
};

const findJopho = () => {
  return axios.get('/job-hire/photo');
};

const findCurrentNumber = () => {
  return axios.get('/job-hire/currnum');
};

const createJobPost = (data: any) => {
  return axios.post('/job-hire', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const updateJobPost = (data: any) => {
  // console.log("API DATA UPDATE", ...data);
  return axios.patch(`/job-hire/${data.get('jopo_entity_id')}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const deleteJobPost = (data: any) => {
  console.log('apiMethod', data);
  const id: number = +data.id;
  return axios.patch(`/job-hire/delete/${id}`);
};

const searchPostJob = (data: any) => {
  return axios.get(`/job-hire/search`, {
    params: {
      key: data.search.keyword,
      loc: data.search.location,
      job: data.search.job,
      type: data.search.type,
      jobType: data.search.jobType.join(','),
      expe: data.search.expe.join(','),
      terupdate: data.search.terupdate,
      newest: data.search.newest,
    },
  });
};

const updateStatus = (data: any) => {
  // console.log('api update',data)
  return axios.patch(`/job-hire/status/edit`, data);
};

/*-------- TALENT APPLY ---------*/

const findProCandidate = () => {
  return axios.get('/job-hire/talent');
};

const updateCandidate = (data: any) => {
  console.log('API DATA UPDATE', data);
  return axios.patch(`/job-hire/talent/${data.id}`, data);
};

/*-------- CRUD CLIENT ---------*/

const findAllClient = () => {
  return axios.get('/job-hire/client');
};

const findOneClient = (data: any) => {
  const id: number = +data;
  return axios.get(`/job-hire/client/${id}`);
};

const createClient = (data: any) => {
  return axios.post('/job-hire/client', data);
};

const updateClient = (data: any) => {
  // console.log("API DATA UPDATE", data);
  return axios.patch(`/job-hire/client/${data.clit_id}`, data);
};

/*-------------- EMPLOYEE RANGE --------------*/
const findAllEmprange = () => {
  return axios.get(`/job-hire/emprange`);
};

/*--------------------------- Schema Master ------------------------------*/

const findEducation = () => {
  return axios.get('/master/edu');
};
const findWorktype = () => {
  return axios.get('/master/worktype');
};
const findJobrole = () => {
  return axios.get('/master/jobrole');
};
const findIndustry = () => {
  return axios.get('/master/industry');
};
const findCity = () => {
  return axios.get('/master/city');
};
const findRouteaction = () => {
  return axios.get('/master/roac');
};

//master-ade
const getallCat = () => {
  return axios.get('category');
};

const getallSkillType = () => {
  return axios
    .get('skill-type')
    .then((response: { data: any }) => {
      console.log(response.data); // Menampilkan data respons ke konsol
      return response.data; // Mengembalikan data respons
    })
    .catch((error: any) => {
      console.error(error); // Menampilkan error ke konsol
      throw error; // Melemparkan error untuk ditangani di tempat lain
    });
};
const updateCat = (data: any) => {
  // console.log('DATA API',data)
  return axios.patch(`category/${data.cate_id}`, data);
};

const createCat = (data: any) => {
  console.log(data);
  return axios.post(`category`, data);
};
const delCat = (id: any) => {
  console.log(id);
  return axios.delete(`category/${id}`);
};

const createSkillType = (data: any) => {
  console.log('api', data);
  return axios.post(`skill-type`, data);
};

const delSkillType = (data: any) => {
  console.log('del', data);
  return axios.delete(`skill-type/${data.skty_name}`);
};

const updateSkillType = (data: any) => {
  console.log(data);
  return axios.patch(`skill-type/${data.skty_name}`, data);
};

//skill _ tempelete
const getallSkillTemplete = () => {
  return axios.get('skill-template');
};
const delSKillTemplete = (id: any) => {
  return axios.delete(`skill-template/${id}`);
};

const createST = (data: any) => {
  return axios.post(`skill-template`, data);
};
const updateST = (data: any) => {
  console.log(data);
  return axios.patch(`skill-template/${data.skte_id}`, data);
};

//modules
const getModule = () => {
  return axios
    .get('modules')
    .then((response: { data: any }) => {
      console.log(response.data); // Menampilkan data respons ke konsol
      return response.data; // Mengembalikan data respons
    })
    .catch((error: any) => {
      console.error(error); // Menampilkan error ke konsol
      throw error; // Melemparkan error untuk ditangani di tempat lain
    });
};

const createModule = (data: any) => {
  return axios.post('modules', data);
};

const delModule = (data: any) => {
  console.log('del', data);
  return axios.delete(`modules/${data}`);
};

const updateModule = (data: any) => {
  console.log('up', data);
  return axios.patch(`modules/${data.old_module_name}`, data);
};

// address type
const getAddressType = () => {
  return axios
    .get('address-type')
    .then((response: { data: any }) => {
      console.log(response.data); // Menampilkan data respons ke konsol
      return response.data; // Mengembalikan data respons
    })
    .catch((error: any) => {
      console.error(error); // Menampilkan error ke konsol
      throw error; // Melemparkan error untuk ditangani di tempat lain
    });
};

const createAddType = (data: any) => {
  return axios.post('address-type', data);
};

const updateAddressType = (data: any) => {
  console.log('sampe sini ', data);
  return axios.patch(`address-type/${data.adty_id}`, data);
};

const deleteAddressType = (id: any) => {
  console.log('sampe sini ', id);
  return axios.delete(`address-type/${id}`);
};
//route-actions

const getRouteActions = () => {
  return axios.get('route-actions');
};

const delRouteActions = (id: number) => {
  return axios.delete(`route-actions/${id}`);
};

const createRA = (data: any) => {
  console.log('object', data);
  return axios.post('route-actions', data);
};

const updateRA = (data: any) => {
  return axios.patch(`route-actions/${data.roac_id}`, data);
};
const updateDisplayRA = (data: any) => {
  console.log(data);
  return axios.patch(`route-actions/display/${data.roac_id}`, data);
};

//country
const getCountry = () => {
  return axios.get('country');
};
const createCountry = (data: any) => {
  return axios.post('country', data);
};
const DelCountry = (data: any) => {
  return axios.delete(`country/${data}`);
};
const updateCountry = (data: any) => {
  console.log('object', data);
  return axios.patch(`country/${data.old_country_code}`, data);
};
// province

const getProv = () => {
  return axios.get('provinces');
};

const delProv = (data: any) => {
  return axios.delete(`provinces/${data}`);
};

const createProv = (data: any) => {
  return axios.post('provinces', data);
};

const updateProv = (data: any) => {
  console.log('update', data);
  return axios.patch(`provinces/${data.prov_id}`, data);
};
// city
const getCity = () => {
  return axios.get('city');
};

const delCity = (data: any) => {
  console.log(data);
  return axios.delete(`city/${data}`);
};

const createCity = (data: any) => {
  return axios.post('city', data);
};

const updateCity = (data: any) => {
  return axios.patch(`city/${data.city_id}`, data);
};

//===============SCHEMA PAYMENT=================
const findAllBank = () => {
  // console.log("object");
  return axios.get('/bank/all');
};

const createBank = (data: any) => {
  // console.log(data);
  return axios.post('/bank/Create', data);
};

const getByIdBank = (id: any) => {
  // console.log("objec1t");
  return axios.get(`/bank/${id}`);
};

const updateByIdBank = (data: any) => {
//   console.log(data);
  return axios.patch(`/bank/${data.id}`, data);
};

const deleteByIdBank = (id: any) => {
  return axios.delete(`/bank/${id}`, id);
};

//Fintech
const findAllFintech = () => {
  return axios.get('/fintech/all');
};

const createFintech = (data: any) => {
  return axios.post('/fintech/Create', data);
};

const updateByIdFintech = (data: any) => {
    // console.log(data);
    return axios.patch(`/fintech/${data.id}`, data);
  };

const deleteFintech = (id:any) => {
    return axios.delete(`/fintech/${id}`,id)
}

//Top Up
const TopupAccount= (data:any) =>{
  return axios.post("/transaction-payment/Topup", data)
}

//Transaction
const findAllTransaction= () =>{
  return axios.get("/transaction-payment/View")
}

//UsersAccount
const findAllUsersAccount = () => {
  return axios.get('/users-account/all');
};

const createAccount = (data:any) => {
  return axios.post('/users-account/create',data);
};


const updateUsersAccount = (data:any) => {
  // console.log(data);
  return axios.patch(`/users-account/Update/${data.usac_user_entity_id}`, data)
}

const deleteUsersAccount = (id:any) => {
  return axios.delete(`/users-account/${id}`,id)
}

export default {
  findAllJob,
  findJobById,
  findJopho,
  findCurrentNumber,
  createJobPost,
  updateJobPost,
  deleteJobPost,
  searchPostJob,
  updateStatus,

  findProCandidate,
  updateCandidate,

  findAllEmprange,

  findAllClient,
  findOneClient,
  createClient,
  updateClient,

  findEducation,
  findWorktype,
  findJobrole,
  findIndustry,
  findCity,
  findRouteaction,

  //master-ade
  updateProv,
  updateCity,
  createCity,
  createProv,
  delCity,
  delProv,
  getProv,
  getCity,
  delCat,
  getallCat,
  getallSkillType,
  getallSkillTemplete,
  updateCat,
  createCat,
  createSkillType,
  delSkillType,
  updateSkillType,
  getModule,
  getAddressType,
  getRouteActions,
  getCountry,
  createAddType,
  updateAddressType,
  deleteAddressType,
  DelCountry,
  createCountry,
  updateCountry,
  createModule,
  delModule,
  updateModule,
  delSKillTemplete,
  delRouteActions,
  createRA,
  updateRA,
  createST,
  updateST,
  updateDisplayRA,

  //payment
  findAllBank,
  createBank,
  deleteByIdBank,
  updateByIdBank,
  getByIdBank,
  findAllFintech,
  createFintech,
  deleteFintech,
  updateByIdFintech,
  TopupAccount,
  findAllUsersAccount,
  updateUsersAccount,
  deleteUsersAccount,
  findAllTransaction,
  createAccount
};
