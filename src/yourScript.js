try {

//    alert("yourScript loaded!");

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

//    Restart the app
//    window.location.href = "http://10.10.14.68/iplayer/bigscreen/?config=qa&magic=true";

    var x = document.getElementById("topNavigationMenuItem1Title");
    x.textContent = "test";

} catch (e) {
}
