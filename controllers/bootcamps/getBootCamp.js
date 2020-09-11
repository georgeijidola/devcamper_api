// @desc    Get bootcamp
// @route   Get {baseUrl}bootcamps/:id
// @access  Public

const BootCamp = require("../../models/bootCamp/BootCamp")
const ErrorResponse = require("../../utils/errorResponse")

const getBootCamp = async (req, res, next) => {
  try {
    const bootCamp = await BootCamp.findById(req.params.id)

    if (!bootCamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      )
    }

    res.status(200).json({
      error: false,
      data: bootCamp,
    })
  } catch (error) {
    next(new ErrorResponse(undefined, undefined))
  }
}

module.exports = getBootCamp
