var language = "pl";
var path = "../";   // path to English version

function getFarewell() {
    var hour = new Date().getHours();
    if (hour < 6)
        return 'Do widzenia';
    else if (hour < 12)
        return 'Miłego poranka';
    else if (hour < 17)
        return 'Miłego popołudnia';
    else if (hour < 20)
        return 'Cudowny wieczór';
    else
        return 'Miłej nocy';
}