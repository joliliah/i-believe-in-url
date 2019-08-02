require('dotenv').config();
const { getAgent, getURLs } = require('./data-helpers');

describe('It is our Hits test', () => {
  it('GET top 10 sites', () => {
    return getAgent()
      .get('/hits/top10')
      .then(res => {
        expect(res.body[0].hitCount).toBeGreaterThan(res.body[9].hitCount);
        expect(res.body).toHaveLength(10);
      });
  });

  it('GET location data off one site', () => {
    const URL = getURLs()[0];
    return getAgent()
      .get(`/hits/locationData/${URL._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: URL._id.toString(),
          hitsByLocation: [
            { city: res.body.hitsByLocation[0].city, 
              country: res.body.hitsByLocation[0].country, 
              hits: res.body.hitsByLocation[0].hits 
            }
          ], 
          shortURLId: { 
            __v: 0, 
            _id: expect.any(String), 
            originalURL: res.body.shortURLId.originalURL, 
            shortURLId: res.body.shortURLId.shortURLId
          }, 
          totalHits: res.body.totalHits
        });
      });
  });
});
