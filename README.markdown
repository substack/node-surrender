surrender
=========

Draw lines and shapes on the terminal.

examples
========

rhombus.js
----------

``` js
var render = require('surrender')({
    from : [ [ -1, 1 ], [ -1, 1 ] ]
});

render
    .line([ -0.7, 0 ], [ 0, -0.5 ])
    .line([ 0, -0.5 ], [ 0.7, 0 ])
    .line([ 0.7, 0 ], [ 0, 0.5 ])
    .line([ 0, 0.5 ], [ -0.7, 0 ])
;
```

output:

```



                                       \____
                                  /¯¯¯¯     \____
                             /¯¯¯¯               \___
                         /¯¯¯                        \____
                    /¯¯¯¯                                 \____
               /¯¯¯¯                                           \____
           \____                                                   /¯¯¯
                \____                                         /¯¯¯¯
                     \____                               /¯¯¯¯
                          \____                     /¯¯¯¯
                               \___            /¯¯¯¯
                                   \____   /¯¯¯



```

methods
=======

var surrender = require('surrender')

var render = surrender(opts)
----------------------------

Create a new surrender object from `opts`.

The optional `opts.from` specifies a coordinate transform using
[coords](http://github.com/substack/node-coords) so you don't need to think in
cursor coordinates.

You can use `opts.charm` to pass in a custom
[charm](https://github.com/substack/node-charm) instance.

render.line([ x0, y0 ], [ x1, y1 ])
-----------------------------------

Draw a line from `[ x0, y0 ]` to `[ x1, y1 ]`.

Returns `this`.

install
=======

Using [npm](http://npmjs.org) do:

```
npm install surrender
```

license
=======

MIT/X11
