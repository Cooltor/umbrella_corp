const Benefit = require("../models/benefitModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

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

exports.getBenefit = catchAsync(async (req, res, next) => {
  // 1. Get the data, for the requested tour (including reviews and guides)
  const benefit = await Benefit.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user",
  });

  if (!benefit) {
    return next(new AppError("Il n'y a pas de prestation avec ce titre.", 404));
  }
  // 2. Build template
  // 3. Render template using data from 1.
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("benefit", {
      title: benefit.title,
      benefit,
    });
});

exports.getDocumentation = (req, res) => {
  res.status(200).render("documentation", {
    title: "Documentation",
  });
};

exports.getInformations = (req, res) => {
  res.status(200).render("informations", {
    title: "Informations",
  });
};

exports.getContact = (req, res) => {
  res
    .status(200)
    .set("Content-Security-Policy", "connect-src 'self' https://www.google.com")
    .render("contact", {
      title: "Contact",
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

exports.getAccount = (req, res) => {
  res.status(200).render("account", {
    title: "Votre compte",
  });
};

exports.getSignupForm = (req, res) => {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("signup", {
      title: "S'inscrire",
    });
};

exports.getForgotPassword = (req, res) => {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("forgotPassword", {
      title: "Mot de passe oublié",
    });
};
