// @desc    Create Review
// @route   Post {baseUrl}bootcamps/:id/reviews
// @access  Private

const asyncHandler = require("../../middlewares/async")
const BootCamp = require("../../models/bootCamp/BootCamp")
const Review = require("../../models/review/Review")
const ErrorResponse = require("../../utils/errorResponse")

const addReview = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.findById(req.params.id)

  if (!bootCamp) {
    return next(
      new ErrorResponse({
        message: `Boot camp not found with id of ${req.params.id}`,
        statusCode: 404,
      })
    )
  }

  const review = await Review.create({
    user: req.user.id,
    bootCamp: req.params.id,
    ...req.body,
  })

  res.status(201).json({
    error: false,
    message: "Created Review.",
    data: review,
  })
})

module.exports = addReview
