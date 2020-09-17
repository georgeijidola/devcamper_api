// @desc    Get course
// @route   Get {baseUrl}courses/:id
// @access  Public

const Course = require("../../models/course/Course")
const ErrorResponse = require("../../utils/errorResponse")

const asyncHandler = require("../../middlewares/async")

const getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id)

  if (!course) {
    return next(
      new ErrorResponse({
        message: `Course not found with id of ${req.params.id}`,
        statusCode: 404,
      })
    )
  }

  res.status(200).json({
    error: false,
    data: course,
  })
})

module.exports = getCourse
