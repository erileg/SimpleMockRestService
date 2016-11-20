var request = require("request");

var router = function (app) {
    app.get("/openligadb/bl1/:year/:teamName", (req, res, next) => {
        var cachedMatches = matchCache.get(getDaysSinceEpoche());
        var teamName = req.params.teamName;

        if (cachedMatches.length > 0) {
            console.log("using cached match results for season %s", req.params.year);
            res.json(findLatestMatch(cachedMatches, teamName));
        } else {
            console.log("updating match results for season %s", req.params.year);
            fetchMatchData(req.params.year, (matches) => {
                matchCache.put(matches);
                res.json(findLatestMatch(matches, teamName));
            }, (err) => {
                next(err, req, res);
            });
        }
    });
}

var fetchMatchData = function (year, onSuccess, onError) {
    request.get(
        {
            url: `http://www.openligadb.de/api/getmatchdata/bl1/${year}`,
            headers: {
                accept: "application/json"
            }
        }, (err, res, body) => {
            if (!err && res.statusCode == 200) {
                onSuccess(JSON.parse(body));
            } else {
                var error = err || new Error();
                error.message = "Call to openligadb failed";
                error.status = res ? res.statusCode : 500;
                onError(error);
            }
        }
    );
}

var matchCache = {
    fetchDay: 0,
    matches: [],
    put: (matches) => {
        this.matches = matches;
        this.fetchDay = getDaysSinceEpoche();
    },
    get: (daysSinceEpoche) => {
        return (this.fetchDay >= daysSinceEpoche) ? this.matches : [];
    }
}

var findLatestMatch = function (matches, teamName) {
    return !teamName ? matches : matches.filter((match) => {
        var lcTeamName = teamName.toLowerCase();
        var lcTeam1Name = match.Team1.TeamName.toLowerCase();
        var lcTeam2Name = match.Team2.TeamName.toLowerCase();

        return match.MatchIsFinished && (lcTeam1Name.includes(lcTeamName) || lcTeam2Name.includes(lcTeamName));
    }).pop() || {};
}

var getDaysSinceEpoche = function () {
    return Math.floor(new Date() / 8.64e7);
};

module.exports = router;