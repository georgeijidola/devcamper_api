const ErrorResponse = require("../utils/errorResponse")

const errorHandler = (error, req, res, next) => {
  let formattedError = error

  // Log to console for dev
  console.error(error.stack.brightRed.bold)

  // Mongoose CastError(bad ObjectId)
  if (error.name === "CastError") {
    const message = `Resource not found with id format of ${error.value}`

    formattedError = new ErrorResponse({ message, statusCode: 400 })
  }

  // Mongoose Duplicate key
  if (error.code === 11000) {
    const message = `Duplicate field value entered`

    formattedError = new ErrorResponse({ message, statusCode: 400 })
  }

  // Mongoose Validation Error
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors).map((val) => val.message)

    formattedError = new ErrorResponse({ message, statusCode: 400 })
  }

  res.status(formattedError.statusCode || 500).json({
    error: true,
    message: formattedError.message || "Server Error",
  })
}

module.exports = errorHandler
