const express = require("express");
const benefitController = require("../controllers/benefitController.js");

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
