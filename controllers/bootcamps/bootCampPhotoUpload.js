const asyncHandler = require("../../middlewares/async")
const BootCamp = require("../../models/bootCamp/BootCamp")
const ErrorResponse = require("../../utils/errorResponse")

// @desc    Upload BootCamp Photo
// @route   Post {baseUrl}bootcamps/:id/photo
// @access  Private

const bootCampPhotoUpload = asyncHandler(async (req, res, next) => {
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
        message: `User ${req.user.id} is unauthorized to upload photo this boot camp`,
        statusCode: 401,
      })
    )
  }

  if (!req.files) {
    return next(
      new ErrorResponse({
        message: "Please upload a file",
        statusCode: 400,
      })
    )
  }

  const file = req.files.file

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(
      new ErrorResponse({
        message: "Please upload an image file.",
        statusCode: 400,
      })
    )
  }

  //   Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse({
        message: `Please upload an image file size less than ${
          process.env.MAX_FILE_UPLOAD / 1024 / 1024
        }.`,
        statusCode: 400,
      })
    )
  }

  // Create custom filename
  file.name = `${bootCamp._id}-${file.name}`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (error) => {
    if (error) {
      console.error(error)
      new ErrorResponse({
        message: `Problem with file upload`,
        statusCode: 400,
      })
    }

    await BootCamp.findByIdAndUpdate(req.params.id, { photo: file.name })

    res.status(200).json({
      error: false,
      data: file.name,
    })
  })
})

module.exports = bootCampPhotoUpload
