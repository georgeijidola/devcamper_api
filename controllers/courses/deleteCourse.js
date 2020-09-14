const asyncHandler = require("../../middlewares/async")
const Course = require("../../models/course/Course")
const ErrorResponse = require("../../utils/errorResponse")

// @desc    Delete Course
// @route   Post {baseUrl}courses
// @access  Private

const deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id)

  if (!course) {
    return next(
      new ErrorResponse({
        message: `Course not found with id of ${req.params.id}`,
        statusCode: 404,
      })
    )
  }

  await course.remove()

  res.status(200).json({
    error: false,
    message: "Deleted Course.",
  })
})

module.exports = deleteCourse
