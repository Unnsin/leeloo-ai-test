const RedisClient = require('redis').RedisClient
const colors = require('colors/safe')

const port = process.env.REDIS_PORT
const subscriber = new RedisClient({ host: 'localhost', port })
const client = new RedisClient({ host: 'localhost', port })


subscriber.subscribe('chanel1')
client.on('connect', () => {
    client.lrange('messageBuf', 0, -1, (err, replies) => {
        replies.forEach(reply => {
            const parsMessage = JSON.parse(reply)   
            console.log(`[${new Date(parsMessage.timestamp)}]: ${parsMessage.account_id} - ${parsMessage.url}`)
        })
        client.del('messageBuf')
    })
})


subscriber.on('message', (chanel, message) => {
    client.lpop('messageBuf',(err, res) => {
        const parsMessage = JSON.parse(res)
        const date = new Date(parsMessage.timestamp)
        const formatDate = `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]:`
        console.log(colors.green(formatDate) + ` ${parsMessage.account_id} - ${parsMessage.url}`)
    })
})

module.exports = subscriber