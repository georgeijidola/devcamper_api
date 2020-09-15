const ErrorResponse = require("../utils/errorResponse")

const errorHandler = (error, req, res, next) => {
  let formattedError = error
  let message

  // Log to console for dev
  console.error(error.stack.brightRed.bold)

  switch (error.name) {
    case "URIError":
    case "EvalError":
    case "SyntaxError":
    case "ReferenceError":
    case "RangeError":
    case "TypeError":
      message = `Server error: ${error.name}`

      formattedError = new ErrorResponse({ message, statusCode: 400 })

      break
  }

  // Mongoose CastError(bad ObjectId)
  if (error.name === "CastError") {
    message = `Resource not found with id format of ${error.value}`

    formattedError = new ErrorResponse({ message, statusCode: 400 })
  }

  // Mongoose Duplicate key
  if (error.code === 11000) {
    message = `Duplicate field value entered`

    formattedError = new ErrorResponse({ message, statusCode: 400 })
  }

  // Mongoose Validation Error
  if (error.name === "ValidationError") {
    message = Object.values(error.errors).map((val) => val.message)

    formattedError = new ErrorResponse({ message, statusCode: 400 })
  }

  res.status(formattedError.statusCode || 500).json({
    error: true,
    message: formattedError.message || "Server Error",
  })
}

module.exports = errorHandler
