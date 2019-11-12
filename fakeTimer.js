var timer;
var settings;
var endTime;

function load() {
    // your code goes here
    // playing audio on load causes a promise exception
    settings = getActiveSettings();

    setDisplayName(settings.displayName);
    createBoards(5, 60);
    setProgress(0.0);
    setOvertime(330);
    setAverage('00:15', 270);
    setRound(2);
    setBoard(5);
    setTotalBoards(24);
    setClockTime(120, 13);
    setProjectedTime('15:56');
    // setMode('break');

    setSummary();
    // var config = getBrowserConfig();
    // alert(JSON.stringify(config));
    
    //
}

function start() {
    endTime = new Date(new Date().getTime() + 90 * 1000);
    registerClient();
    timer = setInterval(update, 500);
}

function play() {
    // your code goes here
    // beep();

    start();
    soundNextBoard(true);
    setMode('normal');
    hide('paused');
    //timer = setInterval(update, 500);
}

function pause() {
    clearInterval(timer);
    // your code goes here
    show('paused');
}

// called once and repeats until such time as the timer interval is cleared.
function update() {
    var date = new Date();
    var timeRemaining = (endTime - date) /1000;
    if (timeRemaining < 0)
    {
        setMode('ended', getFarewell());
        clearInterval(timer);
    }
    else if (timeRemaining < 60)
    {
        setMode('move');
    }
    else if (timeRemaining < 70)
    {
        setMode('overtime');
    }
    else if (timeRemaining < 75)
        setMode('average');

    else
        setMode('normal');

    setProgress(1 - timeRemaining / 120);
    var seconds = Math.floor(timeRemaining) % 60;
    setClockTime(seconds);
    setClockHand(360 - seconds * 6);
}

function backward() {
    // your code goes here
    alert('backward');
}

function forward() {
    // your code goes here
    alert('forward');
}

function addMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}
