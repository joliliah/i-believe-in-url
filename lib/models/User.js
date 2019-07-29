const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: String,
  passwordHash: String,
}, 
{ 
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
      delete ret.__v;
    }
  } });

// hash passwords before saving 
userSchema.virtual('password').set(function(clearPassword) {
  this.passwordHash = bcrypt.hashSync(clearPassword);
});

// compare passwords
userSchema.methods.compare = function(clearPassword) {
  return bcrypt.compareSync(clearPassword, this.passwordHash);
};

// generate JWT
userSchema.methods.authToken = function() {
  const token = jwt.sign(this.toJSON(), process.env.APP_SECRET, { expiresIn: '24h' });
  return token;
};

// verify JWT
userSchema.statics.findByToken = function(token) {
  const payload = jwt.verify(token, process.env.APP_SECRET);

  return this
    .findOne({ username: payload.username });
};

module.exports = mongoose.model('User', userSchema);
