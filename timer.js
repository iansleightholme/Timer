// #region experimental
// your code goes here
//define global variables
var rotation = 50;
var timer;
var settings;
var counter = 0;
var blnFirstAttempt = true;
var totalSessionSeconds = 0;
var totalSessionMinutes = 0;
var normalPlayTime = 0;
var overtimePlusPlayTime = 0;
var overtimeInSeconds = 0;
var actualAverageSeconds = 0;
var roundTime = 0;
var thisRoundToGo = roundTime;
var degreesPerBoard = 0;
var minsAverage = 0;
var secsAverage = 0;
var totalSessionSeconds = 0;
var totalSessionMinutes = 0;
var currentBoardNumber = 1;
var currentRoundNumber = 1;
var startTime = new Date();
var projectedFinishTime = new Date();
var blnChangedColour = true;

function load() {
    // your code goes here

    settings = getSettings();
    setDisplayName(settings.displayName);
    start();
}

// start is after settings agreed
function start() {
    // your code goes here


    setClockHand(0);
    normalPlayTime = settings.boardsPerRound * settings.boardTime;
    //overtimeInSeconds needs to be calculated as yet 18/10/2019
    overtimeInSeconds = settings.overtime;
    // ensure averaging cannot be less than a board and overtime is sensible

    alert(" overtimeInSeconds " + overtimeInSeconds + ", settings.boardTime " + settings.boardTime);
    if (overtimeInSeconds > settings.boardTime) { overtimeInSeconds = settings.boardTime };
    alert(" overtimeInSeconds " + overtimeInSeconds + ", settings.boardTime " + settings.boardTime);

    overtimePlusPlayTime = normalPlayTime + overtimeInSeconds;

    roundTime = settings.boardsPerRound * settings.boardTime + overtimeInSeconds;
    thisRoundToGo = roundTime;
    degreesPerBoard = settings.boardTime / roundTime * 360;

    createBoards(settings.boardsPerRound, degreesPerBoard);
    actualAverageSeconds = 0;

    if (settings.averageOption = "percent") {

        actualAverageSeconds = settings.boardTime * settings.averagePercent / 100;

    }
    else {

        actualAverageSeconds = settings.averageSeconds;
    }
    alert(" actualAverageSeconds " + actualAverageSeconds + ", settings.boardTime " + settings.boardTime);
    if (actualAverageSeconds < settings.boardTime) { actualAverageSeconds = settings.boardTime };
    alert(" actualAverageSeconds " + actualAverageSeconds + ", settings.boardTime " + settings.boardTime);
    minsAverage = Math.floor(actualAverageSeconds / 60);
    secsAverage = actualAverageSeconds % 60;

    // only if average  actually required go through set average
    if (settings.average) {
        setAverage(minsAverage + ":" + toTwoDigitString(secsAverage), 360 * (1 - actualAverageSeconds / roundTime));
    }




    setDisplayName(settings.displayName);



    setTotalBoards(settings.boardsPerRound * settings.rounds);
    alert("Round time " + roundTime + " seconds");
    totalSessionSeconds = settings.rounds * (roundTime + settings.moveTime) - settings.moveTime;
    totalSessionMinutes = totalSessionSeconds / 60;
    currentBoardNumber = 1;
    setBoard(currentBoardNumber);
    currentRoundNumber = 1;
    setRound(currentRoundNumber);
    startTime = new Date();
    alert("startTime " + startTime + " seconds?");
    projectedFinishTime = addMinutesToDate(startTime, totalSessionMinutes);
    alert("projectedFinishTime " + projectedFinishTime + " seconds?");
    blnFirstAttempt = true;
    blnChangedColour = true;
    setProjectedTime(projectedFinishTime.getHours() + ":" + projectedFinishTime.getMinutes());



    document.getElementById('paused').setAttribute('visibility', 'hidden');
    timer = setInterval(update, 500);
    //update();


}


// called once and repeats until such time as the timer interval is cleared.
function update() {
    if (blnFirstAttempt) {
        var safetyCountDown = 1000;
        startTime = new Date();
        projectedFinishTime = addMinutesToDate(startTime, totalSessionMinutes);

        blnFirstAttempt = false;
    }
    else {
        thisRoundToGo = thisRoundToGo - 0.5;
        safetyCountDown = safetyCountDown - 1;
        if (safetyCountDown < 1) {
            Alert("should stop for testing");
            return;
        }
        //calcBarLength();
    }
    setProjectedTime(projectedFinishTime.getHours() + ":" + toTwoDigitString(projectedFinishTime.getMinutes()));
    // check end of board, overtime, round limits
    if (thisRoundToGo < 0) {
        nextRound();
    }
    else
        if (thisRoundToGo < overtimeInSeconds) {
            overtimePeriodReached();
        }
        else {
            var boardBeingPlayed = Math.ceil((roundTime - thisRoundToGo) / settings.boardTime);
            if (boardBeingPlayed > currentBoardNumber) {
                alert("current board " + currentBoardNumber + ", boardBeingPlayed " + boardBeingPlayed);
                currentBoardNumber = currentBoardNumber + 1;
                setBoard(currentBoardNumber);
                beep();
            }
        }

    // your code goes here after start has been pressed at the interval set by the timer - started out at every half second
    var date = new Date();
    //test used actual time, in reality needs time remaining for round
    //setClockTime(date.getMinutes(), date.getSeconds());
    //setClockHand(date.getMinutes() * 60 + date.getSeconds());

    setClockHand(360 * (roundTime - thisRoundToGo) / roundTime);


    setClockTime(Math.floor(thisRoundToGo / 60), Math.floor(thisRoundToGo % 60));


}
function nextRound() { }
function overtimePeriodReached() { }
function backward() {
    // your code goes here
}

function forward() {
    // your code goes here
}
function pause() {
    clearInterval(timer);
    // your code goes here
    show('paused');
}

function addMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
 }