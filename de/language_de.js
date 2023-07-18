var language = "de";
var path = "../";   // path to English version

function getFarewell() {
    var hour = new Date().getHours();
    if (hour < 6)
        return 'Auf Wiedersehen';
    else if (hour < 12)
        return 'einen schönen Morgen';
    else if (hour < 17)
        return 'einen schönen Nachmittag';
    else if (hour < 20)
        return 'einen schönen Abend';
    else
        return 'eine schöne Nacht';
}