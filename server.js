// modules
var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");

// read configuration file
var config = JSON.parse(fs.readFileSync("config.json"));

// setup express to use pug template engine
app.set("view engine", "pug");
app.locals.pretty = true;
app.use(express.static(path.join(__dirname, "public")));

// middleware for all requests
require("./routes/all.js")(app);

// init api routes
require("./routes/index.js")(app);
require("./routes/softwarePackage.js")(app);
require("./routes/configuration.js")(app);
require("./routes/openligadb.js")(app);

// error handling
require("./routes/error.js")(app);

// start server
var server = app.listen(config.server.port, config.server.address, () => {
  console.log("Service listening on %s:%s...", server.address().address, server.address().port);
});
