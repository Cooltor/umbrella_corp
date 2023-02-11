const mongoose = require("mongoose");
const slugify = require("slugify");

const benefitSchema = new mongoose.Schema(
  {
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
    slug: String,
    description: {
      type: String,
      trim: true,
      required: [true, "Une prestation doit avoir une description"],
      maxlength: [
        500,
        "Un description doit avoir un maximum de 500 caractères",
      ],
      minlength: [50, "Un description doit avoir un minimum de 50 caractères"],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "La note doit être minimum de 1.0"],
      max: [5, "La note doit être maximum de 5.0"],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.66666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 1,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate reviews
benefitSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "benefit",
  localField: "_id",
});

// DOCUMENT MIDDLEWARE : run before .save() and .create() for Mongoose and not update
benefitSchema.pre("save", function (next) {
  //console.log(this); // this ici est égale au doc sur lequel on est
  this.slug = slugify(this.title, { lower: true });
  next();
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
