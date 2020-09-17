// @desc    Get all courses
// @route   Get {baseUrl}courses
// @access  Public

const Course = require("../../models/course/Course")
const asyncHandler = require("../../middlewares/async")

const getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.id) {
    const courses = await Course.find({ bootCamp: req.params.id })

    return res.status(200).json({
      error: false,
      count: courses.length,
      data: courses,
    })
  } else {
    return res.status(200).json(res.results)
  }
})

module.exports = getCourses
