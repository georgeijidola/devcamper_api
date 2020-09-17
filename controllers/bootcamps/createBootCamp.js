// @desc    Create BootCamp
// @route   Post {baseUrl}bootcamps
// @access  Private

const asyncHandler = require("../../middlewares/async")
const BootCamp = require("../../models/bootCamp/BootCamp")
const ErrorResponse = require("../../utils/errorResponse")

const createBootCamp = asyncHandler(async (req, res, next) => {
  const publishedBootCamp = await BootCamp.findOne({ user: req.user.id })

  // If the user is not an admin, they can only add on bootcamp
  if (publishedBootCamp && req.user.role !== "admin") {
    return next(
      new ErrorResponse({
        message: `The user with ID ${req.user.id} has already published a boot camp`,
        statusCode: 403,
      })
    )
  }

  const bootCamp = await BootCamp.create({ user: req.user.id, ...req.body })

  res.status(201).json({
    error: false,
    message: "Created Bootcamp.",
    data: bootCamp,
  })
})

module.exports = createBootCamp
