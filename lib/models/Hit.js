const mongoose = require('mongoose');

const hitSchema = new mongoose.Schema({
  URL: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'URL'
  },
  location: {
    ip: {
      type: String,
      required: true
    },
    country: {
      type: String
    },
    city: {
      type: String
    }
  },
  time: Date
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

hitSchema.statics.locationData = function(id) {
  return this.aggregate([
    { $match: { URL: mongoose.Types.ObjectId(id) } }, 
    { $group: { _id: { url: '$URL', country: '$location.country', city: '$location.city' }, totalHits: { $sum: 1 } } }, 
    { $group: { _id: '$_id.url', totalHits: { $sum: '$totalHits' }, hitsByLocation: { $push: { country: '$_id.country', city: '$_id.city', hits: '$totalHits' } } } }, 
    { $lookup: { from: 'urls', localField: '_id', foreignField: '_id', as: 'shortURLId' } }, 
    { $unwind: { path: '$shortURLId' } }, 
    { $project: { _id: true, shortURLId: true, totalHits: true, hitsByLocation: true } }
  ])
    .then(res => {
      return res[0];
    });
};

module.exports = mongoose.model('Hit', hitSchema);
