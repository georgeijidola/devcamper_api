const express = require("express")
// Initialize Router
const router = express.Router({ mergeParams: true })

// Import Controllers
const getReviews = require("../controllers/reviews/getReviews")
const addReview = require("../controllers/reviews/addReview")
const getReview = require("../controllers/reviews/getReview")
const updateReview = require("../controllers/reviews/updateReview")
const deleteReview = require("../controllers/reviews/deleteReview")

const results = require("../middlewares/results")
const Review = require("../models/review/Review")
const protect = require("../middlewares/auth/protect")
const role = require("../middlewares/auth/role")

router
  .route("/")
  .get(
    results(Review, [
      {
        path: "bootCamp",
        select: "name description",
      },
      { path: "user", select: "firstName lastName role email" },
    ]),
    getReviews
  )
  .post(protect, role("user", "admin"), addReview)

router
  .route("/:id")
  .get(getReview)
  .put(protect, role("user", "admin"), updateReview)
  .delete(protect, role("user", "admin"), deleteReview)

module.exports = router
