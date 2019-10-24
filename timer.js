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
// updateInterval is set in milliseconds
var updateInterval = 500;
var blnPaused = false;
var blnMoving = false;
var blnPauseAfterRoundN = false;
var perUnitTimeGone = 0.0;


function load() {
    // your code goes here

    settings = getSettings();
    setDisplayName(settings.displayName);
    blnPauseAfterRoundN = settings.pause;
    alert("blnPauseAfterRoundN " + blnPauseAfterRoundN  + ",  settings.pauseAfterRound " + settings.pauseAfterRound);
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

    if (overtimeInSeconds > settings.boardTime) { overtimeInSeconds = settings.boardTime };
 
    
    overtimePlusPlayTime = normalPlayTime + overtimeInSeconds;

    roundTime = settings.boardsPerRound * settings.boardTime + overtimeInSeconds;
    if (overtimeInSeconds > 0) {
        
        setOvertime(360 * (roundTime - 0.5 * overtimeInSeconds)/(roundTime));
        
    }
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
    
    if (actualAverageSeconds < settings.boardTime) { actualAverageSeconds = settings.boardTime };
    
    minsAverage = Math.floor(actualAverageSeconds / 60);
    secsAverage = actualAverageSeconds % 60;

    // only if average  actually required go through set average
    if (settings.average) {
        setAverage(minsAverage + ":" + toTwoDigitString(secsAverage), 360 * (1 - actualAverageSeconds / roundTime));
    }




    setDisplayName(settings.displayName);



    setTotalBoards(settings.boardsPerRound * settings.rounds);

    totalSessionSeconds = settings.rounds * (roundTime + settings.moveTime) - settings.moveTime;
    totalSessionMinutes = totalSessionSeconds / 60;
    currentBoardNumber = 1;
    setBoard(currentBoardNumber);
    currentRoundNumber = 1;
    setRound(currentRoundNumber);
    startTime = new Date();
  
    projectedFinishTime = addMinutesToDate(startTime, totalSessionMinutes);
  
    blnFirstAttempt = true;
    blnChangedColour = true;
   
    //alert("startTime(getHours) " + startTime(getHours) + ", startTime(getMinutes) " + startTime(getMinutes) + ", totalSessionMinutes " + totalSessionMinutes );
      //+ ", projectedFinishTime(getHours()) " + projectedFinishTime(getHours) + ", projectedFinishTime(getMinutes) " + projectedFinishTime(getMinutes));
    setProjectedTime(projectedFinishTime.getHours() + ":" + projectedFinishTime.getMinutes());



    document.getElementById('paused').setAttribute('visibility', 'hidden');
    timer = setInterval(update, updateInterval);
    //update();


}


