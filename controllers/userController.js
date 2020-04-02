const User = require('../models/User')
// @desc Get all users
// @route GET /api/v1/users
// @access Public
exports.getUsers = async (req, res, next) => {
    //res.send('Get users');
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch(err){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc Add users
// @route POST /api/v1/users
// @access Public
exports.addUser = async (req, res, next) => {
    try {
        const {firstName, lastName, email, password} = req.body;

        const user = await User.create(req.body);
    
        return res.status(201).json({
            success: true,
            data: user
        })
    } catch (error) {
        if(error.name ==='ValidationError'){
            const messages = Object.values(error.errors).map(val => val.message);

            res.status(400).json({
                success: false,
                error: messages
            })
        }
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }


}

// @desc Delete users
// @route DELETE /api/v1/users/:id
// @access Public
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                success: false,
                error: 'No user found'
            });
        }

        await user.remove();
        return res.status(200).json({
            success: true,
            data: {}
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}