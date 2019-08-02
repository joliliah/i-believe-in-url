const User = require('../models/User');

module.exports = (req, res, next) => {
  const token = req.cookies['session'];

  User
    .findByToken(token)
    .then(user => {
      if(!user) {
        const err = new Error('invalid token');
        err.status = 400;
        return next(err);
      }
      req.user = user;
      next();
    })
    .catch(next);
};