// called once and repeats until such time as the timer interval is cleared.
function update() {
    
    if (blnFirstAttempt) {
        var safetyCountDown = 1000;
        startTime = new Date();
        projectedFinishTime= addMinutesToDate(startTime, totalSessionMinutes);
        setMode("normal", true);
        blnFirstAttempt = false;
        perUnitTimeGone = 0.0;

        setProgress(perUnitTimeGone);
    }
    else {
        //possibilities are normal mid round play, averaging, overtime, move time, paused, fast forward, back 
        //calcProgress, using zero to start testing
        perUnitTimeGone = calcPerUnitTimeGone();

        setProgress(perUnitTimeGone);
        if (blnPaused) {
            projectedFinishTime = addMillisecondsToDate(projectedFinishTime, updateInterval);
            setProjectedTime(projectedFinishTime.getHours() + ":" + toTwoDigitString(projectedFinishTime.getMinutes()));

            return;
        }
        thisRoundToGo = thisRoundToGo - updateInterval/1000;
        safetyCountDown = safetyCountDown - 1;
        if (safetyCountDown < 1) {
            alert("should stop for testing");
            return;
        }

        //calcBarLength();
    }
    setProjectedTime(projectedFinishTime.getHours() + ":" + toTwoDigitString(projectedFinishTime.getMinutes()));
    // check end of board, overtime, round limits
    //either move on to the next round or go to move time or finish
    if (thisRoundToGo < 0 ) {
        if(currentRoundNumber  >= settings.rounds || thisRoundToGo < -settings.moveTime)
        {
            nextRound();
        }
    else if (thisRoundToGo < 0 ) {
            moving(-thisRoundToGo);
            if(blnPauseAfterRoundN && currentRoundNumber == settings.pauseAfterRound){
                blnPaused = true;
                alert("blnPauseAfterRoundN " + blnPauseAfterRoundN  + ",  currentRoundNumber " + currentRoundNumber + ", settings.pauseAfterRound" + settings.pauseAfterRound);
               
               
                pause();
            }
           // else
           // {
               // moving(-thisRoundToGo);
           // }
        }
    }
    else
    {
        if (thisRoundToGo < actualAverageSeconds && settings.average && thisRoundToGo > overtimeInSeconds)
        {
            setMode("average");
        }
        if (thisRoundToGo < overtimeInSeconds) {
            //overtimePeriodReached();
            setMode("overtime", true);
        }
        else {
            var boardBeingPlayed = Math.ceil((roundTime - thisRoundToGo) / settings.boardTime);
            if (boardBeingPlayed > currentBoardNumber) {
                // alert("current board " + currentBoardNumber + ", boardBeingPlayed " + boardBeingPlayed);
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

    setClockTime(thisRoundToGo);
    //setClockTime(Math.floor(thisRoundToGo / 60), Math.floor(thisRoundToGo % 60)); Ian changed to just give seconds 21/10/19
    }

}
function nextRound() { 
    currentRoundNumber++;
    if(currentRoundNumber > settings.rounds)
    {
        alert("reached the end - should stop!");
        clearInterval(timer);
        setMode('ended', getFarewell());
        return;
        
        //setMode('end', getFarewell());
    }
    else
    {
        currentBoardNumber = 1;
        setMode('normal');
        setBoard(currentBoardNumber);
        
        setRound(currentRoundNumber);
        thisRoundToGo = roundTime;
        degreesPerBoard = settings.boardTime / roundTime * 360;

        createBoards(settings.boardsPerRound, degreesPerBoard);
        setClockHand(0);
        if (settings.average) {
            setAverage(minsAverage + ":" + toTwoDigitString(secsAverage), 360 * (1 - actualAverageSeconds / roundTime));
        }
    }
}
function overtimePeriodReached() { }
function backward() {
    // your code goes here
}

function forward() {
    // your code goes here
}
function pause() {
    // clearInterval(timer);
    // your code goes here
    blnPaused = true;
    
    show('paused');
}

function moving(movingTime) {
    // clearInterval(timer);
    // your code goes here
    setMode("move");
    setClockHand(360 * (movingTime/settings.moveTime));

    setClockTime(settings.moveTime - movingTime);
}
function play() {
    // clearInterval(timer);
    // your code goes here
    blnPaused = false;
    alert("play pressed, blnPauseAfterRoundN " + blnPauseAfterRoundN)
    blnPauseAfterRoundN = false;
    
    hide('paused');
}
function calcPerUnitTimeGone() {
   //full time  is totalSessionSeconds
   secondsGone = (currentRoundNumber - 1) * (roundTime + settings.moveTime) + (roundTime - thisRoundToGo);
   return (secondsGone/totalSessionSeconds);
  

}
function addMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
 }
 function addMillisecondsToDate(date, milliseconds) {
    return new Date(date.getTime() + milliseconds);
 }
 function getFarewell() {
    var hour = new Date().getHours();
    if (hour < 6)
       return 'Good bye';
    else if (hour < 12)
       return 'Good morning';
    else if (hour < 17)
       return 'Good afternoon';
    else if (hour < 20)
        return 'Good evening';
    else
       return 'Good night';
 }
