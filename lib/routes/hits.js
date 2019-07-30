const { Router } = require('express');
const Hit = require('../models/Hit');
// const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .get('/top10', (req, res, next) => {
    Hit
      .topSites()
      .then(topten => {
        res.send(topten);
      })
      .catch(next);
  })
  .get('/timestamps/:id', (req, res, next) => {
    Hit
      .findById(req.params.id)
      .then(timestamps => res.send(timestamps))
      .catch(next);
  });
