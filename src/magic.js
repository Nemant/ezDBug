var ezDBug = {
    init: function () {
        var JSONDLibrary = document.createElement('script');
        JSONDLibrary.type = "text/javascript";
        JSONDLibrary.src = 'https://dl.dropboxusercontent.com/u/13398409/iplayer/ezDBug/src/JSOND.js';
        document.body.appendChild(JSONDLibrary);

        var magic = this._getParameterByName('magic');
        if (magic == "true") {
            alert("magic is true!")

//            window.setTimeout(function () {
//                addHelperJS();
//                addStyle();
//            }, 10000);
        }

    },

    _getParameterByName: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    _addHelperJS: function () {
        var js;
        window.setInterval(function () {
            if (js) {
                document.body.removeChild(js);
            }

            js = document.createElement("script");
            js.type = "text/javascript";
            js.src = "https://dl.dropboxusercontent.com/u/13398409/iplayer/ezDBug/src/changeCSS.js";
            document.body.appendChild(js);
        }, 1000);
    }

};


function addStyle() {
    // var allElements = ["leftClamped", "modalContentContainer", "standardContent", "AnimationContainer", "nowwatching"];
    var allElements = ["episodeContent", "standardContent"];
    var cssElementOld = [];
    var cssElementNew = [];

    window.setInterval(function () {
        for (var i = 0; i < allElements.length; i++) {
            cssElementNew[i] = document.createElement("link");
            cssElementNew[i].type = "text/css";
            cssElementNew[i].rel = 'stylesheet';
            cssElementNew[i].href = "http://10.10.14.29/static/iplayer/bigscreen/style/540/" + allElements[i] + ".css?v=1." + Math.floor(Math.random() * 100);
            document.getElementsByTagName("head")[0].appendChild(cssElementNew[i]);

            if (cssElementOld[i]) {
                document.getElementsByTagName("head")[0].removeChild(cssElementOld[i]);
            }
            cssElementOld[i] = cssElementNew[i];
        }
    }, 5000);

    for (var i = 0; i < allElements.length; i++) {
        _removeOrginalCSS("http://10.10.14.29/static/iplayer/bigscreen/style/540/" + allElements[i] + ".css");
    }
}


function _searchCSS(url) {
    var allStyles = document.getElementsByTagName("head")[0].getElementsByTagName("link");
    for (var i = 0; i < allStyles.length; i++) {
        var styleSheet = allStyles[i];
        if (styleSheet.getAttribute("href") === url) {
            document.getElementById("playerMenuSynopsis").textContent = url;
        }
    }
}

function _removeOrginalCSS(url) {
    var allStyles = document.getElementsByTagName("head")[0].getElementsByClassName("added-by-antie");
    for (var i = 0; i < allStyles.length; i++) {
        var styleSheet = allStyles[i];
        if (styleSheet.textContent.match(url)) {
            document.getElementsByTagName("head")[0].removeChild(styleSheet);
        }
    }
}

ezDBug.init();