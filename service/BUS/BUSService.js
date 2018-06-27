const http = require("http");
const url = require("url");
const bus = require('./BUS.js');
const {
    port,
    DALService,
    access_token,
} = require("./config.js");

let cache = undefined;

// Login DAL
bus.requestLogin();
console.log("Login hoàn tất!");



//Server
http.createServer((req, res) => {
    /*res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.headers.access_token != access_token) {
        return res.end('Từ chối truy cập!');
    }*/

    //Đọc dữ liệu và lưu cache
    cache = bus.ReadAndSaveCache();

    if (req.method.toUpperCase() == "GET") {
        //Parse URL
        const {
            pathname,
            query
        } = URL.parse(req.url, true);
        switch (pathname) {
            case "/gettestbook":
                {
                    var returnData = bus.splitTestBook(cache.testBook);
                    res.setHeader("Content-type", "text/xml");
                    res.end(JSON.stringify(returnData));
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
}).listen(port, server => {
    console.log("server listen on", port);
})