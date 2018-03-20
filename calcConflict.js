var parse = require('csv-parse/lib/sync');
var includes = require('array-includes');
var fs = require('fs');
var args = process.argv.slice(2);

if (args.length != 2) {
    console.log("must provide survey file and schedule file")
}

//read the survey file
var survey = fs.readFileSync(args[0]).toString();
var users = parseSurvey(survey);

//read the schedule file
var schedule = fs.readFileSync(args[1]).toString();
var timeslots = parseSchedule(schedule);

//track conflicts
var totalConflicts = 0;
var individualConflicts = [];

//for each user
for (var i = 0; i < users.length; i++) {
    individualConflicts[i] = 0;
    var currUser = users[i].votes;
    // for each timeslot
    for (var j = 0; j < timeslots.length; j++){
        var currSessions = timeslots[j].sessions;
        var conflicts = numConflicts(currUser, currSessions);
        totalConflicts += conflicts;
        individualConflicts[i] += conflicts;
    }
}

console.log("Total Conflicts: " + totalConflicts);
summarize(individualConflicts,5);

function parseSurvey(contents){
    var lines = contents.split("\r\n");

    //process session names
    var sessionNames = parse(lines[0])[0];

    //create the users object
    var users = [];

    for (var i = 1; i < lines.length; i++) {
        var currLine = parse(lines[i])[0];
        var user = {votes: []};
        for (var j = 1; j < currLine.length; j++) {
            if (currLine[j]) {
                user.votes.push(sessionNames[j]);
            }
        }
        users.push(user);
    }

    return users;
}

function parseSchedule(contents) {
    var lines = contents.split("\r\n");

    //create the schedule object
    var timeslots = [];

    for (var i = 0; i < lines.length; i++) {
        var currLine = parse(lines[i])[0];
        var timeslot = {sessions: currLine};
        timeslots.push(timeslot);
    }
    return timeslots;
}

function numConflicts(arr1, arr2){
    var conflicts = 0;
    for (var i = 0; i<arr1.length; i++){
        if(includes(arr2, arr1[i])){
            conflicts++;
        }
    }
    if (conflicts < 1){
        return 0;
    } else {
        return conflicts-1;
    }
}

function summarize(array,num){
    var summary = [];
    for (var i = 0; i<num; i++){
        summary[i]=0;
    }
    for(var i = 0; i<num; i++){
        for (var j = 0; j<array.length; j++){
            if(array[j]==i){
                summary[i]++;
            }
        }
    }
    for (var i = 0; i<num; i++){
        if (summary[i]){
            console.log("Users with " + i + " conflicts: " + summary[i]);
        }
    }
}
