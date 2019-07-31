const { Router } = require('express');
const Hit = require('../models/Hit');

module.exports = Router()
  .get('/top10', (req, res, next) => {
    Hit
      .topSites()
      .then(topten => {
        res.send(topten);
      })
      .catch(next);
  })

  .get('/locationData/:id', (req, res, next) => {
    Hit
      .locationData(req.params.id)
      .then(data => res.send(data))
      .catch(next);
  });
