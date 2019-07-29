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
});
