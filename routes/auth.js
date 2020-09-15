const express = require("express")

// Initialize Router
const router = express.Router()

// Import Controllers
const register = require("../controllers/auth/register")
const login = require("../controllers/auth/login")
const getLoggedInUser = require("../controllers/auth/getLoggedInUser")
const protect = require("../middlewares/auth/protect")

// Include other resource routers
// const courseRouter = require("./courses")

// const results = require("../middlewares/results")
// const BootCamp = require("../models/bootCamp/BootCamp")

// router.use("/:id/courses", courseRouter)

router.route("/").post(register).get(protect, getLoggedInUser)

router.route("/login").post(login)

module.exports = router
