const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { isValidPassword } = require("mongoose-custom-validators");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Veuillez entrer votre nom"],
      trim: true,
    },
    firstname: {
      type: String,
      required: [true, "Veuillez entrer votre prénom"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Veuillez entrer votre email"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    password: {
      type: String,
      require: [true, "Veuillez entrer votre mot de passe"],
      validate: {
        validator: isValidPassword,
        message:
          "Password doit faire au moins 10 caractères et avoir au moins: 1 majuscule, 1 minuscule, 1 nombre, and 1 caractères spécial.",
      },
    },
    passwordConfirm: {
      type: String,
      required: [true, "Veuillez confirmer votre mot de passe"],
      validate: {
        // This only on CREATE AND SAVE!!!
        validator: function (el) {
          return el === this.password;
        },
        message: "Les mots de passe ne sont pas identiques",
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this point to the current query
  this.find({ active: { $ne: false } });
  next();
});
// Instance method

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT change
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
