// @desc    Get bootcamp
// @route   Get {baseUrl}bootcamps/:id
// @access  Public

const BootCamp = require("../../models/bootCamp/BootCamp")
const ErrorResponse = require("../../utils/errorResponse")

const asyncHandler = require("../../middlewares/async")

const getBootCamp = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.findById(req.params.id).populate("courses")

  console.log(bootCamp.populated("courses"))
  if (!bootCamp) {
    return next(
      new ErrorResponse({
        message: `Boot camp not found with id of ${req.params.id}`,
        statusCode: 404,
      })
    )
  }

  res.status(200).json({
    error: false,
    data: bootCamp,
  })
})

module.exports = getBootCamp
