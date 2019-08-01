const { Router } = require('express');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      username,
      password,
    } = req.body;

    User
      .create({ username, password })
      .then(user => {
        const token = user.authToken();
        res.cookie('session', token);
        //TO DO: CHANGING THIS CODE
        res.send(user);
      })
      .catch(next);
  })

  .post('/signin', (req, res, next) => {
    const {
      username,
      password
    } = req.body;

    User.findOne({ username })
      .then(user => {
        if(!user) {
          const err = new Error('Invalid username/password');
          err.status = 401;
          return next(err);
        }

        const isValidPassword = user.compare(password);

        if(isValidPassword) {
          const token = user.authToken();
          res.cookie('session', token);
          res.send(user);
        } else {
          const err = new Error('Invalid username/password');
          err.status = 401;
          next(err);
        }
      });
  })

  .get('/signout', (req, res, next) => {
    if(req.session) {
      req.session.destroy((err) => {
        if(err) {
          return next(err);
        } else { return res.redirect('/signin'); }
      });
    }
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });

