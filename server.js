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

// init all routes
require("./routes/index.js")(app);
require("./routes/softwarePackage.js")(app);
require("./routes/configuration.js")(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// start server
var server = app.listen(config.server.port, config.server.address, () => {
  console.log("Service listening on %s:%s...", server.address().address, server.address().port);
});

// log all requests
server.on('request', (req, resp) => {
  console.log("Request [%s]: '%s' (%s)", req.connection.remoteAddress, req.url, req.headers["user-agent"]);
});
