const asyncHandler = require("../../middlewares/async")
// @desc    Get current logged in user
// @route   Get {baseUrl}auth
// @access  Private

const User = require("../../models/user/User")
const ErrorResponse = require("../../utils/errorResponse")

const getLoggedInUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    return next(
      new ErrorResponse({
        message: "User not found.",
        statusCode: 404,
      })
    )
  }

  res.status(200).json({
    error: false,
    data: user,
  })
})

module.exports = getLoggedInUser
