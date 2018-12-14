const express = require('express');
const router = express.Router();
const passport = require('passport');

const { isAuthenticated } = require('../helpers/auth');

const User = require('../models/user');

router.get('/profile', isAuthenticated, (req, res, next) => {
  res.render('profile');
});

module.exports = router;
