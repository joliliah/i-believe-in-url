const { getAgent, getUsers } = require('./data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('user auth', () => {
  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ 
        username: 'Joliliah',
        password: 'password'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'Joliliah'
        });
      });
  });

  it('signs in user', async() => {
    const user = getUsers()[0];
    return request(app)
      .post('/api/v1/auth/signin')
      .send({ 
        username: user.username,
        password: 'password'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: expect.any(String),
        });
      });
  });

  it('verify that username and email are correct', async() => {
    return getAgent()
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: expect.any(String),
        });
      });
  });
});
