const asyncHandler = require("../../middlewares/async")
const User = require("../../models/user/User")
const sendTokenResponse = require("../../utils/sendTokenResponse")

// @desc    Register user
// @route   Post {baseUrl}auth
// @access  Public

const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
  })

  sendTokenResponse({
    user,
    statusCode: 200,
    res,
    message: "Registered user",
    module: "Register",
  })
})

module.exports = register
