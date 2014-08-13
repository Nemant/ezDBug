// chokidar: https://github.com/paulmillr/chokidar

var fs = require('fs');
var chokidar = require('chokidar');
var watcher = chokidar.watch('../../', {ignored: /[\/\\]\.[^.]+|.*\.js/, persistent: true});

watcher
    .on('change', function (path) {
        console.log('File', path, 'has been changed');
        var stream = fs.createWriteStream("recentlyChangedCSSFiles.js");
        stream.once('open', function (fd) {
            stream.write("ezDBug._changedCSSFilePath=" + "\"" + path.replace("../../", "") + "\"");
            stream.write("\n");
            stream.write("ezDBug._timestamp=" + "\"" + new Date().getTime() + "\"");
            stream.end();
        })
    });