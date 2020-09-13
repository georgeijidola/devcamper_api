const asyncHandler = require("../../middlewares/async")
// @desc    Get all bootcamps
// @route   Get {baseUrl}bootcamps
// @access  Public

const BootCamp = require("../../models/bootCamp/BootCamp")

const getBootCamps = asyncHandler(async (req, res, next) => {
  const bootCamps = await BootCamp.find()

  res.status(200).json({
    error: false,
    data: bootCamps,
    count: bootCamps.length,
  })
})

module.exports = getBootCamps
