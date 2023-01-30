const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
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
  passwordChangedAt: Date,
  password: {
    type: String,
    required: [true, "Veuillez créer votre mot de passe"],
    minlength: [8, "Un mot de passe doit compter minimum 8 caractères"],
    select: false,
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
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm
  this.passwordConfirm = undefined;
  next();
});

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

const User = mongoose.model("User", userSchema);

module.exports = User;
