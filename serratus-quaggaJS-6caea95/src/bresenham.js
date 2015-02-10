/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(function() {
    "use strict";
    var Bresenham = {};

    var Slope = {
        DIR : {
            UP : 1,
            DOWN : -1
        }
    };
    /**
     * Scans a line of the given image from point p1 to p2 and returns a result object containing 
     * gray-scale values (0-255) of the underlying pixels in addition to the min
     * and max values.
     * @param {Object} imageWrapper
     * @param {Object} p1 The start point {x,y}
     * @param {Object} p2 The end point {x,y}
     * @returns {line, min, max}
     */
    Bresenham.getBarcodeLine = function(imageWrapper, p1, p2) {
        var x0 = p1.x | 0,
            y0 = p1.y | 0,
            x1 = p2.x | 0,
            y1 = p2.y | 0,
            steep = Math.abs(y1 - y0) > Math.abs(x1 - x0),
            deltax,
            deltay,
            error,
            ystep,
            y,
            tmp,
            x,
            line = [],
            imageData = imageWrapper.data,
            width = imageWrapper.size.x,
            sum = 0,
            val,
            min = 255,
            max = 0;

        function read(a, b) {
            val = imageData[b * width + a];
            sum += val;
            min = val < min ? val : min;
            max = val > max ? val : max;
            line.push(val);
        }

        if (steep) {
            tmp = x0;
            x0 = y0;
            y0 = tmp;

            tmp = x1;
            x1 = y1;
            y1 = tmp;
        }
        if (x0 > x1) {
            tmp = x0;
            x0 = x1;
            x1 = tmp;

            tmp = y0;
            y0 = y1;
            y1 = tmp;
        }
        deltax = x1 - x0;
        deltay = Math.abs(y1 - y0);
        error = (deltax / 2) | 0;
        y = y0;
        ystep = y0 < y1 ? 1 : -1;
        for ( x = x0; x < x1; x++) {
            if(steep){
                read(y, x);
            } else {
                read(x, y);
            }
            error = error - deltay;
            if (error < 0) {
                y = y + ystep;
                error = error + deltax;
            }
        }

        return {
            line : line,
            min : min,
            max : max
        };
    };
    
    /**
     * Converts the result from getBarcodeLine into a binary representation 
     * also considering the frequency and slope of the signal for more robust results
     * @param {Object} result {line, min, max}
     */
    Bresenham.toBinaryLine = function(result) {

        var min = result.min,
            max = result.max,
            line = result.line,
            slope,
            center = min + (max - min) / 2,
            extrema = [],
            currentDir,
            dir,
            threshold = (max - min) / 8,
            rThreshold = -threshold,
            i,
            j;

        // 1. find extrema
        currentDir = line[0] > center ? Slope.DIR.DOWN : Slope.DIR.UP;
        extrema.push({
            pos : 0,
            val : line[0]
        });
        for ( i = 0; i < line.length - 1; i++) {
            slope = (line[i + 1] - line[i]);
            if (slope < rThreshold) {
                dir = Slope.DIR.UP;
            } else if (slope > threshold) {
                dir = Slope.DIR.DOWN;
            } else {
                dir = currentDir;
            }

            if (currentDir !== dir) {
                extrema.push({
                    pos : i,
                    val : line[i]
                });
                currentDir = dir;
            }
        }
        extrema.push({
            pos : line.length,
            val : line[line.length - 1]
        });

        for ( j = extrema[0].pos; j < extrema[1].pos; j++) {
            line[j] = line[j] > center ? 0 : 1;
        }

        // iterate over extrema and convert to binary based on avg between minmax
        for ( i = 1; i < extrema.length - 1; i++) {
            if (extrema[i + 1].val > extrema[i].val) {
                threshold = (extrema[i].val + (extrema[i + 1].val - extrema[i].val) / 2) | 0;
            } else {
                threshold = (extrema[i + 1].val + (extrema[i].val - extrema[i + 1].val) / 2) | 0;
            }

            for ( j = extrema[i].pos; j < extrema[i + 1].pos; j++) {
                line[j] = line[j] > threshold ? 0 : 1;
            }
        }

        return {
            line : line,
            threshold : threshold
        };
    };
    
    /**
     * Used for development only 
     */
    Bresenham.debug = {
        printFrequency: function(line, canvas) {
            var i,
                ctx = canvas.getContext("2d");
            canvas.width = line.length;
            canvas.height = 256;
    
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            for ( i = 0; i < line.length; i++) {
                ctx.moveTo(i, 255);
                ctx.lineTo(i, 255 - line[i]);
            }
            ctx.stroke();
            ctx.closePath();
        },
        
        printPattern: function(line, canvas) {
            var ctx = canvas.getContext("2d"), i;
    
            canvas.width = line.length;
            ctx.fillColor = "black";
            for ( i = 0; i < line.length; i++) {
                if (line[i] === 1) {
                    ctx.fillRect(i, 0, 1, 100);
                }
            }
        }
    };

    return (Bresenham);
}); 