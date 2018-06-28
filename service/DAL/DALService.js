const http = require("http");
const qs = require("querystring");
const url = require("url");
const fs = require("fs");
const dal = require("./DAL.js");
var path = require('path');
var {
    port,
    question,
    testbook,
    access_token,
    Tag,
    Attribute,
} = require("./config.js");

//Đọc dữ liệu vào cache
//Đọc dữ liệu 5 bộ đề
let CacheXMLTestBook = '';
CacheXMLTestBook = dal.readData(__dirname + "/" + testbook);


//Đọc dữ liệu toàn bộ câu hỏi
let CacheXMLQuestion = '';
CacheXMLQuestion = dal.readData(__dirname + "/" + question);

//Server
http.createServer((req, res) => {
    console.log(req.method, req.url);
    //Set header cho các địa chỉ khác vẫn gửi request đc
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (!((url.parse(req.url, true).pathname == "/buslogin" && req.method == "POST") || url.parse(req.url, true).pathname == "/getimage")) {
        if (req.headers.access_token != access_token) {
            console.log("từ chối");
            return res.end('Truy cập từ chối!');
        }
    }

    if (req.method.toLocaleUpperCase() == 'GET') {
        //Parse Url
        const {
            pathname,
            query,
        } = url.parse(req.url, true);

        switch (pathname) {
            case "/gettestbook":
                {
                    if (CacheXMLTestBook === "") {
                        CacheXMLTestBook = dal.readData(__dirname + "/" + testbook);
                        console.log("Đọc lại cache!");
                    }
                    res.setHeader("Content-type", "text/xml");
                    res.end(CacheXMLTestBook);
                }
                break;
            case "/getquestion":
                {
                    if (CacheXMLQuestion === "") {
                        CacheXMLQuestion = dal.readData(__dirname + "/" + question);
                        console.log("Đọc lại cache!");
                    }

                    res.setHeader("Content-type", "text/xml");
                    res.end(CacheXMLQuestion);
                }
                break;
            case "/getimage":
                {
                    var img = fs.readFileSync("./data/image/" + query.name + ".png");
                    res.writeHead(200, {
                        'Content-Type': 'image/png'
                    });
                    res.end(img, 'binary');
                }
                break;
            default:
                res.setHeader("Content-type", "text/xml");
                res.end();
                break;
        }
    } else if (req.method.toLocaleUpperCase() == 'POST') {
        const {
            pathname,
            query,
        } = url.parse(req.url, true);
        switch (pathname) {
            case "/buslogin":
                {
                    access_token = req.headers.access_token;
                    res.setHeader("Content-type", "text");
                    res.end("Login thành công");
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
        console.log('==> Error: ' + err);
    else
        console.log('Server is starting at port ' + port);
});