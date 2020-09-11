const BootCamp = require("../../models/bootCamp/BootCamp")

// @desc    Delete BootCamp
// @route   Post {baseUrl}bootcamps
// @access  Private

const deleteBootCamp = async (req, res) => {
  try {
    const bootCamp = await BootCamp.findByIdAndDelete(req.params.id)

    if (!bootCamp) {
      res.status(404).json({
        error: true,
        message: "Not found",
      })
    }

    res.status(200).json({
      error: false,
      message: "Deleted Bootcamp.",
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      error: true,
      message: "Server Error",
    })
  }
}

module.exports = deleteBootCamp
