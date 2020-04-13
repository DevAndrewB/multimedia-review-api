const bcrypt = require('bcrypt');
const User = require('../models/User');

// @desc Get all User
// @route GET /api/v1/users
// @access Public
exports.getUsers = async (req, res) => {
  // res.send('Get users');
  try {
    const users = await User.find();

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc Get a User
// @route GET /api/v1/users
// @access Public
exports.getUser = async (req, res) => {
  // res.send('Get users');
  try {
    const user = await User.findOne({ userName: req.params.id }).populate(
      'friends'
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'No user found'
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc Add User
// @route POST /api/v1/users
// @access Public
exports.addUser = async (req, res) => {
  try {
    const { body } = req;

    if (!body.password || body.password.length < 8) {
      throw new Error('PasswordLength');
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      firstName: body.firstName,
      lastName: body.lastName,
      userName: body.userName,
      email: body.email,
      passwordHash,
      friends: []
    });

    await user.save();

    return res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const type = Object.values(error.errors).map((val) => val.path);
      let errormsg = '';
      if (type[0] === 'userName') {
        errormsg = 'Username cannot be empty or already exists.';
      } else if (type[0] === 'email') {
        errormsg = 'Email cannot be empty or already exists.';
      } else {
        errormsg = 'Please complete all fields.';
      }
      return res.status(400).json({
        success: false,
        error: errormsg
      });
    }
    if (error.message === 'PasswordLength') {
      return res.status(400).json({
        success: false,
        error: 'Password must be 8 characters.'
      });
    }
    return res.status(500).json({
      success: false,
      error: `Server Error: ${error.message}`
    });
  }
};

// @route    PUT api/users/:id
// @desc     Update User
// @access   Private
exports.updateUser = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty())
  //   return res.status(400).json({ errors: errors.array() });

  const { firstName, lastName, userName } = req.body;

  // Build user object
  const userFields = {};
  if (firstName) userFields.firstName = firstName;
  if (lastName) userFields.lastName = lastName;
  if (userName) userFields.userName = userName;

  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Make sure user owns contact
    if (user.id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err.codeName);
    if (err.codeName === 'DuplicateKey') {
      return res.status(400).json({
        success: false,
        error: 'Duplicate Username.'
      });
    }
    return res.status(500).send('Server error');
  }
};

// @desc Delete users
// @route DELETE /api/v1/users/:id
// @access Public
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'No user found'
      });
    }

    // Make sure user owns contact
    if (user.id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await user.remove();
    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc Add User
// @route POST /api/v1/users
// @access Public
exports.addUser = async (req, res) => {
  try {
    const { body } = req;

    if (!body.password || body.password.length < 8) {
      throw new Error('PasswordLength');
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      firstName: body.firstName,
      lastName: body.lastName,
      userName: body.userName,
      email: body.email,
      passwordHash,
      friends: []
    });

    await user.save();

    return res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const type = Object.values(error.errors).map((val) => val.path);
      let errormsg = '';
      if (type[0] === 'userName') {
        errormsg = 'Username cannot be empty or already exists.';
      } else if (type[0] === 'email') {
        errormsg = 'Email cannot be empty or already exists.';
      } else {
        errormsg = 'Please complete all fields.';
      }
      return res.status(400).json({
        success: false,
        error: errormsg
      });
    }
    if (error.message === 'PasswordLength') {
      return res.status(400).json({
        success: false,
        error: 'Password must be 8 characters.'
      });
    }
    return res.status(500).json({
      success: false,
      error: `Server Error: ${error.message}`
    });
  }
};
