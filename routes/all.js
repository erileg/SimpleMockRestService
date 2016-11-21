// middleware to use for all requests
module.exports = app => {
    app.use((req, res, next) => {
        console.log("Request [%s]: '%s' (%s)", req.connection.remoteAddress, unescape(req.url), req.headers["user-agent"]);
        next();
    });
}
