const asyncHandler = require("../../middlewares/async")
// @desc    Get all courses
// @route   Get {baseUrl}courses
// @access  Public

const Course = require("../../models/course/Course")

const getCourses = asyncHandler(async (req, res, next) => {
  let query

  // Copy req.query
  const requestQuery = { ...req.query }

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"]

  // Loop over removeFields and delelte them from requestQuery
  removeFields.forEach((param) => delete requestQuery[param])

  // Create query string
  let queryString = JSON.stringify(requestQuery)

  // Create operators: gt, gte, lt, lte, in
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  )

  // Finding resources
  if (req.params.id) {
    queryString = Object.assign(JSON.parse(queryString), {
      bootCamp: req.params.id,
    })
  }

  query = Course.find(req.params.id ? queryString : JSON.parse(queryString))

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ")

    query = query.select(fields)
  }

  // Sort records
  if (req.query.sort) {
    const sortByFields = req.query.sort.split(",").join(" ")

    query = query.sort(sortByFields)
  } else {
    query = query.sort("-createdAt")
  }

  // Pagination
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 25
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await Course.countDocuments()

  query = query.skip(startIndex).limit(limit)

  // Executing query
  const courses = await query.populate({
    path: "bootCamp",
    select: "name description",
  })

  // Pagination result
  const pagination = {}

  if (endIndex < total) {
    pagination.nextPage = {
      page: page + 1,
      limit,
    }
  }

  if (startIndex > 0) {
    pagination.previousPage = {
      page: page - 1,
      limit,
    }
  }

  res.status(200).json({
    error: false,
    data: courses,
    count: courses.length,
    pagination,
  })
})

module.exports = getCourses
