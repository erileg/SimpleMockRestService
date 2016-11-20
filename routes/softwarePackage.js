module.exports = (app) => {
	var reqCounter = 0;

	var response1 = {
		"softwareDistributionServiceUrl": "http://localhost:8080/sds/",
		"packageId": "eKMS-Interaktiv-5.10.a"
	}

	var response2 = {
		"softwareDistributionServiceUrl": "http://localhost:8080/sds/",
		"packageId": "EPlakat-5.10.a"
	}

	app.get("/devices/:deviceId/softwarePackageConfiguration", (req, res) => {
		res.json((++reqCounter % 5) == 0 ? response1 : response2);
	});
}
