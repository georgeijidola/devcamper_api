// @desc    Update Review
// @route   Post {baseUrl}reviews/:id
// @access  Private

const asyncHandler = require("../../middlewares/async")
const Review = require("../../models/review/Review")
const ErrorResponse = require("../../utils/errorResponse")

const updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id)

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
        message: `User ${req.user.id} is unauthorized to update this review`,
        statusCode: 401,
      })
    )
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    error: false,
    message: "Updated Review.",
    data: review,
  })
})

module.exports = updateReview
