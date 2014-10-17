try {


    /* Add JSOND for devices that don't support the JSON library */
    function addJSOND() {
        var JSONDLibrary = document.createElement('script');
        JSONDLibrary.type = "text/javascript";
        JSONDLibrary.src = 'https://dl.dropboxusercontent.com/u/13398409/iplayer/ezDBug/src/JSOND.js';
        document.body.appendChild(JSONDLibrary);
    }

    /* Print config to the screen */
    function printConfigToScreen() {
        window.setTimeout(function () {
            var x = document.getElementsByClassName("rootwidget");
            var y = x[0];
            y.textContent = JSOND.stringify(antie);
        }, 10000);
    }
//	addJSOND();
//	printConfigToScreen();
//	  document.getElementById("homeContentItem4").style.display = "none";
//    Restart the app
//    window.location.href = "http://10.10.14.29/iplayer/bigscreen/?config=qa&ezdbug=true";
//    window.location.href = "http://pal.sandbox.dev.bbc.co.uk/iplayer/bigscreen/?brand=default&model=webkit&config=qa&ezdbug=true";
//
} catch (e) {
}
