const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.isLoggedIn);

router.get("/", viewsController.getOverview);

router.get("/les-prestations", viewsController.getAllBenefits);

router.get("/les-prestations/:slug", viewsController.getBenefit);

router.get("/documentation", viewsController.getDocumentation);

router.get("/se-connecter", viewsController.getLoginForm);

module.exports = router;
