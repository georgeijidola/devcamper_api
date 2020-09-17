// @desc    Get reviews
// @route   Get {baseUrl}reviews
// @route   Get {baseUrl}bootcamp/:id/reviews
// @access  Public

const BootCamp = require("../../models/bootCamp/BootCamp")
const Review = require("../../models/review/Review")
const asyncHandler = require("../../middlewares/async")

const getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.id) {
    const reviews = await Review.find({ bootCamp: req.params.id })
      .populate({
        path: "bootCamp",
        select: "name description",
      })
      .populate({ path: "user", select: "firstName lastName role email" })

    return res.status(200).json({
      error: false,
      count: reviews.length,
      data: reviews,
    })
  } else {
    return res.status(200).json(res.results)
  }
})

module.exports = getReviews
