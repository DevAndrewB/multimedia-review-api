const Review = require('../models/Review')
// @desc Get all Reviews
// @route GET /api/v1/reviews
// @access Public
exports.getReviews = async (req, res, next) => {
    //res.send('Get Reviews');
    try {
        const reviews = await Review.find();

        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch(err){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc Add Reviews
// @route POST /api/v1/reviews
// @access Public
exports.addReview = async (req, res, next) => {
    try {
        const {rating, user} = req.body;

        const review = await Review.create(req.body);
    
        return res.status(201).json({
            success: true,
            data: review
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

// @desc Delete reviews
// @route DELETE /api/v1/reviews/:id
// @access Public
exports.deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);
        if(!review){
            return res.status(404).json({
                success: false,
                error: 'No review found'
            });
        }

        await review.remove();
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