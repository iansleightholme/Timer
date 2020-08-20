var DEBUG = false;
var updateInterval = 500;  //   updateInterval is set in milliseconds
var timer;
var settings;
var state;

function load() {
    // your code goes here
    settings = getActiveSettings();
    setDisplayName(settings.displayName);
    setTotalBoards(settings.boardsPerRound * settings.rounds);
    setSummary();

    // async calls
    loadBackground();
    registerClientAsync();

    initState();
    update();
    timer = setInterval(update, updateInterval);
}

async function loadBackground() {
    document.body.style="background-image: url('747581329-vector.svg'); background-size: cover;";
}

// initState is part of load
function initState() {
    state = getEmptyState();
    //state.blnPauseAfterRoundN = settings.pause;
    //if (DEBUG) alert("blnPauseAfterRoundN " + state.blnPauseAfterRoundN + ",  settings.pauseAfterRound " + settings.pauseAfterRound);

    state.normalPlayTime = settings.boardsPerRound * settings.boardTime;
    // overtimeInSeconds needs to be calculated as yet 18/10/2019
    state.overtimeInSeconds = settings.overtime;
    // ensure averaging cannot be less than a board and overtime is sensible
    if (DEBUG) alert(state.overtimeInSeconds);
    if (state.overtimeInSeconds > settings.boardTime) { state.overtimeInSeconds = settings.boardTime };

    state.overtimePlusPlayTime = state.normalPlayTime + state.overtimeInSeconds;
    state.roundTime = settings.boardsPerRound * settings.boardTime + state.overtimeInSeconds;
    state.thisRoundToGo = state.roundTime;
    state.degreesPerBoard = settings.boardTime / state.roundTime * 360;
    state.actualAverageSeconds = 0;
    if (settings.averageOption == "percent" )
        state.actualAverageSeconds = settings.boardTime * settings.averagePercent / 100;
    else
        state.actualAverageSeconds = settings.averageSeconds;
    if (state.actualAverageSeconds < settings.boardTime)
        state.actualAverageSeconds = settings.boardTime;

    state.totalSessionSeconds = settings.rounds * (state.roundTime + settings.moveTime) - settings.moveTime;
    state.totalSessionMinutes = state.totalSessionSeconds / 60;
    state.currentBoardNumber = 1;
    state.currentRoundNumber = 1;
    state.blnFirstAttempt = true;
    state.blnChangedColour = true;
}

function start() {
    // your code goes here
    setClockHand(0);
    if (state.overtimeInSeconds > 0)
        setOvertime(360 * (state.roundTime - 0.5 * state.overtimeInSeconds) / (state.roundTime));
    createBoards(settings.boardsPerRound, state.degreesPerBoard);
    setBoard(state.currentBoardNumber);
    setRound(state.currentRoundNumber);
    // only if average  actually required go through set average
    if (settings.average) {
        minsAverage = Math.floor(state.actualAverageSeconds / 60);
        secsAverage = state.actualAverageSeconds % 60;
        setAverage(minsAverage + ":" + toTwoDigitString(secsAverage), 360 * (1 - state.actualAverageSeconds / state.roundTime));
    }
    setProjectedTime(state.projectedFinishTime.getHours() + ":" + toTwoDigitString(state.projectedFinishTime.getMinutes()));
    state.preStart = false;
    setMode('normal')
}

