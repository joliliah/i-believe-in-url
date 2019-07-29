const mongoose = require('mongoose');

const shortURLSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  longURL: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LongURL'
  },
  URL: {
    type: String,
    required: true
  }
}, { 
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  } });

module.exports = mongoose.model('ShortURL', shortURLSchema);
