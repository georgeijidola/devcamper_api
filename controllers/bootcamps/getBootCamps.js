// @desc    Get all bootcamps
// @route   Get {baseUrl}bootcamps
// @access  Public

const BootCamp = require("../../models/bootCamp/BootCamp")

const getBootCamps = async (req, res) => {
  try {
    const bootCamps = await BootCamp.find()

    res.status(200).json({
      error: false,
      data: bootCamps,
      count: bootCamps.length,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      error: true,
      message: "Server Error",
    })
  }
}

module.exports = getBootCamps
