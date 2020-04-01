import axios from 'axios';

let userCached = [];
const baseUrl = 'http://localhost:8080/v1/users';

const getAll = async (options = { useCache: false }) => {
  if (options.useCache && userCached.length > 0) {
    return userCached;
  }
  try {
    const {data} = await axios.get(`${baseUrl}`);
    userCached = data.data;
    return userCached;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const addNewUser = async (user) => {
  return await axios.post(`${baseUrl}`, user);
}

const updateUser = async (user) => {
  return await axios.put(`${baseUrl}`, user);
}

export default {
  getAll,
  addNewUser,
  updateUser
};