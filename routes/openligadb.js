var request = require("request");

var router = (app) => {
    app.get("/openligadb/bl1/:year/:teamName", (req, res, next) => {
        request.get(
            {
                url: `http://www.openligadb.de/api/getmatchdata/bl1/${req.params.year}`,
                headers: {
                    accept: "application/json"
                }
            },
            (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    var teamName = req.params.teamName;
                    res.json(filterByTeamName(JSON.parse(body), teamName));
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

var filterByTeamName = (matches, teamName) => {
    return !teamName ? matches : matches.filter((match) => {
        var lcTeamName = teamName.toLowerCase();
        var lcTeam1Name = match.Team1.TeamName.toLowerCase();
        var lcTeam2Name = match.Team2.TeamName.toLowerCase();

        return  match.MatchIsFinished &&
                (lcTeam1Name.includes(lcTeamName) ||
                lcTeam2Name.includes(lcTeamName));
    }).pop() || {};
}

module.exports = router;