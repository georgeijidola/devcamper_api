const asyncHandler = require("../../middlewares/async")
const BootCamp = require("../../models/bootCamp/BootCamp")
const ErrorResponse = require("../../utils/errorResponse")

// @desc    Delete BootCamp
// @route   Post {baseUrl}bootcamps
// @access  Private

const deleteBootCamp = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.findById(req.params.id)

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
        message: `User ${req.user.id} is unauthorized to delete this boot camp`,
        statusCode: 401,
      })
    )
  }

  await bootCamp.remove()

  res.status(200).json({
    error: false,
    message: "Deleted Bootcamp.",
  })
})

module.exports = deleteBootCamp
