var DEBUG = false;  // watch variables in Chrome developer tools f12
var settings;
var state;
var timer;
var updateInterval =  500;  //   updateInterval is set in milliseconds

function load() {
     // your code goes here
    settings = getActiveSettings();
    
    // async calls
    loadBackground();
    registerClientAsync();

    // set up the state and clock display
    initState();
    initBoard();
    setMode("ready");

    // timer
    update();
    timer = setInterval(update, updateInterval);
}

async function loadBackground() {
    document.body.style="background-image: url(" + getPath('747581329-vector.svg') + "); background-size: cover;";
}

// UI button listener functions
function start() {
    state.preStart = false;
    timerStart();
    setMode("normal");
    update();
}

function play() {
    state.isPaused = false;
    timerStart();
    update();
}

function pause() {
    state.isPaused = true;
    timerPause();
}

function forward(value) {
    moveTimer(value == null ? 20 : value);
    update();
}

function backward() {
    moveTimer(-20);
    update();
}
// end UI buttons 

function initBoard() {
    setDisplayName(settings.displayName);
    setTotalBoards(settings.boardsPerRound * settings.rounds);
    setSummary();
    createBoards(settings.boardsPerRound, settings.boardTime / state.roundTime * 360);
    if (state.average > 0) setAverage(state.average, (1.0 - state.average/state.roundTime) * 360);
    if (settings.overtime > 0) setOvertime(360 * (state.roundTime - 0.5 * settings.overtime) / (state.roundTime));
    setTotalBoards(settings.boardsPerRound * settings.rounds);
    setDuration(state.plan.totalTime);
    setBoard(1);
    setRound(1);
}

function update() {
    elapsed = GetEffectiveLapsedTime() / 1000;
    setProjectedTime(new Date(new Date().getTime() + (state.plan.totalTime- elapsed) * 1000));
    setProgress(elapsed/state.plan.totalTime);

    if (state.preStart || state.isPaused)
        return;

    var item = GetPlanItem(elapsed);
    switch (item.type)
    {
        case "round":
            UpdateRound(item.num, state.roundTime, elapsed - item.start);
            break;
        case "move":
            UpdateMove(item.start + item.length - elapsed);
            break;
        case "break":
            UpdateBreak(item.start + item.length - elapsed);
            break;
        case "farewell":
            setMode('ended', getFarewell());
            clearInterval(timer);
            break;
    }
}

function GetPlanItem(elapsed) {
    for (var i = 0; i < state.plan.items.length; i++)
    {
        var el = state.plan.items[i];
        if (el.type == "farewell" || elapsed < el.start + el.length)
            return el;
    }
}

function UpdateRound(r, time, elapsed) {
    // new round
    if (state.mode != "round")  {
        state.mode = "round";
        state.submodes = [];
        state.currentRoundNumber = r;
        setRound(r);
        setMode("normal");
    }

    // average
    if (time - elapsed < state.average && !state.submodes.includes("average")) {
        state.submodes.push("average");
        setMode("average");
    }
    // overtime
    else if (time - elapsed < settings.overtime && !state.submodes.includes("overtime")) {
        state.submodes.push("overtime");
        setMode("overtime");
    }
    // normal play
    else {
        state.submode = [];
        var b = Math.floor(elapsed / settings.boardTime) + 1 
            + (r - 1) * settings.boardsPerRound;
        if (b > settings.boardsPerRound * r)
            b = settings.boardsPerRound * r;
        if (b != state.currentBoardNumber)
        {
            soundNextBoard(settings.tones);
            state.currentBoardNumber = b;
            setBoard(b);
        }
    }

    setClockTime(time - elapsed);
    setClockHand(elapsed/time * 360);
}

function UpdateMove(remaining) {
    if (state.mode != "move") {
        state.mode = "move";
        setMode("move");
    }

    setClockTime(remaining);
}

function UpdateBreak(remaining) {
    if (state.mode != "break") {
        state.mode = "break";
        if (remaining > 10)
            setMode("break");
        else {
            setMode("break", true);  // 10 second break is endless
            pause();
            forward(remaining);
        }
    }
    setClockTime(remaining);
}