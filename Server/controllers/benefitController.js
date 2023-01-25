const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const Benefit = require("../models/benefitModel");
const AppError = require("../utils/appError");

exports.getAllBenefits = catchAsync(async (req, res, next) => {
  //EXECUTE THE QUERY
  const features = new APIFeatures(Benefit.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate(); //on peut enchaîner les méthodes parce que l'on return l'obkjet This à chaque fois
  const benefits = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: benefits.lentgh,
    data: {
      benefits: benefits,
    },
  });
});

exports.getBenefit = catchAsync(async (req, res, next) => {
  const benefit = await Benefit.findById(req.params.id);

  if (!benefit) {
    return next(new AppError("No Tour found with that ID", 404));
  }
  // Tour.findOne({_id: req.params.id})   ==> méthode pour find 1 seul doc : équivalent a findById
  res.status(200).json({
    status: "succes",
    data: {
      benefit,
    },
  });
});

exports.createBenefit = catchAsync(async (req, res, next) => {
  const newBenefit = await Benefit.create(req.body); //voir pages

  res.status(201).json({
    status: "success",
    data: {
      tour: newBenefit,
    },
  });
});

exports.updateBenefit = catchAsync(async (req, res, next) => {
  // voir docs et traduire
  // patch méthod n'écrase pas entièrement l'ancien objet

  const benefit = await Benefit.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!benefit) {
    return next(new AppError("No Tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      benefit, //benefit: benefit
    },
  });
});

exports.deleteBenefit = catchAsync(async (req, res, next) => {
  const benefit = await Benefit.findByIdAndDelete(req.params.id);

  if (!benefit) {
    return next(new AppError("No Tour found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
