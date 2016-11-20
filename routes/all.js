// middleware to use for all requests
var router = function(app) {
    app.use((req, res, next) => {
        console.log("Request [%s]: '%s' (%s)", req.connection.remoteAddress, unescape(req.url), req.headers["user-agent"]);
        next();
    });
}

module.exports = router;
