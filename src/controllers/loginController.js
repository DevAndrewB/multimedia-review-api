const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// @desc Login user
// @route POST /api/v1/login
// @access Public
exports.loginUser = async (req, res) => {
  try {
    const { body } = req;

    const user = await User.findOne({ email: body.email });
    // eslint-disable-next-line operator-linebreak
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password'
      });
    }

    const userForToken = {
      username: user.email,
      id: user.id
    };

    const token = jwt.sign(userForToken, process.env.JWT_KEY);

    res.status(200).send({
      token,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });

    // return res.status(201).json({
    //     success: true,
    //     data: user
    // })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Server Error: ${error.message}`
    });
  }
};
