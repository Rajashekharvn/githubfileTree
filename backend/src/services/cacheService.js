const NodeCache = require('node-cache');
const cache = new NodeCache();

function get(key) { return cache.get(key); }
function set(key, value, ttl) { cache.set(key, value, ttl); }

module.exports = { get, set };
