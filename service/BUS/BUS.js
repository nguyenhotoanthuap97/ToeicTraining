const request = require("request");
const xml2js = require("xml2js");
const {
    DALService,
    requestURL,
    Tag,
    Attribute,
    DAL_access_token,
} = require('./config')

class BUS {

    //Gửi request cho DAL
    sendRequest(url, callback) {
        request({
                headers: {
                    "access_token": DAL_access_token,
                },
                url: url,
                method: "GET"
            },
            (err, res, body) => {
                if (!err && res.statusCode == 200) {
                    return callback(body, false);
                } else {
                    return callback(null, err);
                }
            }
        );
    }

    //request POST login
    requestLogin(callback) {
        request({
                headers: {
                    "access_token": DAL_access_token,
                },
                url: DALService + "/buslogin",
                method: "POST"
            },
            (err, res, body) => {
                if (!err && res.statusCode == 200) {
                    return callback(body, false);
                } else {
                    return callback(null, err);
                }
            }
        );
    }

    //Request lấy dữ liệu từ DAL
    //Bộ đề
    readTestBook() {
            var testBook = this.sendRequest(DALService + requestURL.testbook.read, (body, err) => {
                if (err) {
                    console.log("Err:" + err);
                } else {
                    testBook = body;
                    return testBook;
                }
            });
        }
        //Câu hỏi
    readQuestion() {
        var question = this.sendRequest(DALService + requestURL.question.read, (body, err) => {
            if (err) {
                console.log("Err:" + err);
            } else {
                question = body;
                return question;
            }
        });
    }

    ReadAndSaveCache() {
        return new Promise((resolve, reject) => {
            let testbookString = this.readTestBook();
            console.log(testbookString);
            let questionString = this.readQuestion();
            Promise.all([testbookString, questionString]).then(value => {
                let data = [];
                data[0] = value[0];
                data[1] = value[1];
                return resolve(data);
            }).catch(err => {
                return reject(err);
            })
        });
    }

    //tách dữ liệu
    //Bộ đề thứ id
    splitTestBook(xml, id) {
        var test = xml.getElementsByTagName(Tag.testbook.PHAN_CAU_HOI);

        var textbook = test[0].getElementsByTagName(Tag.testbook.BO_DE);

        var xml = '';

        for (var i = 0; i < textbook.length; i++) {
            if (textbook[i].getAttribute(Attribute.testbook.id) == id) {
                xml = textbook[i];
                break;
            }
        }

        var returnData = xml2js.parseString(xml, (err, result) => {
            if (err) {
                console.log(err);
                return;
            } else return result;
        })

        return returnData;
    }
}

var bus = new BUS;
module.exports = bus;