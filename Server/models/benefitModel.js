const mongoose = require("mongoose");

const benefitSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Une prestation doit avoir un type"],
    trim: true,
  },
  title: {
    type: String,
    unique: true,
    required: [true, "Une prestation doit avoir un titre"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Une prestation doit avoir une description"],
  },
  price: {
    type: Number,
    required: [true, "Une prestation doit avoir un prix"],
  },
});

const Benefit = mongoose.model("Benefit", benefitSchema);

module.exports = Benefit;
