// @desc    Get review
// @route   Get {baseUrl}reviews/:id
// @access  Public

const Review = require("../../models/review/Review")
const ErrorResponse = require("../../utils/errorResponse")

const asyncHandler = require("../../middlewares/async")

const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)
    .populate({
      path: "bootCamp",
      select: "name description",
    })
    .populate({ path: "user", select: "firstName lastName role email" })

  if (!review) {
    return next(
      new ErrorResponse({
        message: `Review not found with id of ${req.params.id}`,
        statusCode: 404,
      })
    )
  }

  res.status(200).json({
    error: false,
    data: review,
  })
})

module.exports = getReview
