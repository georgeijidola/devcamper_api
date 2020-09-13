const asyncHandler = require("../../middlewares/async")
const BootCamp = require("../../models/bootCamp/BootCamp")

// @desc    Create BootCamp
// @route   Post {baseUrl}bootcamps
// @access  Private

const createBootCamp = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.create(req.body)

  res.status(201).json({
    error: false,
    message: "Created Bootcamp.",
    data: bootCamp,
  })
})

module.exports = createBootCamp
