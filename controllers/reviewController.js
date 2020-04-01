const Review = require('../models/Review')
// @desc Get all Reviews
// @route GET /api/v1/reviews
// @access Public
exports.getReviews = async (req, res, next) => {
    //res.send('Get Reviews');
    try {
        const reviews = await Reviews.find();

        return res.sendStatus(200).json({
            success: true,
            count: reviews.length,
            data: transactions
        });
    }
    catch(err){
        return res.sendStatus(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc Add Reviews
// @route POST /api/v1/reviews
// @access Public
exports.addReview = async (req, res, next) => {
    res.send('Add Review');
}

// @desc Delete reviews
// @route DELETE /api/v1/reviews/:id
// @access Public
exports.deleteReview = async (req, res, next) => {
    res.send('Delete Reviews');
}