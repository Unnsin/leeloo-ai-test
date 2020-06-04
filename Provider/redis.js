const RedisClient = require('redis').RedisClient

const redis_port = process.env.REDIS_PORT  || 6379
const publisher = new RedisClient({ host: 'localhost', port: redis_port })

module.exports = publisher