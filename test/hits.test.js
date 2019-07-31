require('dotenv').config();

const { getAgent } = require('./data-helpers');

describe('It is our Hits test', () => {
  it('GET top 10 sites', () => {
    return getAgent()
      .get('/hits/top10')
      .then(res => {
        expect(res.body[0].hitCount).toBeGreaterThan(res.body[9].hitCount);
        expect(res.body).toHaveLength(10);
      });
  });
});
