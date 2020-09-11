/** @format */

const { Schema, model } = require("mongoose")

const FileSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: ["50", "Name cannot be more than 50 characters"],
    },

    slug: String,

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: ["500", "Name cannot be more than 50 characters"],
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

module.exports = model("File", FileSchema)
