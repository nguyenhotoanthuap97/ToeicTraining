var fs = require("fs");
var DOMParser = require("xmldom").DOMParser;
const http = require('http');

class DAL {
    readData(path) {
        var xmlString = fs.readFileSync(path, "UTF-8");
        return xmlString;
    }

    DocFile(path, req, res) {
        var file_extension = req.url.lastIndexOf(".");
        var header_type = (file_extension == -1 && req.url != '/') ?
            'text/plain' : {
                '': 'text/html',
                '/': 'text/html',
                '.html': 'text/html',
                '.ico': 'image/x-icon',
                '.jpg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.svg': 'image/svg',
                '.css': 'text/css',
                '.js': 'text/javascript',
                '.map': 'text/css',
            }[req.url.substr(file_extension)];
        fs.readFile(path, (err, data) => {
            if (err) {
                console.log('==> Error: ' + err)
                console.log('==> Error 404: file not found ' + res.url)
                res.writeHead(404, 'Not found')
                res.end()
            } else {
                res.setHeader('Content-type', header_type);
                res.end(data);
            }
        })
    }

}

//-------------------
var dal = new DAL;
module.exports = dal;