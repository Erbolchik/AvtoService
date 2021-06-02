import * as axios from 'axios';

const instance = () =>
  axios.create({
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${localStorage.getItem('token')}`,
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImVtYWlsIjoiZGFzZHNhZGEiLCJuYW1laWQiOiIyIiwianRpIjoiNDgwMTNhMjctMTY2My00NTJkLWE2MTktM2FhY2U4NzlmOGQ0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoidXNlciIsImV4cCI6MTYyMjU5MTE4NiwiaXNzIjoiUm9hZHMiLCJhdWQiOiJSb2FkcyJ9.y4vkU1QzuMavxYq59Pvm5Fk-ResXQV6LZldvDrAwKeQ',
    },
  });

//#region Employees
export const getEmployees = () => {
  return instance().get('/api/Employees');
};

export const saveEmployees = (data) => {
  return instance().post('/api/Employees', data);
};

export const updateEmployee = (data) => {
  return instance().put('/api/Employees', data);
};

export const deleteEmployee = (id) => {
  return instance().delete(`/api/Employees/${id}`);
};
//#endregion

//#region Clients
export const getClients = () => {
  return instance().get('/api/Clients');
};

export const saveClient = (data) => {
  return instance().post('/api/Clients', data);
};

export const updateClient = (data) => {
  return instance().put('/api/Clients', data);
};

export const deleteClient = (id) => {
  return instance().delete(`/api/Clients/${id}`);
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

//#region Login

export const getWorkTypes = () => {
  return instance().get(`/api/TypeOfWork`);
};

export const saveWorkType = (data) => {
  return instance().post('/api/TypeOfWork', data);
};

export const updateWorkType = (data) => {
  return instance().put('/api/TypeOfWork', data);
};

export const deleteWorkType = (id) => {
  return instance().delete(`/api/TypeOfWork/${id}`);
};

//#endregion

//#region User

export const getMyProfile = () => {
  return instance().get(`/api/User/GetMyProfile`);
};

//#endregion
