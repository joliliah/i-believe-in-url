const chance = require('chance').Chance();
const geoip = require('geoip-lite');

function ipParser(ip = chance.ip().toString()) {
  const locationObject = geoip.lookup(ip);
  let country;
  let city;

  if(!locationObject || !locationObject.country) {
    country = '';
  } else {
    country = locationObject.country;
  }

  if(!locationObject || !locationObject.city) {
    city = '';
  } else {
    city = locationObject.city;
  }

  return { ip, country, city };
}

module.exports = ipParser;
