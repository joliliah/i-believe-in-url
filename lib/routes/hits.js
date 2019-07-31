const { Router } = require('express');
const Hit = require('../models/Hit');
// const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .get('/top10', (req, res, next) => {
    console.log(req.body)
    Hit
      .topSites()
      .then(topten => {
        res.send(topten);
      })
      .catch(next);
  });
