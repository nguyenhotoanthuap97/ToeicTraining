var fs = require("fs");
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;

class DAL {
	readData(path) {
		var xmlString = fs.readFileSync(path, "UTF-8");
		return xmlString;
	}
}

//-------------------
var dal = new DAL;
module.exports = dal;