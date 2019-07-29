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
  shortURL: shortid.generate()
}, { 
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  } 
});
console.log(urlSchema.shortURL);

// urlSchema.statics.shorten = function(originalURL) {
//   return
// };

  

module.exports = mongoose.model('URL', urlSchema);
