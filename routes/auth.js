const express = require("express")

// Initialize Router
const router = express.Router()

// Import Controllers
const register = require("../controllers/auth/register")
const login = require("../controllers/auth/login")
const getLoggedInUser = require("../controllers/auth/getLoggedInUser")
const protect = require("../middlewares/auth/protect")
const forgotPassword = require("../controllers/auth/forgotPassword")
const resetPassword = require("../controllers/auth/resetPassword")
const logout = require("../controllers/auth/logout")

router.route("/").post(register).get(protect, getLoggedInUser)

router.post("/login", login)

router.post("/forgot-password", forgotPassword)

router.put("/reset-password/:resetToken", resetPassword)

router.post("/logout", protect, logout)

module.exports = router
