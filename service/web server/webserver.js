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
                    url: "http://localhost:3002/getquestionpart?id=" + query.id,
                    method: "GET"
                },
                (err, respond, body) => {
                    if (err) {
                        console.log('ERROR: Không lấy được dữ liệu');
                        res.setHeader('Content-Type', 'text/plain');
                        res.end("Error 404");
                    } else {
                        var returnData = fM.parseQuestion(body);
                        res.setHeader("Content-type", "text/xml");
                        res.end(returnData);
                    }
                });
            break;
            default:
                fM.DocFile("./sites" + pathname, req, res);
                break;
        }

    } else if (req.method.toUpperCase() == "POST") {

    } else {

    }
}).listen(port, (err) => {
    if (err != null)
        console.log('==> Error: ' + err)
    else
        console.log('Server is starting at port ' + port)
})