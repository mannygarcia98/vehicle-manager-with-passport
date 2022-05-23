const router = require("express").Router();
const passport = require("passport");
const { forwardAuthenticated } = require("../config/auth");

router.get("/", forwardAuthenticated, (req, res) => {
  res.render("login");
  // res.send("login page");
});

router.get("/register", forwardAuthenticated, (req, res) => {
  res.render("register");
  // res.send("register page");
});

module.exports = router;
