const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
// const AIMLParser = require('aimlparser')

const app = express()
const port = process.env.PORT || 3000
// const aimlParser = new AIMLParser({ name:'ArmAeng' })
require('dotenv').config()

// aimlParser.load(['./test-aiml.xml'])

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
    console.log('connection on port : ' + port)
})

app.post('/webhook', (req, res) => {
    console.log(req.body)
    let reply_token = req.body.events[0].replyToken
    // reply(reply_token)
    let msg = req.body.events[0].message.text
    reply(reply_token, msg)
    // aimlParser.getResult(msg, (answer, wildCardArray, input) => {
    //     console.log(answer)
    //     reply(reply_token, answer)
    // })
    res.sendStatus(200)
})

function reply(reply_token, msg) {
    console.log("Message : " + msg)
    message = patternReply(msg)
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.CHANNEL_ACCESS_TOKEN
    }
    let body
    if (msg === "FlexBubble") {
        body = JSON.stringify({
            replyToken: reply_token,
            messages: [message]
        })
    } else {
        body = JSON.stringify({
            replyToken: reply_token,
            messages: [{
                type: 'text',
                text: message
            }]
        })
    }
    
    console.log(body)
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log(res.body)
        console.log('status = ' + res.statusCode);
    });
}

function patternReply(msg) {
    let message = ""
    switch (msg) {
        case "สวัสดี":
            message = "ดีจ้าาาาา"
            break;
        case "Hello":
            message = "Hello!"
            break;
        case "เราชอบเธอนะ":
            message = "เราก็ชอบเธอเหมือนกัน"
            break;
        case "FlexBubble":
            message = {
                "type": "bubble",
                "direction": "ltr",
                "styles": {
                    "header": {
                        "backgroundColor": "#ffaaaa",
                    },
                    "body": {
                        "backgroundColor": "#aaffaa",
                        "separator": true,
                        "separatorColor": "#efefef"
                    },
                    "footer": {
                        "backgroundColor": "#aaaaff"
                    }
                },
                "header": {},
                "hero": {},
                "body": {},
                "footer": {}
            }
            break;
        default:
            message = "คิคิ"
    }
    return message
}