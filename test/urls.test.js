const { getAgent, getUsers } = require('./data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('url routes', () => {
  it('user can upload original url and it works', () => {
    return getAgent()
      .post('/api/v1/urls')
      .send({ originalURL: 'http://www.google.com' })
      .then(res => {
        expect(res.body).toEqual({ 
          _id: expect.any(String),
          createdBy: expect.any(String),
          originalURL: 'http://www.google.com'
        });
      });
  });
  
  // get original url by id

  // post 
})