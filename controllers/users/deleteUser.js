// @desc    Delete User
// @route   Post {baseUrl}users/:id
// @access  Private

const asyncHandler = require("../../middlewares/async")
const User = require("../../models/user/User")
const ErrorResponse = require("../../utils/errorResponse")

const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorResponse({
        message: `User not found with id of ${req.params.id}`,
        statusCode: 404,
      })
    )
  }

  await user.remove()

  res.status(200).json({
    error: false,
    message: "Deleted User.",
  })
})

module.exports = deleteUser
