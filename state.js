// initState is part of load
function initState() {
    state = getEmptyState();
    state.roundTime = settings.boardsPerRound * settings.boardTime + settings.overtime;
    state.average = getAverage();
    state.plan = getPlan();
}

function getAverage() {
    if (!settings.average)
        return 0;
    else if (settings.averageOption == "percent")
        return Math.floor(settings.averagePercent * settings.boardTime / 100);
    else if (settings.averageSeconds > 0)
        return settings.averageSettings;
    else
        return 0;
}

function getEmptyState() {
    return {
        "isPaused": false,
        "preStart": true,
        "mode": "",
        "submodes": [],
        "plan": null,   // array of start and end times
        "average": 0,
        "roundTime": 0,
        "currentBoardNumber": 0,
        "currentRoundNumber": 0
    };
}

function getPlan() {
    var plan = { "totalTime": 0, "items" : [] };
    var items = plan.items;
    var sum = 0;
    for (var i = 1; i <= settings.rounds; i++) {
        items.push({ "type": "round", "num": i, "start": sum, "length": state.roundTime});
        sum += state.roundTime;
        if (settings.pause && i % settings.pauseAfterRound == 0
            && (i == settings.pauseAfterRound || settings.pauseRepeat)) {
                var t = settings.pauseTime > 5 ? settings.pauseTime : 5 ; 
                items.push({ "type": "break", "start": sum, "length": t});
                sum += t;
            }
        if (i != settings.rounds) {
            items.push({ "type": "move", "start": sum, "length": settings.moveTime});
            sum += settings.moveTime;
        }
        else
            items.push({ "type": "farewell" });
    }
    plan.totalTime = sum;
    return plan;
}
