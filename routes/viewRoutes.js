const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewsController.getOverview);

router.get(
  "/les-prestations",
  authController.isLoggedIn,
  viewsController.getAllBenefits
);

router.get(
  "/les-prestations/:slug",
  authController.isLoggedIn,
  viewsController.getBenefit
);

router.get(
  "/documentation",
  authController.isLoggedIn,
  viewsController.getDocumentation
);

router.get(
  "/informations",
  authController.isLoggedIn,
  viewsController.getInformations
);

router.get("/contact", authController.isLoggedIn, viewsController.getContact);

router.get(
  "/se-connecter",
  authController.isLoggedIn,
  viewsController.getLoginForm
);

router.get("/inscription", viewsController.getSignupForm);

router.get("/mon-compte", authController.protect, viewsController.getAccount);

router.get("/mot-de-passe-oublie", viewsController.getForgotPassword);

module.exports = router;
