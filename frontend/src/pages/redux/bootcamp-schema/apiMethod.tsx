import axios from '../../config/endpoint'

const findAllBatch = () => {
    return axios.get('/bootcamp')
}

const createBatch = (data:any) => {
    return axios.post('/bootcamp',data)
}

const findAllPrograms = () => {
    return axios.get('/bootcamp/programs')
}

const findAllTrainers = () => {
    return axios.get('/bootcamp/trainers')
}

const findAllTalents = () => {
    return axios.get('/bootcamp/talents')
}

const updateCloseBatch = (data:any) =>{
    return axios.patch(`/bootcamp/close/${data.batch_id}`,data)
}

export default {
    findAllBatch,
    createBatch,
    findAllPrograms,
    findAllTrainers,
    findAllTalents,
    updateCloseBatch
}