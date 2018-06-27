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
    //request POST login
    requestLogin() {
        return new Promise((resolve, reject) => {
            request({
                    headers: {
                        "access_token": DAL_access_token,
                    },
                    url: DALService + "/buslogin",
                    method: "POST"
                },
                (err, res, body) => {
                    if (err) {
                        return reject(err);
                    } else {
                        if (body == '') {
                            return reject(new Error('Lỗi: Nội dung phản hồi trống!'))
                        }
                        return resolve(body);
                    }
                }
            );
        })
    }

    //Gửi request cho DAL
    sendRequest(url) {
        return new Promise((resolve, reject) => {
            request({
                    headers: {
                        "access_token": DAL_access_token,
                    },
                    url: url,
                    method: "GET"
                },
                (err, res, body) => {
                    if (err) {
                        return reject(err);
                    } else {
                        if (body == '') {
                            return reject(new Error('Lỗi: Nội dung phản hồi trống!'))
                        }
                        return resolve(body);
                    }
                }
            );
        })
    }

    //Request lấy dữ liệu từ DAL
    //Bộ đề
    readTestBook() {
            let testBook = sendRequest(DALService + requestURL.testbook.read);
            return testBook;
        }
        //Câu hỏi
    readQuestion() {
        let question = sendRequest(DALService + requestURL.question.read);
        return question;
    }

    ReadAndSaveCache() {
        let testbookString = readTestBook();
        let questionString = readQuestion();
        let data = [testbookString, questionString];
        return data;
    }

    //tách dữ liệu
    //Bộ đề thứ id
    splitTestBook(xml, id) {
        var test = xml.getElementsByTagName(Tag.testbook.PHAN_CAU_HOI);

        var textbook = test[0].getElementsByTagName(Tag.testbook.BO_DE);

        var xml = '';

        for (var i = 0; i < textbook.length; i++) {
            if (textbook[i].getAttribute(Attribute.testbook.id) == query.id) {
                xml = textbook[i];
                break;
            }
        }

        var returnData = xml2js.parseString(xml, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            else return result;
        })

        return returnData;
    }
}

var bus = new BUS;
module.exports = bus;
