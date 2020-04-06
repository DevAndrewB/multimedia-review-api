const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const { loginUser, getLoggedUser } = require('../controllers/loginController');

router.route('/').get(auth, getLoggedUser).post(loginUser);

module.exports = router;
