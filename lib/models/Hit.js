const mongoose = require('mongoose');

const hitSchema = new mongoose.Schema({
  URL: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'URL'
  },
  ip: {
    type: String,
    required: true
  }
}, 

{ timestamps: true },

{ 
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  } 
});

module.exports = mongoose.model('Hit', hitSchema);
