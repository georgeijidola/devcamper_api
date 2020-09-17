// @desc    Get boot camps within a radius
// @route   Get {baseUrl}bootcamps/radius?zipcode=2849&distance=30
// @access  Public

const asyncHandler = require("../../middlewares/async")
const BootCamp = require("../../models/bootCamp/BootCamp")
const geoCoder = require("../../utils/geoCoder")

const deleteBootCamp = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.query

  // Get lattitude/longtitude from geocoder
  const loc = await geoCoder.geocode(zipcode)
  const lat = loc[0].latitude
  const lng = loc[0].longitude

  // Calculate radius using radians
  // Divide distance by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963

  const bootCamps = await BootCamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  })

  res.status(200).json({
    error: false,
    data: bootCamps,
    count: bootCamps.length,
  })
})

module.exports = deleteBootCamp
