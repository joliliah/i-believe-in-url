const mongoose = require('mongoose');
const shortid = require('shortid');

const urlSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  originalURL: {
    type: String,
    required: true,
  },
  shortURLId: {
    type: String,
    required: true,
    unique: true
  }
}, { 
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  } 
});

urlSchema.pre('validate', function(next) {
  this.shortURLId = shortid.generate();
  next();
});

module.exports = mongoose.model('URL', urlSchema);
