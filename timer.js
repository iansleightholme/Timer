var t = {
    "offset": 0,
    "preStart": true,
    "isPaused": false,
    "pauseStartTime": null,
    "startTime": null
}

function GetEffectiveLapsedTime()
{
    if (t.preStart)
        return 0;
    else if (t.isPaused)
        return t.pauseStartTime - t.startTime - t.offset;
    else   
        return new Date() - t.startTime - t.offset;
}

function timerPause() {
    if (t.isPaused)
        return;
    t.pauseStartTime = new Date();
    t.isPaused = true;
}

function timerStart() {
    // start and restart
    if (t.preStart) {
        t.preStart = false;
        t.startTime = new Date();
    }
    else if (!t.isPaused)
        return;
    else {
        t.offset += (new Date() - t.pauseStartTime);
        t.pauseStartTime = 0;
    }
    t.isPaused = false;
}

function moveTimer(seconds) {
    t.offset -= seconds * 1000;
    if (new Date() - t.startTime - t.offset < 0)
    {
        t.offset = new Date() - t.startTime;
    }
}