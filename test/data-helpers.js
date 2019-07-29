require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const seedData = require('./seed-data');

const prepare = arr => JSON.parse(JSON.stringify(arr));

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

let agent = request.agent(app);
let seededUsers = null;
let seededURLs = null;

beforeEach(async() => {
  const { users, URLs } = await seedData();
  seededUsers = prepare(users);
  seededURLs = prepare(URLs);

  return await agent 
    .post('/api/v1/auth/signin')
    .send({ username: users[0].username, password: 'password' });
});

afterAll(() => {
  return mongoose.connection.close();
});

module.exports = {
  getAgent: () => agent,
  getUsers: () => seededUsers,
  getURLs: () => seededURLs
};
