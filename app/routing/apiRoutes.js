var friendData = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", (req, res) => {
        res.json(friendData);
    });

    app.post("/api/friends", (req, res) => {
        var userScores = req.body.scores;
        var minDiff = 40;

        for (let i = 0; i < friendData.length; i++) {
            var totalDiff = 0;

            for (let j = 0; j < userScores.length; j++) {
                var diff = Math.abs(friendData[i].scores[j] - userScores[j]);
                totalDiff += diff;
            }

            if(totalDiff < minDiff) {
                minDiff = totalDiff;
                var bestMatch = i;
            }
        }
        
        friendData.push(req.body);
        res.json(friendData[bestMatch]);

    });
};