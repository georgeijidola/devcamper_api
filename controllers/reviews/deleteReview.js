// @desc    Delete Review
// @route   Post {baseUrl}reviews/:id
// @access  Private

const asyncHandler = require("../../middlewares/async")
const Review = require("../../models/review/Review")
const ErrorResponse = require("../../utils/errorResponse")

const deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)

  if (!review) {
    return next(
      new ErrorResponse({
        message: `Review not found with id of ${req.params.id}`,
        statusCode: 404,
      })
    )
  }

  // Make sure user owns boot camp owner or is admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse({
        message: `User ${req.user.id} is unauthorized to delete this review`,
        statusCode: 401,
      })
    )
  }

  await review.remove()

  res.status(200).json({
    error: false,
    message: "Deleted Review.",
  })
})

module.exports = deleteReview
