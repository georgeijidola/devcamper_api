// @desc    Get user
// @route   Get {baseUrl}user/:id
// @access  Public

const asyncHandler = require("../../middlewares/async")
const User = require("../../models/user/User")

const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  return res.status(200).json({ error: false, data: user })
})

module.exports = getUser
