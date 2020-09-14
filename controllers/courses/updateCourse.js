const asyncHandler = require("../../middlewares/async")
const Course = require("../../models/course/Course")
const ErrorResponse = require("../../utils/errorResponse")

// @desc    Update Course
// @route   Post {baseUrl}courses
// @access  Private

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

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    error: false,
    message: "Updated Bootcamp.",
    data: course,
  })
})

module.exports = updateCourse
