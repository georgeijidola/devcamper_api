const asyncHandler = require("../../middlewares/async")
const BootCamp = require("../../models/bootCamp/BootCamp")
const Course = require("../../models/course/Course")
const ErrorResponse = require("../../utils/errorResponse")

// @desc    Create Course
// @route   Post {baseUrl}bootcamps/:id/courses
// @access  Private

const createCourse = asyncHandler(async (req, res, next) => {
  req.params.id ? (req.body.bootCamp = req.params.id) : req.body

  const bootCamp = await BootCamp.findById(req.body.bootCamp)

  if (!bootCamp) {
    return next(
      new ErrorResponse({
        message: `Boot camp not found with id of ${req.params.id}`,
        statusCode: 404,
      })
    )
  }

  const course = await Course.create({
    user: req.user.id,
    ...req.body,
  })

  res.status(201).json({
    error: false,
    message: "Created Course.",
    data: course,
  })
})

module.exports = createCourse
