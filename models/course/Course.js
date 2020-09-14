/** @format */

const { Schema, model } = require("mongoose")
const slugify = require("slugify")
const geoCoder = require("../../utils/geoCoder")

const CourseSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a course title."],
      trim: true,
      maxlength: ["50", "Name cannot be more than 50 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: ["500", "Name cannot be more than 500 characters"],
    },

    weeks: {
      type: String,
      trim: true,
      required: [true, "Please add number of weeks"],
    },

    tuition: {
      type: Number,
      trim: true,
      required: [true, "Please add number of weeks"],
    },

    minimumSkill: {
      type: String,
      trim: true,
      required: [true, "Please add minimum skill"],
      enum: ["beginner", "intermediate", "advanced"],
    },

    isScholarshipAvailable: {
      type: Boolean,
      trim: true,
      default: false,
    },

    bootCamp: {
      type: Schema.ObjectId,
      ref: "BootCamp",
      required: true,
    },

    isDeleted: {
      type: Boolean,
      trim: true,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

// Static method to get average of course tuitions
CourseSchema.statics.getAverageConst = async function (bootCampId) {
  const object = await this.aggregate([
    { $match: { bootCamp: bootCampId } },
    {
      $group: {
        _id: "$bootCamp",
        averageCost: { $avg: "$tuition" },
      },
    },
  ])

  try {
    await this.model("BootCamp").findByIdAndUpdate(bootCampId, {
      averageCost: Math.ceil(object[0].averageCost / 10) * 10,
    })
  } catch (error) {}
}

// Call getAverageCode after save
CourseSchema.post("save", function () {
  this.constructor.getAverageConst(this.bootCamp)
})

// Call getAverageCode after save
CourseSchema.pre("remove", function () {
  this.constructor.getAverageConst(this.bootCamp)
})

module.exports = model("Course", CourseSchema)
