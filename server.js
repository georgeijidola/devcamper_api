const path = require("path")
const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const helmet = require("helmet")
const xss = require("xss-clean")
const rateLimit = require("express-rate-limit")
const hpp = require("hpp")
const mongoSanitize = require("express-mongo-sanitize")

const errorHandler = require("./middlewares/error")
// Load env vars
require("dotenv").config({ path: "./config/config.env" })
require("colors")

// Route files
const bootcamps = require("./routes/bootCamps")
const courses = require("./routes/courses")
const auth = require("./routes/auth")
const user = require("./routes/users")
const review = require("./routes/reviews")

// Load db
require("./config/db")()

// Initialize express app
const app = express()

// Initialize middlewares
app.use(cors())
// Body Parser
app.use(express.json())
// File upload
app.use(
  fileUpload({
    // useTempFiles: true,
    preserveExtension: true,
  })
)
// Cookie parser
app.use(cookieParser())

// Set static folder
app.use(express.static(path.join(__dirname, "public")))

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Rate limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
})
app.use(limiter)

// Prevent HTTP Param Pollution
app.use(hpp())

// Port Number
const PORT = process.env.PORT || 6000

const baseURL = "/api/v1/"

// Dev Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Home
app.get(`${baseURL}`, (req, res) => {
  res.redirect("https://documenter.getpostman.com/view/4872797/TVKA4z4w")
})

// Mount routers
app.use(`${baseURL}bootcamps`, bootcamps)
app.use(`${baseURL}courses`, courses)
app.use(`${baseURL}auth`, auth)
app.use(`${baseURL}users`, user)
app.use(`${baseURL}reviews`, review)

app.use(errorHandler)

const server = app.listen(PORT, () => {
  console.log(
    ` Server running in ${process.env.NODE_ENV} mode listening on port ${PORT} `
      .black.bgBrightWhite
  )
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error(`Error: ${err.message}`.red)

  // Close server & exit process
  server.close(() => process.exit(1))
})

// Handle unhandled promise rejections
process.on("uncaughtException", (err, promise) => {
  console.error(`Error: ${err.message}`.red)

  // Close server & exit process
  server.close(() => process.exit(1))
})
