var ezDBug = {

    init: function () {
//		var magic = this._getQueryStringParameter('magic');
//		if (magic == "true") {
//			var self = this;
//			window.setTimeout(function () {
//				self._addYourScript();
//			}, 1000);
//		}
        var self = this;
        window.setTimeout(function () {
            var paths = self._getMagicAddress();
            console.log(paths.debuggerPath);
            console.log(paths.styleSheetPath);
            self._addYourScript(paths.debuggerPath);
            var stylesHashTable = self._getStylesHashTable(paths.styleSheetPath);
            self._startWatchingCSSFiles(paths.debuggerPath, stylesHashTable);
        }, 5000);
    },

    _getMagicAddress: function () {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src.match("magic.js")) {
                var debuggerPath = scripts[i].src.replace('magic.js', '');
                var styleSheetPath = scripts[i].src.replace('ezDBug/src/magic.js', '');
                return {debuggerPath: debuggerPath, styleSheetPath: styleSheetPath}
            }
        }
    },

    _getStylesHashTable: function (address) {
        var stylesHashTable = {};

        var links = document.getElementsByTagName('link');
        for (var i = 0; i < links.length; i++) {
            if (links[i].href.match(address)) {
                var linkFullAddress = links[i].href;
                var linkRelativeAddress = linkFullAddress.replace(address, '');
                stylesHashTable[linkRelativeAddress] = links[i];
            }
        }

        var styles = document.getElementsByTagName('style');
        for (var i = 0; i < styles.length; i++) {
            if (styles[i].textContent.match(address)) {
                var styleFullAddress = styles[i].textContent.match(/@import url\(\"(.*)\"\)/)[1];
                var styleRelativeAddress = styleFullAddress.replace(address, '');
                stylesHashTable[styleRelativeAddress] = styles[i];
            }
        }

        return stylesHashTable;
    },

    _getQueryStringParameter: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    _addYourScript: function (debuggerPath) {
        var js;
        window.setInterval(function () {
            if (js) {
                document.body.removeChild(js);
            }

            js = document.createElement("script");
            js.type = "text/javascript";
            js.src = debuggerPath + "yourScript.js";
            document.body.appendChild(js);
        }, 1000);
    },

    _startWatchingCSSFiles: function (debuggerPath, stylesHashTable) {
        var self = this;
        var js;
        var lastTimestamp = 0;
        window.setInterval(function () {
                // Read the recentlyChangedCSSFiles.css file
                if (js) {
                    document.body.removeChild(js);
                }

                js = document.createElement("script");
                js.type = "text/javascript";
                js.src = debuggerPath + "recentlyChangedCSSFiles.js"

                js.onload = function () {
                    self._updatePageCSS(stylesHashTable, ezDBug._changedCSSFilePath, lastTimestamp, ezDBug._timestamp);
                    lastTimestamp = ezDBug._timestamp;
                };
                document.body.appendChild(js);
            },
            500);
    },

    _updatePageCSS: function (stylesHashTable, changedCSSFilePath, lastTimestamp, currentTimestamp) {
        if (lastTimestamp !== currentTimestamp) {
            console.log(stylesHashTable[changedCSSFilePath]);
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