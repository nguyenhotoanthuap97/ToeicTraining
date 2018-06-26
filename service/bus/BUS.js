const http = require("http");
const request = require("request");
const xml2js = require("xml2js");
const {
    DALService,
    request,
    Tag,
    Attribute,
    DAL_access_token
} = require('./config')

//Gửi request cho DAL
const sendRequest = (url) => {
    return new Promise((resolve, reject) => {
        request({
                headers: {
                    "access_vvvvtoken": DAL_access_token,
                },
                uri: url,
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

//Request lấy dữ liệu
//
//Lấy bộ đề
const readTestbook = (id) => {
	return new Promise((resolve, reject) => {

	})
}