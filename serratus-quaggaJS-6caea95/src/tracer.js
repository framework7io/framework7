/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

/**
 * http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
 */
define(function() {
    "use strict";
    
    var Tracer = {
        searchDirections : [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]],
        create : function(imageWrapper, labelWrapper) {
            var imageData = imageWrapper.data,
                labelData = labelWrapper.data,
                searchDirections = this.searchDirections,
                width = imageWrapper.size.x,
                pos;

            function trace(current, color, label, edgelabel) {
                var i,
                    y,
                    x;

                for ( i = 0; i < 7; i++) {
                    y = current.cy + searchDirections[current.dir][0];
                    x = current.cx + searchDirections[current.dir][1];
                    pos = y * width + x;
                    if ((imageData[pos] === color) && ((labelData[pos] === 0) || (labelData[pos] === label))) {
                        labelData[pos] = label;
                        current.cy = y;
                        current.cx = x;
                        return true;
                    } else {
                        if (labelData[pos] === 0) {
                            labelData[pos] = edgelabel;
                        }
                        current.dir = (current.dir + 1) % 8;
                    }
                }
                return false;
            }

            function vertex2D(x, y, dir) {
                return {
                    dir : dir,
                    x : x,
                    y : y,
                    next : null,
                    prev : null
                };
            }

            function contourTracing(sy, sx, label, color, edgelabel) {
                var Fv = null,
                    Cv,
                    P,
                    ldir,
                    current = {
                        cx : sx,
                        cy : sy,
                        dir : 0
                    };

                if (trace(current, color, label, edgelabel)) {
                    Fv = vertex2D(sx, sy, current.dir);
                    Cv = Fv;
                    ldir = current.dir;
                    P = vertex2D(current.cx, current.cy, 0);
                    P.prev = Cv;
                    Cv.next = P;
                    P.next = null;
                    Cv = P;
                    do {
                        current.dir = (current.dir + 6) % 8;
                        trace(current, color, label, edgelabel);
                        if (ldir != current.dir) {
                            Cv.dir = current.dir;
                            P = vertex2D(current.cx, current.cy, 0);
                            P.prev = Cv;
                            Cv.next = P;
                            P.next = null;
                            Cv = P;
                        } else {
                            Cv.dir = ldir;
                            Cv.x = current.cx;
                            Cv.y = current.cy;
                        }
                        ldir = current.dir;
                    } while(current.cx != sx || current.cy != sy);
                    Fv.prev = Cv.prev;
                    Cv.prev.next = Fv;
                }
                return Fv;
            }

            return {
                trace : function(current, color, label, edgelabel) {
                    return trace(current, color, label, edgelabel);
                },
                contourTracing : function(sy, sx, label, color, edgelabel) {
                    return contourTracing(sy, sx, label, color, edgelabel);
                }
            };
        }
    };

    return (Tracer);
});
