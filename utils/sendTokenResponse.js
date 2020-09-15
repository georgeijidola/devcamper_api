const sendTokenResponse = async ({
  user,
  statusCode,
  res,
  module,
  message,
}) => {
  // Create token
  const token = await user.getSignedJwtToken()

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }

  if (process.env.NODE_ENV === "production") {
    options.secure = true
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      error: false,
      token,
      message,
      data: module === "Register" ? user : undefined,
    })
}

module.exports = sendTokenResponse
