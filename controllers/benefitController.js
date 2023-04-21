const Benefit = require("../models/benefitModel");
//const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

// exports.aliasTopTours = (req, res, next) => {
//   req.query.limit = "5";
//   req.query.sort = "-ratingsAverage,price";
//   req.query.fields = "name,price,ratingsAverage,summary,difficulty";
//   next();
// };

exports.getAllBenefits = factory.getAll(Benefit);
exports.getBenefit = factory.getOne(Benefit, { path: "reviews" });
exports.createBenefit = factory.createOne(Benefit);
exports.updateBenefit = factory.updateOne(Benefit);
exports.deleteBenefit = factory.deleteOne(Benefit);
