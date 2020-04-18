const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const {
  addFriend,
  removeFriend,
  sendFriendRequest,
  removePendingFriendRequest
} = require('../controllers/friendsController');

//router.route('/').get(auth, getUsers).post(addUser);

router.route('/add/:id').put(auth, addFriend);
router.route('/sendrequest/:id').put(auth, sendFriendRequest);
router.route('/removepending/:id').put(auth, removePendingFriendRequest);
router.route('/remove/:id').put(auth, removeFriend);

module.exports = router;
