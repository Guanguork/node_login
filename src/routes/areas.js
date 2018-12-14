const express = require("express");
const router = express.Router();
const passport = require("passport");

const { isAuthenticated } = require('../helpers/auth');

const Area = require("../models/project");

router.get("/areas", isAuthenticated, (req, res, next) => {
  res.render("areas/areas")
});

module.exports = router;