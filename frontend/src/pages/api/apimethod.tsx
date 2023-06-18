import axios from "../config/endpoint";

const findAllCartItems=()=>{
    return axios.get("/sales/view-cart")
}

const deleteCartItems=(id:any)=>{
    return axios.delete(`/sales/hapus-cart/${id}`)
}

export default {
    findAllCartItems,
    deleteCartItems
}

// axios.interceptors.request.use(
//     (config) => {
//       // Retrieve the authorization token from storage
//       const token = localStorage.getItem("AuthToken");
  
//       // If the token exists, add it to the request headers
//       if (token && token!=undefined && token!='false') {
//         config.headers["Authorization"] = token;
//       }
  
//       return config;
//     },
//     (error) => {
//       // Handle request error
//       return Promise.reject(error);
//     }
// );



// const createUser=(data:any)=>{
//     return axios.post("/user", data)
// }

// const updateCustomer=(data:any)=>{
//     return axios.patch(`/customer/${data.id}`, data.data)
// }

// const deleteUser=(id:any)=>{
//     return axios.delete(`/user/${id}`)
// }

// const updatePassword=(data:any)=>{
//     console.log(data);
//     return axios.patch(`/user/password/${data.id}`, data.data)
// }

// //PRODUCT
// const findAllProduct=()=>{
//     return axios.get("/product")
// }

// const findProductById=(id:any)=>{
//     return axios.get(`/product/${id}`)
// }

// const createProduct=(data:any)=>{
//     return axios.post("/product/create", data, {
//         headers:{
//             "Content-Type": "multipart/form-data"
//         }
//     })
// }

// const updateProduct=(data:any)=>{
//     console.log("API DATA",data);
//     return axios.patch(`/product/${data.id}`, data.data, {
//         headers:{
//             "Content-Type": "multipart/form-data"
//         }
//     })
// }

// const deleteProduct=(id:any)=>{
//     return axios.delete(`/product/${id}`)
// }

// const findAllCategory=()=>{
//     return axios.get("/product/category")
// }

// //LOGIN
// const login=(data:any)=>{
//     return axios.post("/login", data)
// }

// export default{
//     //USER
//     findAllUser,
//     createUser,
//     updateCustomer,
//     deleteUser,
//     updatePassword,
//     //PRODUCT
//     findAllProduct,
//     findProductById,
//     createProduct,
//     updateProduct,
//     deleteProduct,
//     //CATEGORY
//     findAllCategory,
//     //LOGIN
//     login
// }