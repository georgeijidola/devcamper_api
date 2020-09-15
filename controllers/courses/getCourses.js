const asyncHandler = require("../../middlewares/async")
// @desc    Get all courses
// @route   Get {baseUrl}courses
// @access  Public

const getCourses = asyncHandler(async (req, res, next) => {
  return res.status(200).json(res.results)
})

module.exports = getCourses
