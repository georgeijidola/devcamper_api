// @desc    Log user out / clear cookie
// @route   Get {baseUrl}auth/logout
// @access  Private

const asyncHandler = require("../../middlewares/async")

const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })

  res.status(200).json({
    error: false,
    message: "User logged out.",
  })
})

module.exports = logout
