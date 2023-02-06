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
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  console.log(stats);

  const ratingsQuantity = stats[0]?.numRatings ?? 0;
  const ratingsAverage = stats[0]?.avgRating ?? 4.5;

  await Benefit.findByIdAndUpdate(benefitId, {
    ratingsQuantity,
    ratingsAverage,
  });
};

reviewSchema.post("save", function () {
  //this points to current review

  this.constructor.calcAverageRatings(this.benefit); /// contructor vise vers le model actuel
});

reviewSchema.post(/^findOneAnd/, async (doc) => {
  // Affiche zéro pour la quantité de note
  await doc.constructor.calcAverageRatings(doc.benefit);
});
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
