// @desc    Get all bootcamps
// @route   Get {baseUrl}bootcamps
// @access  Public

const createBootCamp = (req, res) => {
  res.status(200).json({ error: false, message: "Create Bootcamp" })
}

module.exports = createBootCamp
