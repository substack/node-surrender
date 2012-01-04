var charmer = require('charm');
var coords = require('coords');

module.exports = function (opts) {
    if (!opts) opts = {};
    
    var charm = opts.charm || (function () {
        var c = charmer(process);
        c.cursor(false);
        c.on('^C', function () {
            c.cursor(true);
            process.exit();
        });
        return c;
    })();
    
    charm.reset();
    
    var tr = opts.from ? coords(opts.from, [ [ 1, 80 ], [ 1, 24 ] ]) : null;
    return new Render(charm, tr);
};

function Render (charm, tr) {
    this.charm = charm;
    this.transform = tr;
}

Render.prototype.line = function (p0_, p1_) {
    var charm = this.charm;
    if (this.transform) {
        p0_ = this.transform(p0_);
        p1_ = this.transform(p1_);
    }
    
    function at (x, y, c) {
        if (isNaN(x) || isNaN(y) || x < 1 || y < 1 || x > 80 || y > 80) return;
        
        charm.position(Math.floor(x), Math.floor(y));
        charm.write(c);
    }
    
    var p0, p1;
    if (p0_[1] < p1_[1]) {
        p0 = p0_, p1 = p1_;
    }
    else {
        p0 = p1_, p1 = p0_;
    }
    
    if (Math.floor(p0[1]) === Math.floor(p1[1])) {
        // horizontal
        var xn = Math.min(p0[0], p1[0]);
        var xp = Math.max(p0[0], p1[0]);
        for (var x = xn; x <= xp; x++) {
            at(x, p0[1], '—');
        }
        return;
    }
    
    if (Math.floor(p0[0]) === Math.floor(p1[0])) {
        // vertical
        var yn = Math.min(p0[1], p1[1]);
        var yp = Math.max(p0[1], p1[1]);
        
        for (var y = yn; y <= yp; y++) {
            at(p0[0], y, '|');
        }
        return;
    }
    
    var m = (p1[1] - p0[1]) / (p1[0] - p0[0]);
    var b = p0[1] - m * p0[0];
    
    for (var y = p0[1]; y < p1[1]; y++) {
        // y = m * x + b
        // x = (y - b) / m
        var chars =
            m > 1 ? [ '|', '\\' ] :
            m > 0.5 ? [ '\\', '_' ] :
            m > 0 ? [ '\\', '_' ] :
            
            m < -1 ? [ '|', '/' ] :
            m < -0.5 ? [ '/', '¯' ] :
            m < 0 ? [ '/', '¯' ] :
            [ '_', '_' ]
        ;
        
        if (Math.abs(m) > 1) {
            var xp = Math.floor((y - 1 - b) / m);
            var xn = Math.floor((y - b) / m);
            at(xn, y, xp === xn ? chars[0] : chars[1]);
        }
        else if (m < 0) {
            var xp = Math.floor((y - 1 - b) / m);
            var xn = Math.floor((y - b) / m);
            
            at(xn, y, chars[0]);
            for (var x = xn + 1; x < xp; x++) {
                at(x, y, chars[1]);
            }
        }
        else {
            var xp = Math.floor((y - b) / m);
            var xn = Math.floor((y + 1 - b) / m);
            
            at(xp, y, chars[0]);
            for (var x = xp + 1; x < xn; x++) {
                at(x, y, chars[1]);
            }
        }
    }
    
    return this;
}
