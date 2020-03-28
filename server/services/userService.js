const UserModel = require('../DAL/models/User');


const getAllUsers = async () => {
  return await UserModel.find();
}

const getUser = async (id) => {
  if (!id || typeof id !== 'string' || isNaN(id)) {
    throw new Error('Invalid Id');
  }
  return await UserModel.find({ id });
}

const createUser = async ({ id, firstName, lastName, age, gender, maritalStatus, kids }) => {
  // TODO: validate params

  return await UserModel(({ id, firstName, lastName, age, gender, maritalStatus, kids })).save();
}

const updateUser = async ({ id, firstName, lastName, age, gender, maritalStatus, kids }) => {
  // TODO: validate params

  return await UserModel.findOneAndUpdate({ id }, { id, firstName, lastName, age, gender, maritalStatus, kids });
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
}
