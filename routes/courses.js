const express = require("express")
// Initialize Router
const router = express.Router({ mergeParams: true })

// Import Controllers
const getCourses = require("../controllers/courses/getCourses")
const createCourse = require("../controllers/courses/createCourse")
const getCourse = require("../controllers/courses/getCourse")
const updateCourse = require("../controllers/courses/updateCourse")
const deleteCourse = require("../controllers/courses/deleteCourse")

const results = require("../middlewares/results")
const Course = require("../models/course/Course")
const protect = require("../middlewares/auth/protect")
const role = require("../middlewares/auth/role")

router
  .route("/")
  .get(
    results(Course, [
      {
        path: "bootCamp",
        select: "name description",
      },
    ]),
    getCourses
  )
  .post(protect, role("publisher", "admin"), createCourse)

router
  .route("/:id")
  .get(getCourse)
  .put(protect, role("publisher", "admin"), updateCourse)
  .delete(protect, role("publisher", "admin"), deleteCourse)

module.exports = router
