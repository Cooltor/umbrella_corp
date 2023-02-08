const express = require("express");
const viewsController = require("../controllers/viewsController");

const router = express.Router();

router.get("/", viewsController.getOverview);

router.get("/les-prestations", viewsController.getAllBenefits);

router.get("/benefit", viewsController.getBenefit);

router.get("/documentation", viewsController.getDocumentation);

module.exports = router;
