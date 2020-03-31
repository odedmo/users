import axios from 'axios';

let userCached = [];

const getAll = async (options = { useCache: false }) => {
  if (options.useCache && userCached.length > 0) {
    return userCached;
  }
  try {
    const {data} = await axios.get('http://localhost:8080/v1/users');
    userCached = data.data;
    return userCached;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const addNewUser = async (user) => {
  try {
    user.kids = [];
    const {data} = await axios.post('http://localhost:8080/v1/users', user);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default {
  getAll,
  addNewUser
};