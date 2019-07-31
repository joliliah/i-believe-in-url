const { getAgent, getURLs } = require('./data-helpers');

describe('url routes', () => {
  it('user can upload original url', () => {
    return getAgent()
      .post('/')
      .send({ originalURL: 'http://www.google.com' })
      .then(res => {
        expect(res.body).toEqual({ 
          _id: expect.any(String),
          createdBy: expect.any(String),
          originalURL: 'http://www.google.com',
          shortURLId: expect.any(String)
        });
      });
  });
  
  it('getting short ID reroutes to original', () => {
    const URL = getURLs()[0];
    return getAgent()
      .get(`/${URL.shortURLId}`)
      .then(res => {
        expect(res.text).toEqual(`Found. Redirecting to ${URL.originalURL}`);
      });
  });

  it('get a short id and display number of hits', () => {
    const URL = getURLs()[0];
    return getAgent()
      .get(`/hits/${URL._id}`)
      .then(res => {
        console.log(res.body.hits[0].location)
        expect(res.body).toEqual({
          _id: URL._id,
          originalURL: URL.originalURL,
          shortURLId: URL.shortURLId,
          hits: [{
            URL: URL._id,
            _id: expect.any(String),
            __v: 0,
            location: {
              ip: expect.any(String),
              country: expect.any(String),
              city: expect.any(String)
            },
            time: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          }]
        });
      });
  });
});
