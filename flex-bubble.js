module.exports =
    {
        "type": "bubble",
        "direction": "ltr",
        "styles": {
            "header": {
                "backgroundColor": "#ffaaaa"
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
        "header": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "text",
                    "text": "header"
                }
            ]
        },
        "hero": {
            "type": "image",
            "url": "https://www.linefriends.com/img/img_sec.jpg",
            "size": "full",
            "aspectRatio": "2:1"
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "text",
                    "text": "body"
                },
                {
                    "type": "text",
                    "text": "body"
                }
            ]
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "text",
                    "text": "footer"
                }
            ]
        }
    }