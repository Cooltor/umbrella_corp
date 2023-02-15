const express = require("express");
const benefitController = require("../controllers/benefitController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

const router = express.Router();

// on utilise la route  des reviews pour créer sur l'url des benefits :mergeParams
router.use("/:benefitId/reviews", reviewRouter);

router
  .route("/")
  .get(authController.protect, benefitController.getAllBenefits)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    benefitController.createBenefit
  );

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
