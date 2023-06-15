import axios from "../config/endpoint";

/*--------------------------- Schema Job Hire ------------------------------*/
/*-------- CRUD JOB POST --------*/
const findAllJob =()=>{
    return axios.get("/")
}

const findCurrentNumber =()=>{
    return axios.get("/job-hire/currnum")
}

const createJobPost =(data:any)=>{
    return axios.post("/",data)
}

const updateJobPost =(data:any)=>{
    return axios.patch(`/`,data)
}

const deleteJobPost =(data:any)=>{
    return axios.delete(`/`,data)
}

/*-------- CRUD CLIENT ---------*/

const findAllClient =()=>{
    return axios.get("/job-hire/clientall")
}

const createClient =(data:any)=>{
    return axios.post("/",data)
}

const updateClient =(data:any)=>{
    return axios.patch(`/`,data)
}

const deleteClient =(data:any)=>{
    return axios.delete(`/`,data)
    
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

export default {
    findAllJob,
    findCurrentNumber,
    createJobPost,
    updateJobPost,
    deleteJobPost,

    findAllEmprange,

    findAllClient,
    createClient,
    updateClient,
    deleteClient,

    findEducation,
    findWorktype,
    findJobrole,
    findIndustry,
    findCity,
}