var charm = require('charm')(process);
charm.reset();

charm.on('^C', function () {
    charm.cursor(true);
    process.exit(0)
});

function at (x, y, c) {
    if (x < 1 || y < 1 || x > 80 || y > 80) return;
    charm.position(Math.floor(x), Math.floor(y));
    charm.write(c);
}

plotLine([ 20, 10 ], [ 75, 15 ]);

function plotLine (p0_, p1_) {
    var p0, p1;
    if (p0_[1] < p1_[1]) {
        p0 = p0_, p1 = p1_;
    }
    else {
        p0 = p1_, p1 = p0_;
    }
    
    var m = (p1[1] - p0[1]) / (p1[0] - p0[0]);
    var b = p0[1] - m * p0[0];
    
    for (var y = p0[1]; y < p1[1]; y++) {
        // y = m * x + b
        // x = (y - b) / m
        var xp = Math.floor((y - 1 - b) / m);
        var xn = Math.floor((y - b) / m);
        
        var chars =
            m > 1 ? [ '|', '\\' ] :
            m > 0.5 ? [ '\\', '_' ] :
            m > 0 ? [ '\\', '_' ] :
            
            m < -1 ? [ '|', '/' ] :
            m < -0.5 ? [ '/', '_' ] :
            m < 0 ? [ '/', '_' ] :
            [ '_', '_' ]
        ;
        
        if (Math.abs(m) > 1) {
            at(xn, y, xp === xn ? chars[0] : chars[1]);
        }
        else if (m < 0) {
            at(xp, y, chars[0]);
            for (var x = xn + 1; x < xp; x++) {
                at(x, y, chars[1]);
            }
        }
        else {
            at(xp, y, chars[0]);
            for (var x = xp + 1; x < xn; x++) {
                at(x, y, chars[1]);
            }
        }
    }
}
