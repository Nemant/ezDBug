var fs = require('fs');

// chokidar: https://github.com/paulmillr/chokidar
var chokidar = require('chokidar');
var watcher = chokidar.watch('trunk', {ignored: /[\/\\]\./, persistent: true});

watcher
    .on('add', function (path) {
        console.log('File', path, 'has been added');
    })
    .on('addDir', function (path) {
        console.log('Directory', path, 'has been added');
    })
    .on('change', function (path) {
        console.log('File', path, 'has been changed');
        var stream = fs.createWriteStream("restart.js");
        stream.once('open', function (fd) {
            stream.write("filename=" + path);
            stream.write("\n");
            stream.write("restart=" + Math.floor(Math.random() * 1000));
            stream.end();
        })
            .on('unlink', function (path) {
                console.log('File', path, 'has been removed');
            })
            .on('unlinkDir', function (path) {
                console.log('Directory', path, 'has been removed');
            })
            .on('error', function (error) {
                console.error('Error happened', error);
            })


    });
