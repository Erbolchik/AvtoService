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
//#endregion
