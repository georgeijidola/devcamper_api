const jwt = require("jsonwebtoken")
const User = require("../../models/user/User")
const ErrorResponse = require("../../utils/errorResponse")
const asyncHandler = require("../async")

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]
  }
  // else if (req.cookies.token) {
  //     token = req.cookies.token
  // }

  // Make sure token exists
  if (!token) {
    return next(
      new ErrorResponse({
        message: "Not authorized to access this route",
        statusCode: 401,
      })
    )
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id)

    next()
  } catch (error) {
    next(error)
  }
})

module.exports = protect
