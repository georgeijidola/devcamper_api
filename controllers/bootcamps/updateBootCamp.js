const asyncHandler = require("../../middlewares/async")
const BootCamp = require("../../models/bootCamp/BootCamp")
const ErrorResponse = require("../../utils/errorResponse")

// @desc    Update BootCamp
// @route   Post {baseUrl}bootcamps
// @access  Private

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
