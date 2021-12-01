var language = "en";
var path = "./"

function getFarewell() {
    var hour = new Date().getHours();
    if (hour < 6)
        return 'Goodbye';
    else if (hour < 12)
        return 'Good morning';
    else if (hour < 17)
        return 'Good afternoon';
    else if (hour < 20)
        return 'Good evening';
    else
        return 'Good night';
}