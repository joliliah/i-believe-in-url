const { getAgent, getUsers, getURLs } = require('./data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('url routes', () => {
  it('user can upload original url', () => {
    return getAgent()
      .post('/api/v1/urls')
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
        expect(res.text).toEqual(`OK. Redirecting to ${URL.originalURL}`);
      });
  });
  // get original url by id

  // post 
})
;
