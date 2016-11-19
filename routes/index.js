var router = (app) => {
	app.get("/", (req, res) => {
		var urls = app._router.stack.filter((r) => {
			return r.route && r.route.path && r.route.path !== "/";
		}).map((r) => {
			return `${req.protocol}://${req.hostname}:${req.socket.localPort}` + r.route.path.replace(/:(\w+)/g, "[$1]");
		});

		res.render("index", {
			"title": `${process.env.npm_package_description}`,
			"urls": urls
		});
	});
}

module.exports = router;
