const results = (model, populateFields) => async (req, res, next) => {
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
  query = model.find(JSON.parse(queryString))

  populateFields.map((populateField) => {
    query = query.populate(populateField)
  })

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
  const total = await model.countDocuments()

  query = query.skip(startIndex).limit(limit)

  // Executing query
  const queryResults = await query

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

  res.results = {
    error: false,
    count: queryResults.length,
    pagination,
    data: queryResults,
  }

  next()
}

module.exports = results
