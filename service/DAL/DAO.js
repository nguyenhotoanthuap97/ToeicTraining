var file = require("fs");
var dataPath = "../data";
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;

class DAO {
	readData() {
		var path = dataPath + "//data.xml";
		var xmlString = file.readFileSync(path, "UTF-8");
		var data = new DOMParser().parseFromString(xmlString, "text/xml").documentElement;
		return data;
	}
}

//-------------------
var dao = new DAO;
module.exports = dao;