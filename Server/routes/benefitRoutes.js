const express = require("express");
const benefitController = require("../controllers/benefitController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, benefitController.getAllBenefits)
  .post(benefitController.createBenefit);

router
  .route("/:id")
  .get(benefitController.getBenefit)
  .patch(benefitController.updateBenefit)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    benefitController.deleteBenefit
  );

module.exports = router;

// voir cours pour ajouter router spécifique ( les 5 forfaits les moins cher par ex)
