const User = require('../models/User');

// @route    PUT api/v1/friends/sendrequest/:id
// @desc     Send Friend Request
// @access   Private
exports.sendFriendRequest = async (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty())
  //     return res.status(400).json({ errors: errors.array() });

  try {
    let newFriend = await User.findById(req.params.id);
    let currentUser = req.user.id;
    if (!newFriend) return res.status(404).json({ msg: 'User not found' });

    newFriend = await User.findByIdAndUpdate(
      newFriend,
      { $push: { friendRequests: req.user.id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      data: currentUser
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};

// @route    PUT api/v1/friends/:id
// @desc     Remove Pending Friend Request
// @access   Private
exports.removePendingFriendRequest = async (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty())
  //     return res.status(400).json({ errors: errors.array() });

  try {
    let newFriend = await User.findById(req.params.id);
    let currentUser = req.user.id;
    if (!newFriend) return res.status(404).json({ msg: 'User not found' });

    // Make sure user owns contact
    // if (user.id.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'Not authorized' });
    // }

    currentUser = await User.findByIdAndUpdate(
      currentUser,
      {
        $pull: { friendRequests: req.params.id }
      },

      { new: true }
    );

    // newFriend = await User.findByIdAndUpdate(
    //   newFriend,
    //   { $push: { friends: req.user.id } },
    //   { new: true }
    // );

    return res.status(201).json({
      success: true,
      data: currentUser
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};

// @route    PUT api/v1/friends/:id
// @desc     Add Friend
// @access   Private
exports.addFriend = async (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty())
  //     return res.status(400).json({ errors: errors.array() });

  try {
    let newFriend = await User.findById(req.params.id);
    let currentUser = req.user.id;
    if (!newFriend) return res.status(404).json({ msg: 'User not found' });

    // Make sure user owns contact
    // if (user.id.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'Not authorized' });
    // }

    currentUser = await User.findByIdAndUpdate(
      currentUser,
      {
        $push: { friends: req.params.id },
        $pull: { friendRequests: req.params.id }
      },

      { new: true }
    );

    newFriend = await User.findByIdAndUpdate(
      newFriend,
      { $push: { friends: req.user.id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      data: currentUser
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};

// @route    PUT api/v1/friends/remove/:id
// @desc     Remove Friend
// @access   Private
exports.removeFriend = async (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty())
  //     return res.status(400).json({ errors: errors.array() });

  try {
    let newFriend = await User.findById(req.params.id);
    let currentUser = req.user.id;
    if (!newFriend) return res.status(404).json({ msg: 'User not found' });

    // Make sure user owns contact
    // if (user.id.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'Not authorized' });
    // }

    currentUser = await User.findByIdAndUpdate(
      currentUser,
      { $pullAll: { friends: [req.params.id] } },
      { new: true }
    );

    newFriend = await User.findByIdAndUpdate(
      newFriend,
      { $pullAll: { friends: [req.user.id] } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      data: currentUser
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};
