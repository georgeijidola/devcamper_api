const asyncHandler = require("../../middlewares/async")
// @desc    Get all bootcamps
// @route   Get {baseUrl}bootcamps
// @access  Public

const results = require("../../middlewares/results")
const BootCamp = require("../../models/bootCamp/BootCamp")

const getBootCamps = asyncHandler(async (req, res, next) => {
  return res.status(200).json(res.results)
})

module.exports = getBootCamps
