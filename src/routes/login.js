const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { loginUser } = require('../controllers/loginController');

// @route    GET api/auth
// @desc     Get logged user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.route('/').post(loginUser);

module.exports = router;
