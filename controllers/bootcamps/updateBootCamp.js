const BootCamp = require("../../models/bootCamp/BootCamp")

// @desc    Update BootCamp
// @route   Post {baseUrl}bootcamps
// @access  Private

const updateBootCamp = async (req, res) => {
  try {
    let bootCamp = await BootCamp.findById(req.params.id)

    if (!bootCamp) {
      res.status(404).json({
        error: true,
        message: "Not found",
      })
    }

    bootCamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      error: false,
      message: "Updated Bootcamp.",
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

module.exports = updateBootCamp
