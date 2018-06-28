const http = require('http');
const sitePath = './sites/';
const fs = require('fs');
const fM = require('./functionModule.js');
const url = require("url");
var request = require("request");
const port = 3000;

http.createServer((req, res) => {

    if (req.method.toUpperCase() == "GET") {

        const {
            pathname,
            query,
        } = url.parse(req.url, true);

        switch (pathname) {
            case "/":
            case "/home":
                req.url += ".html";
                fM.DocFile("./sites/html/home.html", req, res);
                break;
            case "/test":
            case "/test.html":
                if (req.url === "/test")
                    req.url += ".html";
                fM.DocFile("./sites/html/test.html", req, res);
                break;
            case "/testbook":
            case "/testbook.html":
                req.url = pathname;
                if (pathname === "/testbook")
                    req.url += ".html";
                fM.DocFile("./sites/html/testbook.html", req, res);
                break;
            case "/question":
            case "/question.html":
                req.url = pathname;
                if (pathname === "/question")
                    req.url += ".html";
                fM.DocFile("./sites/html/question.html", req, res);
                break;
            case "/gettestbookcount":
                request({
                        headers: {
                            "access_token": "",
                        },
                        url: "http://localhost:3002/gettestbookcount",
                        method: "GET"
                    },
                    (err, respond, body) => {
                        if (err) {
                            console.log('ERROR: Không lấy được dữ liệu');
                            res.setHeader('Content-Type', 'text/plain');
                            res.end("Error 404");
                        } else {
                            res.setHeader("Content-type", "text/plain");
                            res.end(body.toString());
                        }
                    });
                break;
            case "/gettestbook":
                request({
                        headers: {
                            "access_token": "",
                        },
                        url: "http://localhost:3002/gettestbook?id=" + query.id,
                        method: "GET"
                    },
                    (err, respond, body) => {
                        if (err) {
                            console.log('ERROR: Không lấy được dữ liệu');
                            res.setHeader('Content-Type', 'text/plain');
                            res.end("Error 404");
                        } else {
                            var returnData = fM.parseTestBook(body);
                            res.setHeader("Content-type", "text/xml");
                            res.end(JSON.stringify(returnData));
                        }
                    });
                break;
            case "/getimage":
                request({
                        headers: {
                            "access_token": "",
                        },
                        url: "http://localhost:3002/getimage?name=" + query.name,
                        method: "GET"
                    },
                    (err, respond, body) => {
                        if (err) {
                            console.log('ERROR: Không lấy được dữ liệu');
                            res.setHeader('Content-Type', 'text/plain');
                            res.end("Error 404");
                        } else {
                            var img = body;
                            res.writeHead(200, {
                                'Content-type': 'image/png'
                            });
                            res.end(img, 'binary');
                        }
                    });
                break;

            case "/getquestionpart":
                request({
                        headers: {
                            "access_token": "",
                        },
                        url: "http://localhost:3002/getquestionpart",
                        method: "GET"
                    },
                    (err, respond, body) => {
                        if (err) {
                            console.log('ERROR: Không lấy được dữ liệu');
                            res.setHeader('Content-Type', 'text/plain');
                            res.end("Error 404");
                        } else {
                            var returnData = fM.parseQuestion(body, 5);
                            res.setHeader("Content-type", "text/xml");
                            res.end(JSON.stringify(returnData));
                        }
                    });
                break;
            case "/getanswersheetpart":
                request({
                        headers: {
                            "access_token": "",
                        },
                        url: "http://localhost:3002/getanswersheetpart?id=" + query.id,
                        method: "GET"
                    },
                    (err, respond, body) => {
                        if (err) {
                            console.log('ERROR: Không lấy được dữ liệu');
                            res.setHeader('Content-Type', 'text/plain');
                            res.end("Error 404");
                        } else {
                            var returnData = fM.parseAnswer(body, query.id);
                            res.setHeader("Content-type", "text/xml");
                            res.end(JSON.stringify(returnData));
                        }
                    });
                break;
            default:
                fM.DocFile("./sites" + pathname, req, res);
                break;
        }

    } else if (req.method.toUpperCase() == "POST") {
        const {
            pathname,
            query,
        } = url.parse(req.url, true);
        switch (pathname) {
            case "/login":
                {
                    request({
                            headers: {
                                "access_token": '',
                                "usn": req.headers.usn,
                                "pw": req.headers.pw,
                            },
                            url: "http://localhost:3001/login",
                            method: "POST"
                        },
                        (err, respond, body) => {
                            if (err) {
                                console.log('ERROR: Không đăng nhập được');
                                res.setHeader('Content-Type', 'text/plain');
                                res.end("Error 404");
                            } else {
                                token = respond.get("token");
                                res.writeHead(200, {
                                    'Content-Type': 'text/plain',
                                    'token': acc.token
                                });
                                res.end();
                            }
                        });
                }
                break;
            default:
                res.setHeader("Content-type", "text/xml");
                res.end();
                break;
        }
    } else {
        return res.end();
    }
}).listen(port, (err) => {
    if (err != null)
        console.log('==> Error: ' + err)
    else
        console.log('Server is starting at port ' + port)
})