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

export default {
    findAllBatch,
    createBatch,
    findAllPrograms,
    findAllTrainers
}