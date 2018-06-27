var http = require('http');
var sitePath = './sites/';
var fs = require('fs');
var port = 3000;

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

	//console.log(`${req.method} ${req.url}`);
	var req_url;
	console.log(req.url);
	if(req.url == '/'){
		req_url= './sites/html/home.html';
	}
	else if(req.url =='/home.html'){
		req_url = './sites/html/home.html';
	}	
	else if(req.url =='/test.html'){
		req_url = './sites/html/test.html';
	}
	else{
		req_url = './sites/'+req.url;
	}
	var file_extension = req.url.lastIndexOf('.');
	var header_type = (file_extension == -1 && req.url != '/') ?
		'text/plain' :
		{
			'/': 'text/html',
			'.html': 'text/html',
			'.ico': 'image/x-icon',
			'.jpg': 'image/jpeg',
			'.png': 'image/png',
			'.gif': 'image/gif',
			'.svg': 'image/svg+xml',
			'.css': 'text/css',
			'.js': 'text/javascript',
			'.woff':'font/woff',
			'.woff2':'font/woff2',
		}[req.url.substr(file_extension)];
	console.log(req.url.substr(file_extension), file_extension);
	fs.readFile( req_url, (err, data) => {
		if (err) {
			console.log('==> Error: ' + err)
			console.log('==> Error 404: file not found ' + res.url)
			res.writeHead(404, 'Not found')
			res.end()
		} else {
			res.setHeader('Content-type', header_type);
			res.end(data);
            console.log(req.url, header_type);
		}
	})
}).listen(port, (err) => {
	if (err != null)
		console.log('==> Error: ' + err)
	else
		console.log('Server is starting at port ' + port)
})