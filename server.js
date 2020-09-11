const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
require("colors")

// Route files
const bootcamps = require("./routes/bootcamps")

// Load env vars
dotenv.config({ path: "./config/config.env" })
// Load db
require("./config/db")()

// Initialize express app
const app = express()

// Port Number
const PORT = process.env.PORT || 6000

const baseURL = "/api/v1/"

// Dev Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Mount routers
app.use(`${baseURL}bootcamps`, bootcamps)

const server = app.listen(PORT, () => {
  console.log(
    ` Server running in ${process.env.NODE_ENV} mode listening on port ${PORT} `
      .black.bgWhite
  )
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red)

  // Close server & exit process
  server.close(() => process.exit(1))
})

// Handle unhandled promise rejections
process.on("uncaughtException", (err, promise) => {
  console.log(`Error: ${err.message}`.red)

  // Close server & exit process
  server.close(() => process.exit(1))
})
