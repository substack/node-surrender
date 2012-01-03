var charm = require('charm')(process);
charm.reset();
charm.on('^C', function () {
    charm.cursor(true);
    process.exit(0)
});
//charm.cursor(false);

var at = (function () {
    var queue = [];
    return function (x, y, c) {
        function write () {
            charm.position(Math.floor(x), Math.floor(y));
            charm.write(c);
            
            setTimeout(function () {
                if (queue.length) queue.shift()();
            }, 1);
        }
        if (queue.length) queue.push(write)
        else write()
    };
})();

var coord = require('coord');
var tr = coord([ [ -1, 1 ], [ -1, 1 ] ], [ [ 1, 80 ], [ 1, 24 ] ]);

for (var i = 2; i < 80; i++) at(i, 0, '—');

for (var i = 2; i < 24; i++) {
    at(1, i, '|');
    at(80, i, '|');
}

for (var i = 2; i < 80; i++) at(i, 24, '—');

function line (p0_, p1_) {
    var t0 = tr(p0_);
    var t1 = tr(p1_);
    
    var p0 = t0[1] < t1[1] ? t0 : t1;
    var p1 = t0[1] >= t1[1] ? t0 : t1;
    
    var bounds = [
        [ Math.min(p0[0], p1[0]), Math.max(p0[0], p1[0]) ],
        [ p0[1], p1[1] ]
    ];
    
    var m = (p0[1] - p1[1]) / (p0[0] - p1[0]);
    var b = p0[1] - m * p0[0]; // b = y - mx
    
    for (var y = Math.floor(p0[1]); y < p1[1]; y++) {
        // solve for an initial x in x = (y - b) / m
        var x = (y - b) / m;
        
        // cast a ray left and right to find all y = Math.round(mx + b)
        for (
            var x0 = x;
            y === Math.round(m * x0 + b)
                && x0 >= bounds[0][0]
                && x0 <= bounds[0][1]
            ;
            x0--
        ) at(x0, y, '-');
        
        for (
            var x1 = x + 1;
            y === Math.round(m * x1 + b)
                && x1 >= bounds[0][0]
                && x1 <= bounds[0][1]
            ;
            x1++
        ) at(x1, y, m > 0 ? '.' : '\'');
    }
    
    at(p0[0], p0[1], '0');
    at(p1[0], p1[1], '1');
}

line([ -0.5, 0 ], [ 1, 1 ]);
