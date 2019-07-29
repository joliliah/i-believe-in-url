const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  originalURL: {
    type: String,
    required: true,
  },
  // shortURL: {
  //   type: String,
  //   unique: true,
  // }

}, { 
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  } });

  

module.exports = mongoose.model('URL', urlSchema);
