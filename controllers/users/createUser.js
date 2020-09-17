// @desc    Create User
// @route   Post {baseUrl}users
// @access  Private

const asyncHandler = require("../../middlewares/async")
const User = require("../../models/user/User")

const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body)

  res.status(201).json({
    error: false,
    message: "Created User.",
    data: user,
  })
})

module.exports = createUser
