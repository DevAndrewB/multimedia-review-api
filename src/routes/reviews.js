const express = require('express');

const router = express.Router();
const {
  getReviews,
  addReview,
  deleteReview,
  getReviewsByMovieId,
} = require('../controllers/reviewController');

router.route('/').get(getReviews).post(addReview);

router.route('/:id')
.delete(deleteReview);

router.route('/:movieId')
.get(getReviewsByMovieId);

module.exports = router;
