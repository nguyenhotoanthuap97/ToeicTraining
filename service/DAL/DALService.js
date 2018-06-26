const http = require("http");
const qs = require("querystring");
const url = require("url");
const fs = require("fs");
const xml2js = require("xml2js");
const dal = require("/DAL.js");
const {
    port,
    question,
    testbook,
    access_token,
} = require("./config.js");

//Đọc dữ liệu và CacheXMLQuestion
//Đọc dữ liệu 5 bộ đề
let CacheXMLTestBook = '';
CacheXMLTestBook = dal.read(__dirname + "/" + testbook);
let CacheXMLDOMTestBook;
xml2js.parseString(CacheXMLTestBook, (err, result) => {
    if (err) {
        console.log(err + '');
    }
    CacheXMLDOMTestBook = result;
});
//Đọc dữ liệu toàn bộ câu hỏi
let CacheXMLQuestion = '';
CacheXMLTestBook = dal.read(__dirname + "/" + question);
let CacheXMLDOMQuestion;
xml2js.parseString(CacheXMLQuestion, (err, result) => {
    if (err) {
        console.log(err + '');
    }
    CacheXMLDOMQuestion = result;
});

//Server
http.createServer((req, res) => {
    //Xem request
    console.log(req.method, req.url);
    //Set header cho các địa chỉ khác vẫn gửi request đc
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.headers.access_token != access_token) {
        return res.end('deny');
    }
    if (req.method.toLocaleUpperCase() == 'GET') {
        //Decode URL
        const {
            pathname,
            query
        } = URL.parse(req.url, true);

        switch (pathname) {
            case "testbook":
                {
                    if (CacheXMLTestBook === "") {
                        CacheXMLTestBook = dal.readData(__dirname + "/" + testbook);
                        console.log("reread");
                    }
                    res.setHeader("Content-type", "text/xml");
                    res.end(CacheXMLTestBook);
                }
            break;
            case "question":
                {
                    if (CacheXMLQuestion === "") {
                        CacheXMLQuestion = dal.readData(__dirname + "/" + question);
                        console.log("reread");
                    }
                    res.setHeader("Content-type", "text/xml");
                    res.end(CacheXMLQuestion);
                }
            break;
            default:
                res.setHeader("Content-type", "text/xml");
                res.end();
                break;
        }
    } else if (req.method.toLocaleUpperCase() == 'POST') {
        switch (req.url) {
            default: res.setHeader("Content-type", "text/xml");
            res.end();
            break;
        }
    } else {
        return res.end();
    }
}).listen(port, server => {
    console.log("Listen on port ", port);
});