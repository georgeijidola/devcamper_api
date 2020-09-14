const express = require("express")
// Initialize Router
const router = express.Router({ mergeParams: true })

// Import Controllers
const getCourses = require("../controllers/courses/getCourses")
const createCourse = require("../controllers/courses/createCourse")
const getCourse = require("../controllers/courses/getCourse")
const updateCourse = require("../controllers/courses/updateCourse")
const deleteCourse = require("../controllers/courses/deleteCourse")

router.route("/").get(getCourses).post(createCourse)

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse)

module.exports = router
