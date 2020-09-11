const express = require("express")
const { create } = require("../../../../../Desktop/SBSC/dms/model/file/File")
// Initialize Router
const router = express.Router()

// Import Controllers
const getBootCamps = require("../controllers/bootcamps/getBootCamps")
const createBootCamp = require("../controllers/bootcamps/createBootCamp")
const getBootCamp = require("../controllers/bootcamps/getBootCamp")
const updateBootCamp = require("../controllers/bootcamps/updateBootCamp")
const deleteBootCamp = require("../controllers/bootcamps/deleteBootCamp")

router.route("/").get(getBootCamps).post(createBootCamp)

router.route("/:id").get(getBootCamp).put(updateBootCamp).delete(deleteBootCamp)

module.exports = router
