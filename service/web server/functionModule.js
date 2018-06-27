const request = require("request");


class functionModule {

    readTestBook(id) {
    	var data = this.sendRequest("https://localhost:3002/gettestbook?id=" + id);
    	console.log(data);
    }
}

var fM = new functionModule;

module.exports = fM;