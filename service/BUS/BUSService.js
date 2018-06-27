const http = require("http");
const url = require("url");
const bus = require('./BUS.js');
const q = require('q');
var DOMParser = require("xmldom").DOMParser;
const request = require("request");

const {
    port,
    DALService,
    access_token,
    DAL_access_token,
} = require("./config.js");

let cache = undefined;

// Login DAL
bus.requestLogin((err, body) => {
    if (err) {
        console.log(err);
    } else {
        console.log(body);
    }
});

//Server
http.createServer((req, res) => {
    console.log(req.method, req.url);
    /*res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.headers.access_token != access_token) {
        return res.end('Từ chối truy cập!');
    }*/

    if (req.method.toUpperCase() == "GET") {
        //Parse URL
        const {
            pathname,
            query
        } = url.parse(req.url, true);
        switch (pathname) {
            case "/gettestbook":
                {
                    //Đọc dữ liệu và lưu cache
                    if (cache === undefined || (cache != undefined && cache[0] === undefined)) {
                        cache = [];
                        request({
                                headers: {
                                    "access_token": DAL_access_token,
                                },
                                url: "http://localhost:3001/gettestbook",
                                method: "GET"
                            },
                            (err, respond, body) => {
                                if (err) {
                                    console.log('ERROR: Không lấy được dữ liệu');
                                    res.setHeader('Content-Type', 'text/plain');
                                    res.end("Error 404");
                                } else {
                                    if (!cache[0]) {
                                        var data = new DOMParser().parseFromString(body, "text/xml").documentElement;
                                        cache[0] = data;
                                        var returnData = bus.splitTestBook(cache[0], query.id);
                                        res.setHeader("Content-type", "text/xml");
                                        res.end(returnData);
                                    } else {
                                        var returnData = bus.splitTestBook(cache[0], query.id);
                                        res.setHeader("Content-type", "text/xml");
                                        res.end(returnData);
                                    }
                                }
                            });
                    } else {
                        var returnData = bus.splitTestBook(cache[0], query.id);
                        res.setHeader("Content-type", "text/xml");
                        res.end(returnData);
                    }
                }

                break;
            case "/gettestbookcount":
                //Đọc dữ liệu và lưu cache
                if (cache === undefined || (cache != undefined && cache[0] === undefined)) {
                    cache = [];
                    request({
                            headers: {
                                "access_token": DAL_access_token,
                            },
                            url: "http://localhost:3001/gettestbook",
                            method: "GET"
                        },
                        (err, respond, body) => {
                            if (err) {
                                console.log('ERROR: Không lấy được dữ liệu');
                                res.setHeader('Content-Type', 'text/plain');
                                res.end("Error 404");
                            } else {
                                if (!cache[0]) {
                                    var data = new DOMParser().parseFromString(body, "text/xml").documentElement;
                                    cache[0] = data;
                                    var returnData = bus.getTestBookCount(cache[0]);
                                    res.setHeader("Content-type", "text/xml");
                                    res.end(returnData.toString());
                                } else {
                                    var returnData = bus.getTestBookCount(cache[0]);
                                    res.setHeader("Content-type", "text/xml");
                                    res.end(returnData.toString());
                                }
                            }
                        });
                } else {
                    var returnData = bus.getTestBookCount(cache[0]);
                    res.setHeader("Content-type", "text/xml");
                    res.end(returnData.toString());
                }
                break;
            case "/getquestionpart":
                {

                    var partList = cache.question.getElementsByTagName(Tag.question.PHAN);

                    var returnData = '';

                    for (var i = 0; i < partList.length; i++) {
                        if (partList[i].getAttribute(Attribute.question.id) == query.id) {
                            returnData = partList[i];
                            break;
                        }
                    }

                    res.setHeader("Content-type", "text/xml");
                    res.end(returnData);
                }
                break;
            case "/getanswersheettestbook":
                {

                    var answerSheet = cache.testBook.getElementsByTagName(Tag.testbook.PHAN_DAP_AN);

                    var tbAnswer = answerSheet[0].getElementsByTagName(Tag.testbook.BO_DE);

                    var returnData = '';

                    for (var i = 0; i < tbAnswer.length; i++) {
                        if (tbAnswer[i].getAttribute(Attribute.testbook.id) == query.id) {
                            returnData = tbAnswer[i];
                        }
                    }

                    res.setHeader("Content-type", "text/xml");
                    res.end(returnData);
                }
                break;
            case "/getanswersheetpart":
                {
                    var answerSheet = cache.question.getElementsByTagName(Tag.question.PHAN_DAP_AN);

                    var partList = answerSheet[0].getElementsByTagName(Tag.question.PHAN);

                    var returnData = '';

                    for (var i = 0; i < partList.length; i++) {
                        if (partList[i].getAttribute(Attribute.question.id) == query.id) {
                            returnData = partList[i];
                        }
                    }

                    res.setHeader("Content-type", "text/xml");
                    res.end(returnData);
                }
                break;

            default:
                res.setHeader("Content-type", "text/xml");
                res.end();
                break;
        }
    } else if (req.method.toUpperCase() == "POST") {
        return res.end();
    }
}).listen(port, (err) => {
    if (err != null)
        console.log('==> Error: ' + err);
    else
        console.log('Server is starting at port ' + port);
})