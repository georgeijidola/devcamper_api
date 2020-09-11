const BootCamp = require("../../models/bootCamp/BootCamp")

// @desc    Create BootCamp
// @route   Post {baseUrl}bootcamps
// @access  Private

const createBootCamp = async (req, res) => {
  try {
    const bootCamp = await BootCamp.create(req.body)

    res.status(201).json({
      error: false,
      message: "Created Bootcamp.",
      data: bootCamp,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      error: true,
      message: "Server Error",
    })
  }
}

module.exports = createBootCamp
