const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReview
} = require('../controllers/reviewController');

router.route('/').post(authenticateUser, createReview).get(getAllReviews);

router
  .route('/:id')
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

router.route('/:id/review').get(getSingleProductReview)

module.exports = router;