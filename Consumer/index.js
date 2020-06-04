require('dotenv').config
const express = require('express')
const subscriber = require('./redis')

const app = express()

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server start on port ' + port)
})