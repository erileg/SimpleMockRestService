var xml = require("xml");

var config_json = [{
	"config":[ 
		{"zipcode": 4711},
		{"locationname": "mock location"},
		{"errorimage": "mockerror.png"},
		{"applogo": "http://mock.example.com/mocklogo.png"}
	]
}];

var router = (app) => {
	app.get("/configurations/:deviceId/:componentTemplate", (req, res) => {
		res.set('Content-Type', 'text/xml');
		//res.render("configuration");
		res.send(xml(config_json, { declaration: true, indent: true }));
	});
}

module.exports = router;
