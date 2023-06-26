import axios from '../../config/endpoint';

const findAllCartItems = () => {
  return axios.get('/sales-skema/view-cart');
};

const deleteCartItems = (id: any) => {
  return axios.delete(`/sales-skema/hapus-cart/${id}`);
};

const getDiskon = () => {
  return axios.get('/sales-skema/view-diskon');
};

const insertOrder = (data: any) => {
  return axios.post('/sales-skema/insert-order-detail', data);
};

const insertOrderJson = (data: any) => {
  return axios.post('/sales-skema/insert-order-json', data);
};

const getPayment = () => {
  return axios.get('/sales-skema/view-payment');
};

export default {
  findAllCartItems,
  deleteCartItems,
  getDiskon,
  insertOrder,
  getPayment,
  insertOrderJson,
};
