// @desc    Get all bootcamps
// @route   Get {baseUrl}bootcamps
// @access  Public

const getBootCamps = (req, res) => {
  res.status(200).json({ error: false, message: "Show all" })
}

module.exports = getBootCamps
