// @desc    Update BootCamp
// @route   Post {baseUrl}bootcamps/:id
// @access  Private

const asyncHandler = require("../../middlewares/async")
const BootCamp = require("../../models/bootCamp/BootCamp")
const ErrorResponse = require("../../utils/errorResponse")

const updateBootCamp = asyncHandler(async (req, res, next) => {
  let bootCamp = await BootCamp.findById(req.params.id)

  if (!bootCamp) {
    return next(
      new ErrorResponse({
        message: `Boot camp not found with id of ${req.params.id}`,
        statusCode: 404,
      })
    )
  }

  // Make sure user owns boot camp owner or is admin
  if (bootCamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse({
        message: `User ${req.user.id} is unauthorized to update this boot camp`,
        statusCode: 401,
      })
    )
  }

  bootCamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    error: false,
    message: "Updated Bootcamp.",
    data: bootCamp,
  })
})

module.exports = updateBootCamp
