var timer;
var settings;

function load() {
    // your code goes here

    settings = getSettings();
    setDisplayName(settings.displayName);
    createBoards(5, 60);
    setProgress(0.43);
    start();
}

function start() {
    // your code goes here

}


// called once and repeats until such time as the timer interval is cleared.
function update() { }

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
