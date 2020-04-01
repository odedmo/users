const express = require('express');
const userService = require('../../services/userService');
const ResponseHelper = require('../../services/responseHelper');
const router = express.Router();

// get all users
router.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    if (!users || users.length === 0) {
      return res.status(400).json(ResponseHelper.createAPIError('No users'));
    }
    res.json(ResponseHelper.createAPIResponse(users));
  } catch (error) {
    res.status(500).json(ResponseHelper.createAPIError(error));
  }
});

// get single user
// router.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await userService.getUser(id);
//     if (!user) {
//       return res.status(400).json(ResponseHelper.createAPIError('User not found'));
//     }
//     res.json(ResponseHelper.createAPIResponse(user));
//   } catch (error) {
//     res.status(500).json(ResponseHelper.createAPIError(error));
//   }
// });

// save new user
router.post('/', async (req, res) => {
  const { id, firstName, lastName, age, gender, maritalStatus, kids } = req.body;
  try {
    const user = await userService.createUser({ id, firstName, lastName, age, gender, maritalStatus, kids });
    res.status(201).json(ResponseHelper.createAPIResponse(user));
  } catch (error) {
    res.status(500).json(ResponseHelper.createAPIError(error));
  }
});

// update user
router.put('/', async (req, res) => {
  const { _id, id, firstName, lastName, age, gender, maritalStatus, kids } = req.body;
  try {
    await userService.updateUser({ _id, id, firstName, lastName, age, gender, maritalStatus, kids });
    res.status(204).end();
  } catch (error) {
    res.status(500).json(ResponseHelper.createAPIError(error));
  }
});


module.exports = (app) => {
  app.use('/v1/users', router);
}
