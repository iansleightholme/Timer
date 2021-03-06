async function registerClientAsync() {
    fetch("registerclient.aspx", {
        method: "POST", 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: getBrowserConfig()
      }).then(result => {
        console.log("Registration response:", result.status);
      }).catch(error => {
        console.log("Registration error:", error);
      });
}

function getBrowserConfig() {
    return "TimeZoneOffset=" + (new Date()).getTimezoneOffset()
        + "&Resolution=" + screen.width + "x" + screen.height 
        + "&Version=3.0.5"
        + "&Referrer=" + encodeURIComponent(document.referrer);
}