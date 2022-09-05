var language = "no";
var path = "../";   // path to English version

function getFarewell() {
    var hour = new Date().getHours();
    if (hour < 6)
        return 'Ha det';
    else if (hour < 12)
        return 'God morgen';
    else if (hour < 17)
        return 'God ettermiddag';
    else if (hour < 20)
        return 'God kveld';
    else
        return 'God natt';
}