var fs = require("fs");
var DOMParser = require("xmldom").DOMParser;

class functionModule {

    DocFile(path, req, res) {
        var file_extension = req.url.lastIndexOf('.');
        var header_type = (file_extension == -1 && req.url != '/') ?
            'text/plain' : {
                '/': 'text/html',
                '.html': 'text/html',
                '.ico': 'image/x-icon',
                '.jpg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.css': 'text/css',
                '.js': 'text/javascript'
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

    parseTestBook(xml) {
        var Testbook = {
            id: "",
            QuestionPart5: [],
            QuestionPart6: [],
            QuestionPart7: [],
        };

        var QuestionPart5 = {
            id: "",
            content: "",
            A: {
                status: "",
                value: "",
            },
            B: {
                status: "",
                value: "",
            },
            C: {
                status: "",
                value: "",
            },
            D: {
                status: "",
                value: "",
            },
        }

        var QuestionPart6 = {
            id: "",
            paragraph: "",
            image: "",
            Choices: [],
        }

        var ChoicesPart6 = {
            id: "",
            A: {
                status: "",
                value: "",
            },
            B: {
                status: "",
                value: "",
            },
            C: {
                status: "",
                value: "",
            },
            D: {
                status: "",
                value: "",
            },
        }

        var QuestionPart7 = {
            id: "",
            paragraph: "",
            image: "",
            Choices: [],
        }

        var ChoicesPart7 = {
            id: "",
            Question: "",
            A: {
                status: "",
                value: "",
            },
            B: {
                status: "",
                value: "",
            },
            C: {
                status: "",
                value: "",
            },
            D: {
                status: "",
                value: "",
            },
        }

        var data = new DOMParser().parseFromString(xml, "text/xml").documentElement;

        var PartList = data.getElementsByTagName("Part");

        Testbook.id = data.getAttribute("id");

        for (var i = 0; i < PartList.length; i++) {
            var Part =
        }

    }



}

var fM = new functionModule;

module.exports = fM;