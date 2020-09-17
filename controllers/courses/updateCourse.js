// @desc    Update Course
// @route   Post {baseUrl}courses/:id
// @access  Private

const asyncHandler = require("../../middlewares/async")
const Course = require("../../models/course/Course")
const ErrorResponse = require("../../utils/errorResponse")

const updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id)

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
        message: `User ${req.user.id} is unauthorized to update this course`,
        statusCode: 401,
      })
    )
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    error: false,
    message: "Updated Course.",
    data: course,
  })
})

module.exports = updateCourse
