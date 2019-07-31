require('dotenv').config();

const { getAgent, getHits } = require('./data-helpers');

describe('It is our Hits test', () => {
  it('GET top 10 sites', () => {
    return getAgent()
      .get('/hits/top10')
      .then(res => {
        expect(res.body).toHaveLength(9);
        expect(res.body[0].hitCount).toBeGreaterThan(res.body[8].hitCount);
      });
  });
});
