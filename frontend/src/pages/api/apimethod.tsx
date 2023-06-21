import axios from "../config/endpoint";

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
    const id:number = +data;
    return axios.patch(`/job-hire/delete/${id}`)
}

/*-------- TALENT APPLY ---------*/

const findProCandidate =()=>{
    return axios.get("/job-hire/talent")
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

    findProCandidate,

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