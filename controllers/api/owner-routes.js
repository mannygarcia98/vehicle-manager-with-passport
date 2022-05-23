const router = require("express").Router();
const passport = require("passport");
const Owner = require("../../models/Owner");
const { forwardAuthenticated } = require("../../config/auth");
const bcrypt = require("bcrypt");
// /api/owners
router.get("/", (req, res) => {
  Owner.findAll({
    // attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Register
//
router.post("/register", (req, res) => {
  Owner.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  }).then(() => {
    console.log("logged in");
    res.redirect("/");
  });
});

// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", {
//     successRedirect: "https://www.passportjs.org/docs/",
//     failureRedirect: "/",
//     failureFlash: true,
//   })(req, res, next);
// });

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
    // failureFlash: true,
  })(req, res, next);
});

module.exports = router;
