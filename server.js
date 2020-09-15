const path = require("path")
const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")

const errorHandler = require("./middlewares/error")
require("dotenv").config()
require("colors")

// Route files
const bootcamps = require("./routes/bootcamps")
const courses = require("./routes/courses")
const auth = require("./routes/auth")

// Load env vars
// dotenv.config({ path: "./config/config.env" })

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

// Port Number
const PORT = process.env.PORT || 6000

const baseURL = "/api/v1/"

// Dev Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Mount routers
app.use(`${baseURL}bootcamps`, bootcamps)
app.use(`${baseURL}courses`, courses)
app.use(`${baseURL}auth`, auth)

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
