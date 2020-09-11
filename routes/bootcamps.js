const express = require("express")
const { create } = require("../../../../../Desktop/SBSC/dms/model/file/File")
// Initialize Router
const router = express.Router()

// Import Controllers
const getBootCamps = require("../controllers/bootcamps/getBootCamps")
const createBootCamp = require("../controllers/bootcamps/createBootCamp")

router.route("/").get(getBootCamps).post(createBootCamp)

module.exports = router
