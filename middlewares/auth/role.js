const jwt = require("jsonwebtoken")
const User = require("../../models/user/User")
const ErrorResponse = require("../../utils/errorResponse")
const asyncHandler = require("../async")

// Protect routes
const role = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse({
          message: `User role '${req.user.role}' is unauthorized to access this route`,
          statusCode: 403,
        })
      )
    }

    next()
  })

module.exports = role
