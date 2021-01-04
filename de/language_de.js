var language = "de";
var path = "../";   // path to English version

function getFarewell() {
    var hour = new Date().getHours();
    if (hour < 6)
        return 'Auf Wiedersehen';
    else if (hour < 12)
        return 'Guten Morgen';
    else if (hour < 17)
        return 'Guten Tag';
    else if (hour < 20)
        return 'Guten Abend';
    else
        return 'Gute Nacht';
}