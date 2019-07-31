const geoip = require('geoip-lite');
const chance = require('chance').Chance();

const ip = chance.ip().toString();

const geo = geoip.lookup(ip);

console.log(geo);
