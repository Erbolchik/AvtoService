import * as axios from 'axios';

const instance = () =>
  axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
  });

//#region Employees
export const getEmployees = () => {
  return instance().get('/api/Employees');
};

export const saveEmployees = (data) => {
  return instance().post('/api/Employees', data);
};
//#endregion

//#region Clients
export const getClients = () => {
  return instance().get('/api/Clients');
};

export const saveClient = (data) => {
  return instance().post('/api/Clients', data);
};
//#endregion

//#region Cars
export const getCars = () => {
  return instance().get('/api/Cars');
};

export const saveCar = (data) => {
  return instance().post('/api/Cars', data);
};
//#endregion

//#region Service spending
export const getServiceSpending = () => {
  return instance().get('/api/ServiceSpending');
};

export const saveServiceSpending = (data) => {
  return instance().post('/api/ServiceSpending', data);
};

export const updateServiceSpending = (data) => {
  return instance().put('/api/ServiceSpending', data);
};

export const deleteServiceSpending = (id) => {
  return instance().delete(`/api/ServiceSpending/${id}`);
};
//#endregion

//#region Login

export const login = (data) => {
  return instance().post(`/api/login`, data);
};

//#endregion
