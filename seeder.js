const fs = require("fs")
const mongoose = require("mongoose")
const colors = require("colors")
const dotenv = require("dotenv")

// Load env variables
dotenv.config()

// Load models
const BootCamp = require("./models/bootCamp/BootCamp")
const Course = require("./models/course/Course")
const User = require("./models/user/User")

// Connect to DB
const connectDB = async () => {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

connectDB()

// Read JSON Files
const bootCamps = JSON.parse(fs.readFileSync("./_data/bootCamps.json", "utf-8"))
const courses = JSON.parse(fs.readFileSync("./_data/courses.json", "utf-8"))

// Import into DB
const importData = async () => {
  try {
    await BootCamp.create(bootCamps)
    await Course.create(courses)

    console.log(" Data imported... ".white.bgBrightGreen.bold)
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await BootCamp.deleteMany()
    await Course.deleteMany()
    await User.deleteMany()

    console.log(" Data destroyed... ".white.bgBrightRed.bold)
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

if (process.argv[2] === "-i") {
  importData()
} else if (process.argv[2] === "-d") {
  deleteData()
}
