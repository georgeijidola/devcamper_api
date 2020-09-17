/** @format */

const { Schema, model } = require("mongoose")

const ReviewSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title."],
      trim: true,
      maxlength: ["100", "Title cannot be more than 50 characters"],
    },

    body: {
      type: String,
      trim: true,
      maxlength: ["500", "Name cannot be more than 500 characters"],
    },

    rating: {
      type: Number,
      trim: true,
      min: [1, "Minimum of 1 rating required"],
      max: [5, "Maximum of 5 rating required"],
      required: [true, "Please add rating between 1 and 5"],
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

// Prevent user from submitting more than one preview per boot camp
ReviewSchema.index({ bootCamp: 1, user: 1 }, { unique: true })

// Static method to get average of boot camp ratings
ReviewSchema.statics.getAverageRating = async function (bootCampId) {
  const object = await this.aggregate([
    { $match: { bootCamp: bootCampId } },
    {
      $group: {
        _id: "$bootCamp",
        averageRating: { $avg: "$rating" },
      },
    },
  ])

  try {
    await this.model("BootCamp").findByIdAndUpdate(bootCampId, {
      averageRating: object[0].averageRating,
    })
  } catch (error) {
    console.trace(error.stack)
  }
}

// Call getAverageRating after save
ReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.bootCamp)
})

// Call getAverageRating after save
ReviewSchema.pre("remove", function () {
  this.constructor.getAverageRating(this.bootCamp)
})

module.exports = model("Review", ReviewSchema)
