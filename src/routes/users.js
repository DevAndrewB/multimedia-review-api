const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.route('/').get(auth, getUsers).post(addUser);

router
  .route('/:id')
  .get(auth, getUser)
  .put(auth, updateUser)
  .delete(auth, deleteUser);

module.exports = router;
