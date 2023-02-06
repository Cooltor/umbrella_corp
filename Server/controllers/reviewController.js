const Review = require("../models/reviewModel");
// const catchAsync = require('../utils/catchAsync');
const factory = require("./handlerFactory");

exports.setBenefitUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.benefit) req.body.benefit = req.params.benefitId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);