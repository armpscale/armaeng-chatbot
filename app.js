const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
require('dotenv').config()

/**
 * use middleware
 */

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * listen connected
 */
app.listen(process.env.PORT, () => {
    console.log('connection on port : ' + process.env.PORT)
})

app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
})

function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.CHANNEL_ACCESS_TOKEN
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}