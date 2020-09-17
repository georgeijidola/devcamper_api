// @desc    Update user details
// @route   Put {baseUrl}user
// @access  Private

const User = require("../../models/user/User")
const ErrorResponse = require("../../utils/errorResponse")
const asyncHandler = require("../../middlewares/async")
const sendTokenResponse = require("../../utils/sendTokenResponse")

const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password")

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(
      new ErrorResponse({
        message: "Password is incorrect",
        statusCode: 401,
      })
    )
  }

  user.password = req.body.newPassword

  await user.save()

  await sendTokenResponse({
    user,
    statusCode: 200,
    res,
    case: "Update Password",
  })
})

module.exports = updatePassword
