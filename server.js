// modules
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");

// read configuration
var config = require("./config");

// Connect to MongoDB
mongoose.connect(config.mongodDbUrl);
mongoose.connection.on('error', () => {
  console.log('MongoDB connection error:')
});
mongoose.connection.on('disconnected', () => {  
  console.log('MongoDB default connection disconnected'); 
});

// setup express to use pug template engine
app.set("view engine", "pug");
app.locals.pretty = true;
app.use(express.static(path.join(__dirname, "public")));

// body parser
app.use(bodyParser.json());
// app.use(methodOverride());

// middleware for all requests
require("./routes/all")(app);

// init saleport routes
require("./routes/index")(app);

// openligadb example
require("./routes/openligadb")(app);

// mongoose api
require("./routes/todo")(app);

// error handling
require("./routes/error")(app);

// start server
var server = app.listen(config.server.port, config.server.address, () => {
  console.log("Service listening on %s:%s...", server.address().address, server.address().port);
});
