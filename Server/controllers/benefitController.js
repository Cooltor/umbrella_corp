const { json } = require("express");
const Benefit = require("./../models/benefitModel");

exports.getAllBenefits = async (req, res) => {
  try {
    const benefits = await Benefit.find();

    res.status(200).json({
      status: "succes",
      results: benefits.length,
      data: {
        benefits,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getBenefit = async (req, res) => {
  try {
    const benefit = await Benefit.findById(req.params.id);
    // Tour.findOne({_id: req.params.id})   ==> méthode pour find 1 seul doc : équivalent a findById
    res.status(200).json({
      status: "succes",
      data: {
        benefit,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createBenefit = async (req, res) => {
  try {
    //const newTour = new Tour({});
    //newTour.save();

    const newBenefit = await Benefit.create(req.body); //voir pages

    res.status(201).json({
      status: "success",
      data: {
        tour: newBenefit,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateBenefit = async (req, res) => {
  // voir docs et traduire
  // patch méthod n'écrase pas entièrement l'ancien objet
  try {
    const benefit = await Benefit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        benefit, //benefit: benefit
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteBenefit = async (req, res) => {
  try {
    await Benefit.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
