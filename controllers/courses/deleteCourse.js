// @desc    Delete Course
// @route   Post {baseUrl}courses/:id
// @access  Private

const asyncHandler = require("../../middlewares/async")
const Course = require("../../models/course/Course")
const ErrorResponse = require("../../utils/errorResponse")

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

  // Make sure user owns boot camp owner or is admin
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse({
        message: `User ${req.user.id} is unauthorized to delete this course`,
        statusCode: 401,
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
