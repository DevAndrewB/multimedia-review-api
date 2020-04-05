const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const auth = require('../middleware/auth');
const User = require('../models/User');

// // @route    GET api/auth
// // @desc     Get logged user
// // @access   Private
// router.get('/', auth, async (req, res) => {
// 	try {
// 		const user = await User.findById(req.user.id).select('-password');
// 		res.json(user);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server Error');
// 	}
// });

// @desc Login user
// @route POST /api/v1/login
// @access Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    // eslint-disable-next-line operator-linebreak
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password'
      });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      }
    );

    // res.status(200).send({
    //   token,
    //   email: user.email,
    //   firstName: user.firstName,
    //   lastName: user.lastName
    // });

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
