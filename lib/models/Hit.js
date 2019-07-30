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

hitSchema.statics.topSites = function() {
  return this.aggregate(
    [{ $group: { _id: '$URL', hitCount: { '$sum': 1 } } }, 
      { $lookup: { from: 'urls', localField: '_id', foreignField: '_id', as: 'urls' } },
      { $unwind: { path: '$urls', } }, 
      { $sort: { hitCount: -1 } }, 
      { $limit: 10 }]
  );
};

module.exports = mongoose.model('Hit', hitSchema);
