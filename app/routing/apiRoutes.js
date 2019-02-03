// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");
// var waitListData = require("../data/waitinglistData");


function calcDifference(person1, person2) {
    // const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let totalDiff = 0;
    for (let i = 0; i < person1.scores.length; i++) {
        totalDiff += Math.abs(person1.scores[i] - person2.scores[i]);
    }
    return totalDiff;
    // let difference=array1.reduce(reducer, );
}

function findClosestFriend(surveyPerson) {
    let bestDiff = -1;
    let bestFriend = {};
    friends.forEach(friend => {
        let diff = calcDifference(surveyPerson, friend);
        if (bestDiff < 0) {
            bestDiff = diff;
            bestFriend = friend;
        } else if (diff <= bestDiff) {
            bestDiff = diff;
            bestFriend = friend;
        }
    });
    return {
        diff: bestDiff,
        bestFriend: bestFriend
    };
}

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    //   app.get("/api/waitlist", function(req, res) {
    //     res.json(waitListData);
    //   });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the friends array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware
        
        console.log(req.body);
        // Do this at the end so that the person doesn't get compared with themselves
        closestFriendObj=findClosestFriend(req.body)
        friends.push(req.body);
        res.json(closestFriendObj);
        // TODO finish
    });

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    app.post("/api/clear", function (req, res) {
        // Empty out the arrays of data
        friends.length = [];
        // waitListData.length = [];

        res.json({ ok: true });
    });
};
