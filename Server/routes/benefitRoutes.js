const express = require("express");
const benefitController = require("../controllers/benefitController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

const router = express.Router();

//router.use("/:tourId/reviews", reviewRouter); // on utilise la route  des reviews pour créer sur l'url des tours it's called mergeParams
router.use("/:benefitId/reviews", reviewRouter);

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
