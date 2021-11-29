function getPath(file) {
    return path + file;
}

function setSummary() {
    setText('numBoardsPerRound', settings.boardsPerRound);
    setText('numRounds', settings.rounds);
    setText('breaks', settings.pause);
    setText('boardTime', getHoursMinutesSecond(settings.boardTime));
    setText('overtimeSummary', getHoursMinutesSecond(settings.overtime));
    setText('averagingSummary', getHoursMinutesSecond(settings.averageSeconds));
    setText('moveSummary', getHoursMinutesSecond(settings.moveTime));
    show('summary');
}

function addMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

function addMillisecondsToDate(date, milliseconds) {
    return new Date(date.getTime() + milliseconds);
}