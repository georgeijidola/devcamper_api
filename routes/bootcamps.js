const express = require("express")
// Initialize Router
const router = express.Router()

// Import Controllers
const getBootCamps = require("../controllers/bootcamps/getBootCamps")
const getBootCampsInRadius = require("../controllers/bootcamps/getBootCampsInRadius")
const createBootCamp = require("../controllers/bootcamps/createBootCamp")
const getBootCamp = require("../controllers/bootcamps/getBootCamp")
const updateBootCamp = require("../controllers/bootcamps/updateBootCamp")
const deleteBootCamp = require("../controllers/bootcamps/deleteBootCamp")

// Include other resource routers
const courseRouter = require("./courses")

router.use("/:id/courses", courseRouter)

router.route("/").get(getBootCamps).post(createBootCamp)

router.route("/radius").get(getBootCampsInRadius)

router.route("/:id").get(getBootCamp).put(updateBootCamp).delete(deleteBootCamp)

module.exports = router
