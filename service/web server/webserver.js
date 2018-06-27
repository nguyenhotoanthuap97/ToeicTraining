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
                req.url += ".html";
                var quesList = [];
                request({
                        headers: {
                            "access_token": "",
                        },
                        url: "http://localhost:3002/gettestbook?id=" + 3,
                        method: "GET",
                    },
                    (err, respond, body) => {
                        if (err) {
                            console.log('ERROR: Không lấy được danh sách sách');
                            res.setHeader("Content-type", "text/plain");
                            res.end("Err: " + err);
                        } else {
                            quesList = fM.parseTestBook(body);
                            fM.DocFile("./sites/html/test.html", req, res);
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