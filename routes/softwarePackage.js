var config = require("../config.js");

module.exports = (app) => {
	var reqCounter = 0;

	var response1 = {
		"softwareDistributionServiceUrl": `${config.sdsUrl}`,
		"packageId": "eKMS-Interaktiv-5.10.b"
	}

	var response2 = {
		"softwareDistributionServiceUrl": `${config.sdsUrl}`,
		"packageId": "EPlakat-5.10.b"
	}

	app.get("/devices/:deviceId/softwarePackageConfiguration", (req, res) => {
		res.json((++reqCounter % 5) == 0 ? response1 : response2);
	});
}
