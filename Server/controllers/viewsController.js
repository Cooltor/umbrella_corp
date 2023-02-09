const Benefit = require("../models/benefitModel");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = (req, res) => {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("overview", {
      title: "Qui sommes-nous ?",
    });
};

exports.getAllBenefits = catchAsync(async (req, res, next) => {
  // 1. Get tour data from collection
  const benefits = await Benefit.find();
  // 2. Build template
  // 3. Render that template using tour data from 1.
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("allBenefits", {
      title: "Les prestations",
      benefits: benefits,
    });
});

exports.getBenefit = catchAsync(async (req, res) => {
  // 1. Get the data, for the requested tour (including reviews and guides)
  const benefit = await Benefit.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user",
  });
  // 2. Build template
  // 3. Render template using data from 1.
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("benefit", {
      title: benefit.name,
      benefit,
    });
});

exports.getDocumentation = (req, res) => {
  res.status(200).render("documentation", {
    title: "Documentation",
  });
};

exports.getLoginForm = (req, res) => {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("login", {
      title: "Se connecter",
    });
};
