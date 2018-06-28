var fs = require("fs");
var DOMParser = require("xmldom").DOMParser;

class functionModule {

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
                '.woff': 'font/woff',
                '.woff2': 'font/woff2',
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

    parseTestBook(data) {
        var xml = new DOMParser().parseFromString(data, "text/xml").documentElement;

        var list = xml.getElementsByTagName("Part");
        var quesList = {
            part5,
            part6,
            part7,
        };
        var part5 = [];
        var part6 = [];
        var part7 = [];
        var part;
        for (var i = 0; i < list[0].getElementsByTagName("Question").length; i++) {
            part = 5;
            var root = list[0].getElementsByTagName("Question")[i];
            var id = root.getAttribute("id");
            var nd = root.getAttribute("content");
            var choice = root.getElementsByTagName("Choices");
            var ndA = choice[0].getElementsByTagName("A")[0].childNodes[0].nodeValue;
            var ndB = choice[0].getElementsByTagName("B")[0].childNodes[0].nodeValue;
            var ndC = choice[0].getElementsByTagName("C")[0].childNodes[0].nodeValue;
            var ndD = choice[0].getElementsByTagName("D")[0].childNodes[0].nodeValue;
            part5.push(new CauHoi(id, part, nd, ndA, ndB, ndC, ndD));
        }

        for (var pos = 2; pos < 4; pos++) {
            for (var i = 0; i < list[pos - 1].getElementsByTagName("Question").length; i++) {
                part = pos + 4;
                var root = list[pos - 1].getElementsByTagName("Question")[i];
                var paragraph = root.getAttribute("paragraph");
                var img = root.getAttribute("image");
                var listQues = [];
                var choice = root.getElementsByTagName("Choices");
                for (var j = 0; j < choice.length; j++) {
                    var id = choice[j].getAttribute("id");
                    var ndA = choice[j].getElementsByTagName("A").nodeValue;
                    var ndB = choice[j].getElementsByTagName("B").nodeValue;
                    var ndC = choice[j].getElementsByTagName("C").nodeValue;
                    var ndD = choice[j].getElementsByTagName("D").nodeValue;
                    if (part == 7) {
                        var nd = choice[j].getAttribute("question");
                        listQues.push(new CauHoi(id, part, nd, ndA, ndB, ndC, ndD));
                    } else {
                        listQues.push(new CauHoi(id, part, "", ndA, ndB, ndC, ndD));
                    }
                }
                if (part == 7) {
                    part7 = {
                        paragraph,
                        img,
                        listQues
                    };
                } else {
                    part6 = {
                        paragraph,
                        img,
                        listQues
                    };
                }
            }
        }
        quesList.part5 = part5;
        quesList.part6 = part6;
        quesList.part7 = part7;
        return quesList;
    }
    parseQuestion(data, p) {
        var xml = new DOMParser().parseFromString(data, "text/xml").documentElement;

        var list = xml.getElementsByTagName("Part");
        var part5 = [];
        var part;
        if (p === 5) {
            for (var i = 0; i < list[0].getElementsByTagName("Question").length; i++) {
                part = 5;
                var root = list[0].getElementsByTagName("Question")[i];
                var id = root.getAttribute("id");
                var nd = root.getAttribute("content");
                var choice = root.getElementsByTagName("Choices");
                var ndA = choice[0].getElementsByTagName("A")[0].childNodes[0].nodeValue;
                var ndB = choice[0].getElementsByTagName("B")[0].childNodes[0].nodeValue;
                var ndC = choice[0].getElementsByTagName("C")[0].childNodes[0].nodeValue;
                var ndD = choice[0].getElementsByTagName("D")[0].childNodes[0].nodeValue;
                part5.push(new CauHoi(id, part, nd, ndA, ndB, ndC, ndD));
            }
        }
        if (p === 6 || p === 7) {
            for (var pos = 2; pos < 4; pos++) {
                for (var i = 0; i < list[pos - 1].getElementsByTagName("Question").length; i++) {
                    part = pos + 4;
                    var root = list[pos - 1].getElementsByTagName("Question")[i];
                    var paragraph = root.getAttribute("paragraph");
                    var img = root.getAttribute("image");
                    var listQues = [];
                    var choice = root.getElementsByTagName("Choices");
                    for (var j = 0; j < choice.length; j++) {
                        var id = choice[j].getAttribute("id");
                        var ndA = choice[j].getElementsByTagName("A").nodeValue;
                        var ndB = choice[j].getElementsByTagName("B").nodeValue;
                        var ndC = choice[j].getElementsByTagName("C").nodeValue;
                        var ndD = choice[j].getElementsByTagName("D").nodeValue;
                        if (part == 7) {
                            var nd = choice[j].getAttribute("question");
                            listQues.push(new CauHoi(id, part, nd, ndA, ndB, ndC, ndD));
                        } else {
                            listQues.push(new CauHoi(id, part, "", ndA, ndB, ndC, ndD));
                        }
                    }
                    if (part == 7) {
                        part7 = {
                            paragraph,
                            img,
                            listQues
                        };
                    } else {
                        part6 = {
                            paragraph,
                            img,
                            listQues
                        };
                    }
                }
            }
        }

        return part5;
    }
    parseAnswer(data, p) {
        var xml = new DOMParser().parseFromString(data, "text/xml").documentElement;

        var list = xml.getElementsByTagName("part");
        var pList = [];
        if (p === 5) {
            for (var i = 0; i < list[0].getElementsByTagName("Answer").length; i++) {
                part = 5;
                var root = list[0].getElementsByTagName("Answer")[i];
                var id = root.getAttribute("id");
                var ans = root.nodeValue;
                pList.push(id, nd);
            }
        }
        if (p === 6 || p === 7) {
            for (var i = 0; i < list[0].getElementsByTagName("paragraph").length; i++) {
                var root = list[0].getElementsByTagName("paragraph")[i];
                var paraId = root.getAttribute("id");
                var listAns = [];
                var choice = root.getElementsByTagName("Answer");
                for (var j = 0; j < choice.length; j++) {
                    var id = choice[j].getAttribute("id");
                    var ans = choice[j].nodeValue;
                    listAns.push(id, ans);
                }
                pList.push(paraId, listAns);
            }
        }
        return pList;
    }
}

function CauHoi(id, part, noidung, ndA, ndB, ndC, ndD) {
    this.id = id;
    this.noidung = noidung;
    this.part = part;
    this.ndA = ndA;
    this.ndB = ndB;
    this.ndC = ndC;
    this.ndD = ndD;
}

function DapAn(id, part, da, paragraph) {
    this.id = id;
    this.part = part;
    this.da = da;
    this.paragraph = paragraph;
}

var fM = new functionModule;

module.exports = fM;