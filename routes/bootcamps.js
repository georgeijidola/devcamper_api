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
const bootCampPhotoUpload = require("../controllers/bootcamps/bootCampPhotoUpload")

// Include other resource routers
const coursesRouter = require("./courses")
const reviewsRouter = require("./reviews")

const results = require("../middlewares/results")
const BootCamp = require("../models/bootCamp/BootCamp")

const protect = require("../middlewares/auth/protect")
const role = require("../middlewares/auth/role")

router.use("/:id/courses", coursesRouter)
router.use("/:id/reviews", reviewsRouter)

router
  .route("/")
  .get(results(BootCamp, ["courses"]), getBootCamps)
  .post(protect, role("publisher", "admin"), createBootCamp)

router.route("/radius").get(getBootCampsInRadius)

router
  .route("/:id/photo")
  .put(protect, role("publisher", "admin"), bootCampPhotoUpload)

router
  .route("/:id")
  .get(getBootCamp)
  .put(protect, role("publisher", "admin"), updateBootCamp)
  .delete(protect, role("publisher", "admin"), deleteBootCamp)

module.exports = router
