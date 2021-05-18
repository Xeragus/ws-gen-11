const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/cities");

router
  .post("/", controller.create)
  .get("/", controller.fetchAll)

module.exports = router;
