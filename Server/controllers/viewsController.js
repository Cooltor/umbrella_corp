const Benefit = require("../models/benefitModel");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = (req, res) => {
  res.status(200).render("overview", {
    title: "Qui sommes-nous ?",
  });
};

exports.getAllBenefits = catchAsync(async (req, res, next) => {
  // 1. Get tour data from collection
  const benefits = await Benefit.find();
  // 2. Build template

  // 3. Render that template using tour data from 1.

  res.status(200).render("allBenefits", {
    title: "Les prestations",
    benefits: benefits,
  });
});

exports.getBenefit = (req, res) => {
  res.status(200).render("benefit", {
    title: "Assistance en domotique",
  });
};

exports.getDocumentation = (req, res) => {
  res.status(200).render("documentation", {
    title: "Documentation",
  });
};
