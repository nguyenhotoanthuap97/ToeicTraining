var http = require('http');
var sitePath = './sites/';
var fs = require('fs');
var port = 3000;

http.createServer((req, res) => {
	if (req.url === '/' || req.url ==='/default' || req.url === '/index') {
		res.writeHead(200, {'Content-Type': 'text/html'});
		fs.readFile('./sites/html/home.html', (err, data) => {
			if (err) throw err;
			res.write(data);
			res.end();
		});
	}
	else {
		fs.readFile('./sites' + req.url, (err, data) => {
			if (err) {	
				res.writeHead(404, {'Content-Type': 'text/html'});
				res.write('404! - File not found!');
				res.end();
				throw err;
				return;
			}
			else {
				res.write(data);
				return res.end();
			}
		});
	}
}).listen(port);