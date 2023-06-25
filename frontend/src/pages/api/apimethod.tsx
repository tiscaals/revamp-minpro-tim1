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
const findAllJob =()=>{
    // console.log("apimethod", data);
    return axios.get("/job-hire")
}

const findJobById =(data:any)=>{
    // console.log("apimethod", data);
    const id:number = +data;
    return axios.get(`/job-hire/jobdetail?id=${id}`)
}

const findJopho =()=>{
    return axios.get("/job-hire/photo")
}

const findCurrentNumber =()=>{
    return axios.get("/job-hire/currnum")
}

const createJobPost =(data:any)=>{
    return axios.post("/job-hire",data, {headers:{"Content-Type":"multipart/form-data"}})
}

const updateJobPost =(data:any)=>{
    // console.log("API DATA UPDATE", ...data);
    return axios.patch(`/job-hire/${data.get("jopo_entity_id")}`,data,{headers:{"Content-Type":"multipart/form-data"}})
}

const deleteJobPost =(data:any)=>{
    console.log("apiMethod",data);
    const id:number = +data.id;
    return axios.patch(`/job-hire/delete/${id}`)
}

const searchPostJob =(data:any)=>{
    return axios.get(`/job-hire/search`, {
        params: {
        key: data.search.keyword,
        loc: data.search.location,
        job : data.search.job,
        type: data.search.type,
        jobType: data.search.jobType.join(","),
        expe : data.search.expe.join(","),
        terupdate : data.search.terupdate,
        newest : data.search.newest
        },
    })
}

const updateStatus =(data:any)=>{  
    // console.log('api update',data)
    return axios.patch(`/job-hire/status/edit`,data)
}

/*-------- TALENT APPLY ---------*/

const findProCandidate =()=>{
    return axios.get("/job-hire/talent")
}

const updateCandidate =(data:any)=>{
    console.log("API DATA UPDATE", data);
    return axios.patch(`/job-hire/talent/${data.id}`,data)
}

/*-------- CRUD CLIENT ---------*/

const findAllClient =()=>{
    return axios.get("/job-hire/client")
}

const findOneClient =(data:any)=>{
    const id:number = +data;
    return axios.get(`/job-hire/client/${id}`)
}

const createClient =(data:any)=>{
    return axios.post("/job-hire/client",data)
}

const updateClient =(data:any)=>{
    // console.log("API DATA UPDATE", data);
    return axios.patch(`/job-hire/client/${data.clit_id}`,data)
}

/*-------------- EMPLOYEE RANGE --------------*/
const findAllEmprange =()=>{
    return axios.get(`/job-hire/emprange`)
}

/*--------------------------- Schema Master ------------------------------*/

const findEducation =()=>{
    return axios.get('/master/edu')
}
const findWorktype =()=>{
    return axios.get('/master/worktype')
}
const findJobrole =()=>{
    return axios.get('/master/jobrole')
}
const findIndustry =()=>{
    return axios.get('/master/industry')
}
const findCity =()=>{
    return axios.get('/master/city')
}
const findRouteaction =()=>{
    return axios.get('/master/roac')
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
    findRouteaction
}