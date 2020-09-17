/** @format */

const { Schema, model } = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const UserSchema = Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add first name."],
      trim: true,
      maxlength: ["50", "Fisrt Name cannot be more than 50 characters"],
    },

    lastName: {
      type: String,
      required: [true, "Please add last name."],
      trim: true,
      maxlength: ["50", "Last Name cannot be more than 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Please add an email."],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },

    role: {
      type: String,
      trim: true,
      enum: ["user", "publisher", "admin"],
      default: "user",
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: 6,
      select: false,
    },

    resetPasswordToken: String,

    resetPasswordExpire: Date,

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

// Encrypt password using bcrypt
UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(this.password, salt)

    this.password = hashPassword
  }
})

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

// Match user password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = async function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex")

  // Hash token and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

  return resetToken
}

module.exports = model("User", UserSchema)
