const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const URL = require('../models/URL');
const Hit = require('../models/Hit');
const ipParser = require('../utils/ipParser');

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
        const splitIp = req.ip.split(':')[3].toString();
        Hit
          .create({ 
            URL: url._id, 
            location: ipParser(splitIp)
          });
        res.redirect(url.originalURL);
      })
      .catch(next);
  })
  .get('/hits/:id', (req, res, next) => {
    Promise.all([
      URL
        .findById(req.params.id),
      Hit
        .find({ URL: req.params.id })
    ])
      .then(([url, hits]) => {
        res.send({ ...url.toJSON(), hits });
      })
      .catch(next);
  });
