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

}).listen(port, server => {
	console.log("server listen on", port);
});