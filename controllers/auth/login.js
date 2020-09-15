const asyncHandler = require("../../middlewares/async")
const User = require("../../models/user/User")
const ErrorResponse = require("../../utils/errorResponse")
const sendTokenResponse = require("../../utils/sendTokenResponse")

// @desc    Login user
// @route   Post {baseUrl}auth/login
// @access  Public

const register = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  // Validate email and password
  if (!email || !password || email === "" || password === "") {
    return next(
      new ErrorResponse({
        message: "Please provide an email and passord",
        statusCode: 400,
      })
    )
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password")

  if (!user) {
    return next(
      new ErrorResponse({ message: "Invalid credentials", statusCode: 400 })
    )
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    return next(
      new ErrorResponse({ message: "Invalid credentials", statusCode: 400 })
    )
  }

  sendTokenResponse({ user, statusCode: 200, res, case: "Login" })
})

module.exports = register
