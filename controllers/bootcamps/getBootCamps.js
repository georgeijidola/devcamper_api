// @desc    Get all bootcamps
// @route   Get {baseUrl}bootcamps
// @access  Public

const asyncHandler = require("../../middlewares/async")

const getBootCamps = asyncHandler(async (req, res, next) => {
  return res.status(200).json(res.results)
})

module.exports = getBootCamps
