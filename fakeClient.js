function registerClient() {
    // register client config
    console.log("Registration response:", 200);
}

function getBrowserConfig() {
    return "TimeZoneOffset=" + (new Date()).getTimezoneOffset()
        + "&Resolution=" + screen.width + "x" + screen.height 
        + "&Version=3.0.3"
        + "&Referrer=" + encodeURIComponent(document.referrer);
}
