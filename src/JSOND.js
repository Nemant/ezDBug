var JSOND = JSOND || {};
// Credit: http://www.sitepoint.com/javascript-json-serialization/
// implement JSON.stringify serialization
JSOND.stringify = JSOND.stringify || function (obj) {
    var t = typeof(obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"' + obj + '"';
        return String(obj);
    } else {
        // recurse array or object
        var n, v, json = [],
            arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n];
            t = typeof(v);
            if (t == "string") {
                v = ' " ' + v + ' " ';
            } else if (t == "object" && v !== null) {
                v = JSOND.stringify(v);
            }
            json.push((arr ? " " : ' " ' + n + '" : ') + String(v));
        }
        return (arr ? " [ " : " { ") + String(json) + (arr ? " ] " : " } ");
    }
};
