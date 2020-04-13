const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const { addFriend, removeFriend } = require('../controllers/friendsController');

//router.route('/').get(auth, getUsers).post(addUser);

router.route('/:id').put(auth, addFriend);

router.route('/remove/:id').put(auth, removeFriend);

module.exports = router;
