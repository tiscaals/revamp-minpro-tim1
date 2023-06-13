import axios from '../../config/endpoint'

const findAllBatch = () => {
    return axios.get('http://localhost:8000/bootcamp')
}

export default {
    findAllBatch
}