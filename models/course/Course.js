/** @format */

const { Schema, model } = require("mongoose")

const CourseSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a course title."],
      trim: true,
      maxlength: ["50", "Title cannot be more than 50 characters"],
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

    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
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
CourseSchema.statics.getAverageCost = async function (bootCampId) {
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
  } catch (error) {
    console.trace(error.stack)
  }
}

// Call getAverageCost after save
CourseSchema.post("save", function () {
  this.constructor.getAverageCost(this.bootCamp)
})

// Call getAverageCost after save
CourseSchema.pre("remove", function () {
  this.constructor.getAverageCost(this.bootCamp)
})

module.exports = model("Course", CourseSchema)
