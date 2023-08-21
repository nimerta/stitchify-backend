const express = require("express");
const router = express.Router();

const { createArea, getAllAreas } = require("../controllers/Area");

router.get("/get-all-areas", getAllAreas);

router.post("/create-area", createArea);

module.exports = router;
