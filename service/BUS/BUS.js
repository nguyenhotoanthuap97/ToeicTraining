const request = require("request");
var XMLSerializer = require("xmldom").XMLSerializer;
const {
    DALService,
    requestURL,
    Tag,
    Attribute,
    DAL_access_token,
} = require('./config');

class BUS {

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

        var oSerializer = new XMLSerializer();
        var xmlString = oSerializer.serializeToString(xml);

        return xmlString;
    }

    //Lấy số lượng đề
    getTestBookCount(xml) {
        var test = xml.getElementsByTagName(Tag.testbook.PHAN_CAU_HOI);
        var textbook = test[0].getElementsByTagName(Tag.testbook.BO_DE);
        return textbook.length;
    }
}

var bus = new BUS;
module.exports = bus;