var ezDBug = {

    init: function () {
		var debugEnabled = this._getQueryStringParameter('ezdbug');
		if (debugEnabled == "true") {
            var self = this;
            window.setTimeout(function () {
                var paths = self._getEZDBugPath();
                self._addCustomisableScript(paths.debuggerPath);
                var stylesHashTable = self._getStylesHashTable(paths.styleSheetPath);
                self._startWatchingCSSFiles(paths.debuggerPath, stylesHashTable);
            }, 5000);
        }
    },

    _getQueryStringParameter: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    _getEZDBugPath: function () {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src.match("magic.js")) {
                var debuggerPath = scripts[i].src.replace('magic.js', '');
                var styleSheetPath = scripts[i].src.replace('ezDBug/src/magic.js', '');
                return {debuggerPath: debuggerPath, styleSheetPath: styleSheetPath}
            }
        }
    },

    _addCustomisableScript: function (debuggerPath) {
        var js;
        window.setInterval(function () {
            if (js) {
                document.body.removeChild(js);
            }

            js = document.createElement("script");
            js.type = "text/javascript";
            js.src = debuggerPath + "yourScript.js?v=" + Math.floor(Math.random() * 10000) + 1;
            document.body.appendChild(js);
        }, 1000);
    },

    _getStylesHashTable: function (styleSheetPath) {
        var stylesHashTable = {};

        var links = document.getElementsByTagName('link');
        for (var i = 0; i < links.length; i++) {
            if (links[i].href.match(styleSheetPath)) {
                var linkFullAddress = links[i].href;
                var linkRelativeAddress = linkFullAddress.replace(styleSheetPath, '');
                stylesHashTable[linkRelativeAddress] = links[i];
            }
        }

        var styles = document.getElementsByTagName('style');
        for (var i = 0; i < styles.length; i++) {
            if (styles[i].textContent.match(styleSheetPath)) {
                var styleFullAddress = styles[i].textContent.match(/@import url\(\"(.*)\"\)/)[1];
                var styleRelativeAddress = styleFullAddress.replace(styleSheetPath, '');
                stylesHashTable[styleRelativeAddress] = styles[i];
            }
        }

        return stylesHashTable;
    },

    _startWatchingCSSFiles: function (debuggerPath, stylesHashTable) {
        var self = this;
        var js;
        var lastTimestamp = 0;
        window.setInterval(function () {
                if (js) {
                    document.body.removeChild(js);
                }

                js = document.createElement("script");
                js.type = "text/javascript";
                js.src = debuggerPath + "recentlyChangedCSSFiles.js?v=" + Math.floor(Math.random() * 10000) + 1;

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
            var cssImportElement = stylesHashTable[changedCSSFilePath];
            var cssLink;
            var regExpMatchingCSSLink = /(.*\.css).*/;
            var versionedFile = "$1?v=" + Math.floor(Math.random() * 10000) + 1;

            if (cssImportElement.href) {
                cssLink = cssImportElement.href;
                cssImportElement.href = cssLink.replace(regExpMatchingCSSLink, versionedFile);
            } else {
                cssLink = cssImportElement.innerText;
                cssImportElement.innerText = cssLink.replace(regExpMatchingCSSLink, versionedFile + "\")");
            }
        }
    }
};

ezDBug.init();