// called once and repeats until such time as the timer interval is cleared.
function update() {
    // your code goes here
    if (state.preStart)
    {
        state.startTime = new Date();
        state.projectedFinishTime = addMinutesToDate(state.startTime, state.totalSessionMinutes);    
        setProjectedTime(state.projectedFinishTime.getHours() + ":" + toTwoDigitString(state.projectedFinishTime.getMinutes()));
        return;
    }
    else if (state.blnFirstAttempt) {
        var safetyCountDown = 20000;
        state.startTime = new Date();
        state.projectedFinishTime = addMinutesToDate(state.startTime, state.totalSessionMinutes);
        setMode("normal", true);
        state.blnFirstAttempt = false;
        state.perUnitTimeGone = 0.0;
        setProgress(state.perUnitTimeGone);
        soundNextBoard(settings.tones);
    }
    else {
        //possibilities are normal mid round play, averaging, overtime, move time, paused, fast forward, back 
        state.perUnitTimeGone = calcPerUnitTimeGone();
        setProgress(state.perUnitTimeGone);
        if (state.blnPaused || state.blnOnBreak) {
            state.projectedFinishTime = addMillisecondsToDate(state.projectedFinishTime, updateInterval);
            setProjectedTime(state.projectedFinishTime.getHours() + ":" + toTwoDigitString(state.projectedFinishTime.getMinutes()));
            return;
        }
        state.thisRoundToGo = state.thisRoundToGo - updateInterval / 1000;
        safetyCountDown = safetyCountDown - 1;
        if (safetyCountDown < 1)
        // should stop for testing
            return;
        //calcBarLength();
    }

    setProjectedTime(state.projectedFinishTime.getHours() + ":" + toTwoDigitString(state.projectedFinishTime.getMinutes()));
    // check end of board, overtime, round limits
    //either move on to the next round or go to move time or finish
    if (state.thisRoundToGo < 0) {
        if (state.currentRoundNumber >= settings.rounds || state.thisRoundToGo < -settings.moveTime)
            nextRound();
        else if (state.thisRoundToGo < 0) {
            if (settings.pause && (
                state.currentRoundNumber == settings.pauseAfterRound
                || (settings.pauseRepeat && state.currentRoundNumber % settings.pauseAfterRound == 0))) {
                state.blnPaused = true;
                if (DEBUG) alert("blnPauseAfterRoundN " + state.blnPauseAfterRoundN + ",  currentRoundNumber " + state.currentRoundNumber + ", settings.pauseAfterRound" + settings.pauseAfterRound);
                pause();
                state.blnOnBreak = true;
                goToBreak();
            }
            else
                moving(-state.thisRoundToGo);
        }
    }
    else {
        if (state.thisRoundToGo < state.actualAverageSeconds && settings.average && state.thisRoundToGo > state.overtimeInSeconds) {
            setMode("average");
        }
        if (state.thisRoundToGo < state.overtimeInSeconds) {
            setMode("overtime", true);
        }
        else {
            var boardBeingPlayed = Math.ceil((state.roundTime - state.thisRoundToGo) / settings.boardTime);
            if (boardBeingPlayed > state.currentBoardNumber) {
                // "current board " + currentBoardNumber + ", boardBeingPlayed " + boardBeingPlayed);
                state.currentBoardNumber = state.currentBoardNumber + 1;
                setBoard(state.currentBoardNumber);
                soundNextBoard(settings.tones);
            }
        }

        // your code goes here after start has been pressed at the interval set by the timer - started out at every half second
        var date = new Date();
        //test used actual time, in reality needs time remaining for round
        setClockHand(360 * (state.roundTime - state.thisRoundToGo) / state.roundTime);
        setClockTime(state.thisRoundToGo);
    }
}

function nextRound() {
    state.currentRoundNumber++;
    if (state.currentRoundNumber > settings.rounds) {
        if (DEBUG) alert("reached the end - should stop!");
        clearInterval(timer);
        setMode('ended', getFarewell());
        return;
    }
    else {
        state.currentBoardNumber = 1;
        setMode('normal');
        setBoard(state.currentBoardNumber);
        setRound(state.currentRoundNumber);
        state.thisRoundToGo = state.roundTime;
        degreesPerBoard = settings.boardTime / state.roundTime * 360;
        // createBoards(settings.boardsPerRound, state.degreesPerBoard);
        setClockHand(0);
        soundNextBoard(settings.tones);
        // if (settings.average) {
        //     setAverage(state.minsAverage + ":" + toTwoDigitString(state.secsAverage), 360 * (1 - state.actualAverageSeconds / state.roundTime));
        // }
    }
}

