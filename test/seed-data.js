const User = require('../lib/models/User');
const URL = require('../lib/models/URL');
const chance = require('chance').Chance();

module.exports = async({ users = 12, URLs = 10 } = { users: 12, URLs: 10 }) => {
  const createdUsers = await User.create(
    [...Array(users)].map(() => ({
      username: chance.name(),
      password: 'password'
    }))
  );

  const userURL = await URL.create({
    user: createdUsers[0]._id,
    originalURL: chance.url()
  });

  const createdURLs = await URL.create(
    [...Array(URLs - 1)].map(() => ({
      user: chance.pickone(createdUsers)._id,
      originalURL: chance.url()
    }))
  );

  return {
    users: createdUsers,
    URLs: [userURL, ...createdURLs],
  };
};
