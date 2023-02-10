const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.isLoggedIn);

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

router.get("/contact", authController.isLoggedIn, viewsController.getContact);

router.get(
  "/se-connecter",
  authController.isLoggedIn,
  viewsController.getLoginForm
);

router.get("/inscription", viewsController.getSignupForm);

router.get("/mon-compte", authController.protect, viewsController.getAccount);

module.exports = router;
