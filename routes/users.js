const express = require("express")

// Initialize Router
const router = express.Router()

// Import models
const User = require("../models/user/User")

// Import Controllers
const updateUser = require("../controllers/users/updateUser")
const updatePassword = require("../controllers/users/updatePassword")
const protect = require("../middlewares/auth/protect")
const role = require("../middlewares/auth/role")
const getUsers = require("../controllers/users/getUsers")
const getUser = require("../controllers/users/getUser")
const results = require("../middlewares/results")
const deleteUser = require("../controllers/users/deleteUser")
const createUser = require("../controllers/users/createUser")

router.put("/password", protect, updatePassword)
router.put("/:id", protect, updateUser)

router.use(protect)
router.use(role("admin"))

router.route("/:id").get(getUser).delete(deleteUser)

router.route("/").get(results(User, []), getUsers).post(createUser)

module.exports = router
