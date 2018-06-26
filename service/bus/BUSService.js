const http = require("http");
const url = require("url");
const bus = require('.BUS.js');
const {
    port,
    DALService,
    access_token,
} = require("./config.js");

let cache = undefined;

// Khởi tạo dữ liệu cho Cache
BUS.InitCache(DALService, (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    cache = result;
    console.log("Đã khởi tạo Cache thành công!");
});

//Server
http.createServer((req, res) => {
    //Xem request
    console.log(req.method, req.url);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-type", "text/xml");

    if (req.headers.access_token != access_token) {
        return res.end('Quyền truy cập Từ chối truy cập!');
    }

    if (cache == undefined) {
        console.log("Try again later!");
        res.end();
    }

    if (req.method.toUpperCase() == "GET") {
        //Decode URL
        const {
            pathname,
            query
        } = URL.parse(req.url, true);
        switch (pathname) {
            case "/lay-cau-hoi":
                {
                    let result = BUS.layCauHoi(Cache[cauHoi], query.maCauHoi);
                    res.end(result);
                }
                break;
            case "/lay-danh-sach-cau-hoi":
                {
                    let result = BUS.layDSCauHoi(Cache[cauHoi]);
                    res.end(result);
                }
                break;
            case "/lay-danh-sach-bo-de":
                {
                    let result = BUS.layDSBoDe(Cache[boDe]);
                    res.end(result);
                }
                break;
            case "/lay-bo-de":
                {
                    let result = BUS.layBoDe(Cache[boDe], query.maDe);
                    res.end(result);
                }
                break;
            default:
                return res.end();
                break;
        }
    } else if (req.method.toUpperCase() == "POST") {
        return res.end();
    }
}).listen(port, server => {
    console.log("server listen on", port);
});