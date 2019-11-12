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