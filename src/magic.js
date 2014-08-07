var ezDBug = {
    init: function () {
        var magic = this._getQueryStringParameter('magic');
        if (magic == "true") {
            var self = this;
            window.setTimeout(function () {
                self._addYourScript();
                self._startWatchingCSSFiles();
            }, 1000);
        }
    },

    _getQueryStringParameter: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    _addYourScript: function () {
        var js;
        window.setInterval(function () {
            if (js) {
                document.body.removeChild(js);
            }

            js = document.createElement("script");
            js.type = "text/javascript";
//            js.src = "https://dl.dropboxusercontent.com/u/13398409/iplayer/ezDBug/src/yourScript.js";
            js.src = "yourScript.js";
            document.body.appendChild(js);
        }, 1000);
    },

    _startWatchingCSSFiles: function () {
        // var allElements = ["leftClamped", "modalContentContainer", "standardContent", "AnimationContainer", "nowwatching"];
        var allElements = ["episodeContent", "standardContent"];
        var cssElementOld = [];
        var cssElementNew = [];

//        window.setInterval(function () {
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
//        }, 500000000);

        for (var i = 0; i < allElements.length; i++) {
            this._removeOrginalCSS("http://10.10.14.29/static/iplayer/bigscreen/style/540/" + allElements[i] + ".css");
        }
    },

    _removeOrginalCSS: function (url) {
        var allStyles = document.getElementsByTagName("head")[0].getElementsByClassName("added-by-antie");
        for (var i = 0; i < allStyles.length; i++) {
            var styleSheet = allStyles[i];
            if (styleSheet.textContent.match(url)) {
                document.getElementsByTagName("head")[0].removeChild(styleSheet);
            }
        }
    }

};

ezDBug.init();