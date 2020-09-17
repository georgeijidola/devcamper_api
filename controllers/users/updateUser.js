// @desc    Update user details
// @route   Put {baseUrl}user
// @access  Private

const User = require("../../models/user/User")
const ErrorResponse = require("../../utils/errorResponse")

const asyncHandler = require("../../middlewares/async")

const updateUser = asyncHandler(async (req, res, next) => {
  let id

  if (req.params.id) {
    if (req.user.role !== "admin") {
      return next(
        new ErrorResponse({
          message: "Unauthorized action",
          statusCode: 401,
        })
      )
    }
    id = req.params.id
  } else {
    id = req.user.id
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    },
    { new: true }
  )

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

module.exports = updateUser
