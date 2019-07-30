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

  it('get by id and return... hit stuff I dunno whatever you wanna call it', async() => {
    const hit = getHits()[0];
    return getAgent()
      .get(`/hits/timestamps/${hit._id}`)
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({
          _id: hit._id,
          URL: hit.URL,
          ip: hit.ip,
          time: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0
        });
      });
  });
});
