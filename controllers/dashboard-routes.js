const router = require("express").Router();

const { ensureAuthenticated } = require("../config/auth");
const { Owner, Vehicle } = require("../models");

router.get("/", ensureAuthenticated, (req, res) => {
  // res.render("dashboard");
  res.send("dashboard");
});

module.exports = router;
