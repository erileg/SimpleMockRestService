var xml = require("xml");

module.exports = (app) => {
	var config_json = [{
		"config":[ 
			{"zipcode": 4711},
			{"locationname": "mock location"},
			{"errorimage": "mockerror.png"},
			{"applogo": "http://mock.example.com/mocklogo.png"}
		]
	}];

	app.get("/configurations/:deviceId/:componentTemplate", (req, res) => {
		res.set('Content-Type', 'text/xml');
		//res.render("configuration");
		res.send(xml(config_json, { declaration: true, indent: true }));
	});
}
