const mongoose = require("mongoose");

const benefitSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Une prestation doit avoir un type"],
    trim: true,
    maxlength: [
      40,
      "Un type de prestation doir avoir un maximum de 40 caractères",
    ],
    minlength: [
      10,
      "Un type de prestation doir avoir un minimum de 10 caractères",
    ],
  },
  title: {
    type: String,
    unique: true,
    required: [true, "Une prestation doit avoir un titre"],
    maxlength: [
      40,
      "Un titre de prestation doir avoir un maximum de 40 caractères",
    ],
    minlength: [
      10,
      "Un titre de prestation doir avoir un minimum de 10 caractères",
    ],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Une prestation doit avoir une description"],
    maxlength: [255, "Un description doir avoir un maximum de 255 caractères"],
    minlength: [50, "Un description doir avoir un minimum de 50 caractères"],
  },
  price: {
    type: Number,
    required: [true, "Une prestation doit avoir un prix"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

// QUERY MIDDLEWRE
benefitSchema.pre(/^find/, function (next) {
  // avec expressions régulière fonctionne pour ttes méthodes qui commence par find
  // tourSchema.pre('find', function (next) {    // n'affiche que les tours qui ne sont pas secret quand ya query find() mais aussi findById()
  this.start = Date.now();
  next();
});

benefitSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  //console.log(docs);
  next();
});

const Benefit = mongoose.model("Benefit", benefitSchema);

module.exports = Benefit;
