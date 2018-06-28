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

    cauHoiUpdate(pathData, xmlDomBoDe, part, id, CacCauHoi){
        let ds_Cau_Hoi = CacCauHoi.map((item, index) => {
          return {
            $: {
              A: CacCauHoi[index].ndA,
              B: CacCauHoi[index].ndB,
              C: CacCauHoi[index].ndC,
              D: CacCauHoi[index].ndD,
              content: CacCauHoi[index].content,
              id: CacCauHoi.id,
            }
          }
        })

        let Question = {    
            $: {
            'type': "reading",
             'part':part,
            'id': CacCauHoi.id,
             'image':"",
            'audio':"",
            'content':ds_Cau_Hoi.content,
          },
            Choices: [{
            A: ds_Cau_Hoi.A,
            B: ds_Cau_Hoi.B,
            C: ds_Cau_Hoi.C,
            D: ds_Cau_Hoi.D
          }]
        }

        //tim part
        for(let i = 0; i < xmlDomBoDe.part.Question.length; i++){
          if(xmlDomBoDe.part.Question[i].$.id == id){
            xmlDomBoDe.part.Question[i] = Question;
            break;
          }
        }

        var builder = new xml2js.Builder();
        var xmlres = builder.buildObject(xmlDomBoDe);
        fs.writeFileSync(pathData, xmlres, {
          encoding: "utf-8",
          flag: "w"
        });
        return [xmlDomBoDe, xmlres];
      }

}

//-------------------
var dal = new DAL;
module.exports = dal;