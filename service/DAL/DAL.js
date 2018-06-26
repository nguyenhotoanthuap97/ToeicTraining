var fs = require("fs");
const xml2js = require("xml2js");
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;

class DAL {
	readData(path) {
		var xmlString = fs.readFileSync(path, "UTF-8");
		var data = new DOMParser().parseFromString(xmlString, "text/xml").documentElement;
		return data;
	}
}

//-------------------
var dal = new DAL;
module.exports = dal;