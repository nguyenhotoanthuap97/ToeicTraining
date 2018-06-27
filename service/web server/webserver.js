const http = require('http');
const sitePath = './sites/';
const fs = require('fs');
const fM = require('./functionModule.js');
const url = require("url");
var request = require("request");
const port = 3000;

http.createServer((req, res) => {
    // if (req.url === '/' || req.url ==='/default' || req.url === '/index') {
    // 	res.writeHead(200, {'Content-Type': 'text/html'});
    // 	fs.readFile('./sites/html/home.html', (err, data) => {
    // 		if (err) throw err;
    // 		res.write(data);
    // 		res.end();
    // 	});
    // }
    // else {
    // 	fs.readFile('./sites' + req.url, (err, data) => {
    // 		if (err) {
    // 			res.writeHead(404, {'Content-Type': 'text/html'});
    // 			res.write('404! - File not found!');
    // 			res.end();
    // 			throw err;
    // 			return;
    // 		}
    // 		else {
    // 			res.write(data);
    // 			return res.end();
    // 		}
    // 	});
    // }
    console.log(req.method, req.url);

    if (req.method.toUpperCase() == "GET") {

        const {
            pathname,
            query,
        } = url.parse(req.url, true);
        var req_url = "";
        var dataXml;
        switch (pathname) {
            case "/":
            case "/home":
                fM.DocFile("./sites/html/home.html", req, res);
                break;
            case "/test":
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
                        	dataXml = body;

                        }
                    });
                fM.DocFile("./sites/html/test.html", req, res);
                break;
            default:
                fM.DocFile("./sites/html/error.html", req, res);
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