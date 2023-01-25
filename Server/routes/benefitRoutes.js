const express = require("express");
const benefitController = require("../controllers/benefitController");

const router = express.Router();

//router.param('id', tourController.checkID);

router
  .route("/")
  .get(benefitController.getAllBenefits)
  .post(benefitController.createBenefit);

router
  .route("/:id")
  .get(benefitController.getBenefit)
  .patch(benefitController.updateBenefit)
  .delete(benefitController.deleteBenefit);

module.exports = router;

// voir cours pour ajouter router spécifique ( les 5 forfaits les moins cher par ex)
