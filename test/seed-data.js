const User = require('../lib/models/User');
const LongURL = require('../lib/models/LongURL');
const chance = require('chance').Chance();

module.exports = async({ users = 12, longURLs = 10 } = { users: 12, longURLs: 10 }) => {
  const createdUsers = await User.create(
    [...Array(users)].map(() => ({
      username: chance.name(),
      password: 'password'
    }))
  );

  const userLongURL = await LongURL.create({
    user: createdUsers[0]._id,
    longURL: chance.url()
  });

  const createdLongURLs = await LongURL.create(
    [...Array(longURLs - 1)].map(() => ({
      user: chance.pickone(createdUsers)._id,
      LongURL: chance.url()
    }))
  );

  return {
    users: createdUsers,
    longURLs: [userLongURL, ...createdLongURLs],
  };
};
