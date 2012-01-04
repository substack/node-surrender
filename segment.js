var charm = require('charm')(process);
charm.reset();

charm.on('^C', function () {
    charm.cursor(true);
    process.exit(0)
});

function at (x, y, c) {
    charm.position(Math.floor(x), Math.floor(y));
    charm.write(c);
}

var m = 0.5;
var b = -10;

for (var y = 1; y < 24; y++) {
    // y = m * x + b
    // x = (y - b) / m
    var xp = Math.floor((y - 1 - b) / m);
    var xn = Math.floor((y - b) / m);
    
    var chars =
        m > 1 ? [ '|', '\\' ] :
        m > 0.5 ? [ '\\', '_' ] :
        m > 0 ? [ '\\', '_' ] :
        m < 1 ? [ '|', '/' ] :
        m < 0 ? [ '/', '_' ] :
        []
    ;
    
    if (m > 1) {
        at(xn, y, xp === xn ? chars[0] : chars[1]);
    }
    else {
        at(xp, y, chars[0]);
        for (var x = xp + 1; x < xn; x++) {
            at(x, y, chars[1]);
        }
    }
}
