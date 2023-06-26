import axios from '../../config/endpoint'

const findAllCartItems=()=>{
    return axios.get("/sales-skema/view-cart")
}

const deleteCartItems=(id:any)=>{
    return axios.delete(`/sales/hapus-cart/${id}`)
}

const getDiskon=()=>{
    return axios.get('/sales/view-diskon')
}

const insertOrder=(data:any)=>{
    return axios.post('/sales/insert-order-detail',data)
}

const insertOrderJson=(data:any)=>{
    return axios.post('/sales/insert-order-json',data)
}

const getPayment=()=>{
    return axios.get('/sales/view-payment')
}

export default {
    findAllCartItems,
    deleteCartItems,
    getDiskon,
    insertOrder,
    getPayment,
    insertOrderJson
}