var request = require("request");

var router = (app) => {
    app.get("/openligadb/bl1/:year", (req, res, next) => {
        request.get(
            {
                url: `http://www.openligadb.de/api/getmatchdata/bl1/${req.params.year}`,
                headers: {
                    accept: "application/json"
                }
            },
            (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    res.set('Content-Type', 'application/json');
                    res.send(body);
                } else {
                    res.status(response.statusCode);
                    var err = new Error("Call to openligadb failed")
                    err.status = response.statusCode;
                    next(err);
                }
            }
        );
    });
}

module.exports = router;