const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const URL = require('../models/URL');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      originalURL
    } = req.body;
    URL
      .create({ createdBy: req.user._id, originalURL })
      .then(url => res.send(url))
      .catch(next);
  })

  .get('/:shortid', (req, res, next) => {
    URL
      .findOne({ shortURLId: req.params.shortid })
      .then(url => {
        res.redirect(url.originalURL);
      })
      .catch(next);

  });
