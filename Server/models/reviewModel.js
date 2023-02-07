const mongoose = require("mongoose");
const Benefit = require("./benefitModel");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Un commentaire ne peut pas être vide."],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    benefit: {
      type: mongoose.Schema.ObjectId,
      ref: "Benefit",
      required: [true, "Un commentaire doit être relié à une prestation."],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Un commentaire doit être relié à un utilisateur."],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ benefit: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "benefit",
    select: "title",
  }).populate({
    path: "user",
    select: "name",
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (benefitId) {
  const stats = await this.aggregate([
    {
      $match: { benefit: benefitId },
    },
    {
      $group: {
        _id: "$benefit",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  console.log(stats);

  if (stats.length > 0) {
    await Benefit.findByIdAndUpdate(benefitId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Benefit.findByIdAndUpdate(benefitId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post("save", function () {
  //this points to current review
  this.constructor.calcAverageRatings(this.benefit); /// contructor vise vers le model actuel
});

reviewSchema.post(/^findOneAnd/, async (doc) => {
  // Affiche zéro quand il en reste 1...
  await doc.constructor.calcAverageRatings(doc.benefit);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
