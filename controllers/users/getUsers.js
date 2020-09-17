// @desc    Get all users
// @route   Get {baseUrl}users
// @access  Public

const asyncHandler = require("../../middlewares/async")

const getUsers = asyncHandler(async (req, res, next) => {
  return res.status(200).json(res.results)
})

module.exports = getUsers
