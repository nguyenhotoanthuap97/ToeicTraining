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
    giaovien,
    quanly,
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
            console.log(req.url + " " + req.headers.access_token);
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
            case '/question/update':
                {
                    let body = '';

                    req.on('data', function(data) {
                        body += data;
                        if (body.length > 1e6)
                            req.connection.destroy();
                    });

                    req.on('end', function() {
                        let postdata = qs.parse(body);

                        if (postdata.id == undefined ||
                            postdata.part == undefined ||
                            postdata.CacCauHoi == undefined) {
                            res.setHeader("Content-type", "text/xml");
                            return res.end();
                        }

                        let id = postdata.id;
                        let part = postdata.part;
                        let CacCauHoi = postdata.CacCauHoi;
                        let maNguoiDuyet = postdata.maNguoiDuyet;
                        let result = DAL.cauHoiUpdate(pathDataCauHoi, CacheXMLQuestion, part, id, CacCauHoi);
                        res.setHeader("Content-type", "text/xml");
                        res.end(result[1]);
                        CacheXMLQuestion = result[0];
                    });
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
            case "/login":
                {
                    let id = 0;
                    console.log(req.headers.usn);
                    console.log(req.headers.pw);
                    if (req.headers.usn == giaovien.username && req.headers.pw == giaovien.password) {
                        res.writeHead(200, {
                            "Content-type": "text",
                        });
                        var acc = {
                            "token": giaovien.token,
                            "role": giaovien.role
                        };
                        res.end(JSON.stringify(acc));
                    }
                    else if (req.headers.usn == quanly.username && req.headers.pw == quanly.password) {
                        res.writeHead(200, {
                            "Content-type": "text",
                        });
                        var acc = {
                            "token": quanly.token,
                            "role": quanly.role
                        };
                        res.end(JSON.stringify(acc));
                    }
                    else {
                        res.end("sai");
                    }
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