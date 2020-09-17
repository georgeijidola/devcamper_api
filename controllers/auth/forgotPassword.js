// @desc    Forgot Password
// @route   Get {baseUrl}auth/forgot-password
// @access  Public

const User = require("../../models/user/User")
const ErrorResponse = require("../../utils/errorResponse")
const sendMail = require("../../utils/sendMail")

const asyncHandler = require("../../middlewares/async")

const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(
      new ErrorResponse({
        message: "User not found with that email.",
        statusCode: 404,
      })
    )
  }

  // Get reset token
  const resetToken = await user.getResetPasswordToken()

  await user.save({ validateBeforeSave: true })

  try {
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/reset-password/${resetToken}`

    await sendMail({
      to: user.email,
      from: "gijidola@sbsc.com",
      subject: "Pasword Reset Token",
      message: `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`,
      next,
    })

    res.status(200).json({
      error: false,
      message: "Email sent",
    })
  } catch (error) {
    console.log(error.response.body.errors)
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: true })

    return next(
      new ErrorResponse({
        message: "Email could not be sent",
        statusCode: 500,
      })
    )
  }
})

module.exports = forgotPassword
