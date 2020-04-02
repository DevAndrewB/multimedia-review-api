const express = require('express');

const router = express.Router();
const {
  getReviews,
  addReview,
  deleteReview
} = require('../controllers/reviewController');

router.route('/').get(getReviews).post(addReview);

router.route('/:id').delete(deleteReview);

module.exports = router;
