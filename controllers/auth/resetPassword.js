// @desc    Reset Password
// @route   Put {baseUrl}auth/reset-password/:resetToken
// @access  Public

const crypto = require("crypto")

const asyncHandler = require("../../middlewares/async")

const User = require("../../models/user/User")
const ErrorResponse = require("../../utils/errorResponse")

const sendTokenResponse = require("../../utils/sendTokenResponse")

const resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex")

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(
      new ErrorResponse({
        message: "Invalid token",
        statusCode: 400,
      })
    )
  }

  // Set new password
  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()

  await sendTokenResponse({
    user,
    statusCode: 200,
    res,
    case: "Reset Password",
  })
})

module.exports = resetPassword