function backward() {
    // your code goes here
    // last board, move or last round
    // var originalThisRoundToGo = state.thisRoundToGo;
    var originalTimeLeftToGo = (state.roundTime + settings.moveTime) * (settings.rounds - state.currentRoundNumber) - settings.moveTime - (state.roundTime - state.thisRoundToGo);
    var boardActuallyReached = settings.boardsPerRound * (state.currentRoundNumber - 1) + state.currentBoardNumber;
    var roundToGoAtStartOfCurrentBoard = state.roundTime - settings.boardTime * (state.currentBoardNumber - 1);
    
    if (roundToGoAtStartOfCurrentBoard - state.thisRoundToGo > 5 || state.boardActuallyReached == 1)
        //just restart last board
        state.thisRoundToGo = roundToGoAtStartOfCurrentBoard;
    else
    {
        //go back one board
        boardActuallyReached--;
        state.currentRoundNumber = 1 + Math.floor((boardActuallyReached-1)/settings.boardsPerRound);
        state.currentBoardNumber = 1 + (boardActuallyReached % settings.boardsPerRound);
        state.thisRoundToGo = state.roundTime - settings.boardTime * (state.currentBoardNumber - 1);
    }

    setClockHand(360 * (state.roundTime - state.thisRoundToGo) / state.roundTime);
    setClockTime(state.thisRoundToGo);
    setMode('normal');
    setBoard(state.currentBoardNumber);
    setRound(state.currentRoundNumber);
    // createBoards(settings.boardsPerRound, state.degreesPerBoard);
    
    // if (settings.average)
    //     setAverage(state.minsAverage + ":" + toTwoDigitString(state.secsAverage), 360 * (1 - state.actualAverageSeconds / state.roundTime));
    var revisedTimeLeftToGo = (state.roundTime + settings.moveTime) * (settings.rounds - state.currentRoundNumber) - settings.moveTime;
    var changeFinishTime = revisedTimeLeftToGo - originalTimeLeftToGo;
    state.projectedFinishTime = addMillisecondsToDate(state.projectedFinishTime, changeFinishTime * 1000);

    setProjectedTime(state.projectedFinishTime.getHours() + ":" + toTwoDigitString(state.projectedFinishTime.getMinutes()));
}

function forward() {
    // your code goes here
    // move either to next board, move  or new round
    var originalThisRoundToGo = state.thisRoundToGo;
    if (state.currentBoardNumber < settings.boardsPerRound) {
        state.thisRoundToGo = state.roundTime - (state.currentBoardNumber * settings.boardTime) ;
        state.currentBoardNumber++;
        setBoard(state.currentBoardNumber);
        setClockHand(360 * (state.roundTime - state.thisRoundToGo) / state.roundTime);
        setClockTime(state.thisRoundToGo);
    }
    else if (state.thisRoundToGo > 0) {
        state.thisRoundToGo = 0;
        setMode('move');
    }
    else
    {
        state.thisRoundToGo = - settings.moveTime;
        setMode('normal');
    }
    var changeFinishTime = originalThisRoundToGo - state.thisRoundToGo ;
    state.projectedFinishTime = addMillisecondsToDate(state.projectedFinishTime, -changeFinishTime * 1000);
    setProjectedTime(state.projectedFinishTime.getHours() + ":" + toTwoDigitString(state.projectedFinishTime.getMinutes()));
}

function pause() {
    // your code goes here
    state.blnPaused = true;
}

function moving(movingTime) {
    // your code goes here
    setMode("move");
    setClockHand(360 * (movingTime / settings.moveTime));
    setClockTime(settings.moveTime - movingTime);
}

function play() {
    // your code goes here
    state.blnPaused = false;
    if (state.blnOnBreak)
    {
        state.blnOnBreak = false;
        state.thisRoundToGo = -settings.moveTime - 1;
    }
    // state.blnPauseAfterRoundN = false;
}

function calcPerUnitTimeGone() {
   //full time  is totalSessionSeconds
   var secondsGone = (state.currentRoundNumber - 1) * (state.roundTime + settings.moveTime) + (state.roundTime - state.thisRoundToGo);
   return (secondsGone/state.totalSessionSeconds);
}

function getEmptyState() {
    return {
        "preStart": true,
        "blnFirstAttempt": true,
        "totalSessionSeconds": 0,
        "totalSessionMinutes": 0,
        "normalPlayTime": 0,
        "overtimePlusPlayTime": 0,
        "overtimeInSeconds": 0,
        "actualAverageSeconds": 0,
        "roundTime": 0,
        "thisRoundToGo": 0,
        "degreesPerBoard": 0,
        "minsAverage": 0,
        "secsAverage": 0,
        "totalSessionSeconds": 0,
        "totalSessionMinutes": 0,
        "currentBoardNumber": 1,
        "currentRoundNumber": 1,
        "startTime": new Date(),
        "projectedFinishTime": new Date(),
        "blnChangedColour": true,
        "blnPaused": false,
        "blnMoving": false,
        "blnOnBreak": false,
        "perUnitTimeGone": 0.0
    };
}