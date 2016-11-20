var request = require("request");

var router = function (app) {
    app.get("/openligadb/bl1/:year/:teamName", (req, res, next) => {
        var teamName = req.params.teamName;
        var year = req.params.year;

        var cachedMatches = MatchCache.get();

        if (cachedMatches.length > 0) {
            console.log("openligadb service: using cached match results for season %s (%s)", year, new Date(MatchCache.fetchDay * 8.64e7));
            res.json(findLatestMatch(cachedMatches, teamName));
        } else {
            console.log("openligadb service: updating match results for season %s", year);
            fetchMatchData(req.params.year, (matches) => {
                MatchCache.put(matches);
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

var MatchCache = {
    fetchDay: 0,
    matches: [],
    put: function(matches) {
        this.matches = matches;
        this.fetchDay = this.getDaysSinceEpoche();
    },
    get: function() {
        return (this.fetchDay >= this.getDaysSinceEpoche()) ? this.matches : [];
    },
    getDaysSinceEpoche: function () {
        return Math.floor(new Date() / 8.64e7);
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

module.exports = router;