const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const { addFriend } = require('../controllers/friendsController');

//router.route('/').get(auth, getUsers).post(addUser);

router.route('/:id').put(auth, addFriend);

module.exports = router;
