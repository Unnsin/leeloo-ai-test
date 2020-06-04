require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const publisher = require('./redis')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.get('/api/v1/track',async (req, res) => {
    let account_id = req.query.account_id
    let url = req.query.url
    let timestamp = Date.now()
    const message = JSON.stringify({ account_id, url, timestamp })
    publisher.rpush(['messageBuf', message])
    publisher.publish(`chanel1`, message)
    res.status(200).send()
})

app.listen(port, () => {
    console.log('Server started on port ' + port)
})