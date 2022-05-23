const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
// const bcrypt = require("bcrypt");
const path = require("path");
// const routes = require("./controllers/");
const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// const { Owner } = require("./models");
const hbs = exphbs.create({ helpers });
const flash = require("connect-flash");

const app = express();

// Passport Config
require("./config/passport")(passport);

//Middleware
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESS_SECRET,
    cookie: {},
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(require("./controllers/"));

const PORT = process.env.PORT || 3001;

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

//password hash
// $2a$10$JL/4n9H9TeQy9Q4m0Q0W8uUxcToczbhd1RushGrZMyiRFd0TATeR6
