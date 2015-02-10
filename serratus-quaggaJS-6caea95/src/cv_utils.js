/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define, vec2, vec3 */

define(['cluster', 'glMatrixAddon', "array_helper"], function(Cluster2, glMatrixAddon, ArrayHelper) {

    "use strict";
    /*
    * cv_utils.js
    * Collection of CV functions and libraries
    */

    /**
     * Namespace for various CV alorithms
     * @class Represents a collection of useful CV algorithms/functions
     */

    var CVUtils = {};

    /**
     * @param x x-coordinate
     * @param y y-coordinate
     * @return ImageReference {x,y} Coordinate
     */
    CVUtils.imageRef = function(x, y) {
        var that = {
            x : x,
            y : y,
            toVec2 : function() {
                return vec2.create([this.x, this.y]);
            },
            toVec3 : function() {
                return vec3.create([this.x, this.y, 1]);
            },
            round : function() {
                this.x = this.x > 0.0 ? Math.floor(this.x + 0.5) : Math.floor(this.x - 0.5);
                this.y = this.y > 0.0 ? Math.floor(this.y + 0.5) : Math.floor(this.y - 0.5);
                return this;
            }
        };
        return that;
    };

    /**
     * Computes an integral image of a given grayscale image.
     * @param imageDataContainer {ImageDataContainer} the image to be integrated
     */
    CVUtils.computeIntegralImage2 = function(imageWrapper, integralWrapper) {
        var imageData = imageWrapper.data;
        var width = imageWrapper.size.x;
        var height = imageWrapper.size.y;
        var integralImageData = integralWrapper.data;
        var sum = 0, posA = 0, posB = 0, posC = 0, posD = 0, x, y;

        // sum up first column
        posB = width;
        sum = 0;
        for ( y = 1; y < height; y++) {
            sum += imageData[posA];
            integralImageData[posB] += sum;
            posA += width;
            posB += width;
        }

        posA = 0;
        posB = 1;
        sum = 0;
        for ( x = 1; x < width; x++) {
            sum += imageData[posA];
            integralImageData[posB] += sum;
            posA++;
            posB++;
        }

        for ( y = 1; y < height; y++) {
            posA = y * width + 1;
            posB = (y - 1) * width + 1;
            posC = y * width;
            posD = (y - 1) * width;
            for ( x = 1; x < width; x++) {
                integralImageData[posA] += imageData[posA] + integralImageData[posB] + integralImageData[posC] - integralImageData[posD];
                posA++;
                posB++;
                posC++;
                posD++;
            }
        }
    };

    CVUtils.computeIntegralImage = function(imageWrapper, integralWrapper) {
        var imageData = imageWrapper.data;
        var width = imageWrapper.size.x;
        var height = imageWrapper.size.y;
        var integralImageData = integralWrapper.data;
        var sum = 0;

        // sum up first row
        for (var i = 0; i < width; i++) {
            sum += imageData[i];
            integralImageData[i] = sum;
        }

        for (var v = 1; v < height; v++) {
            sum = 0;
            for (var u = 0; u < width; u++) {
                sum += imageData[v * width + u];
                integralImageData[((v) * width) + u] = sum + integralImageData[(v - 1) * width + u];
            }
        }
    };

    CVUtils.thresholdImage = function(imageWrapper, threshold, targetWrapper) {
        if (!targetWrapper) {
            targetWrapper = imageWrapper;
        }
        var imageData = imageWrapper.data, length = imageData.length, targetData = targetWrapper.data;

        while (length--) {
            targetData[length] = imageData[length] < threshold ? 1 : 0;
        }
    };

    CVUtils.computeHistogram = function(imageWrapper) {
        var imageData = imageWrapper.data, length = imageData.length, i, hist = new Int32Array(256);

        // init histogram
        for ( i = 0; i < 256; i++) {
            hist[i] = 0;
        }

        while (length--) {
            hist[imageData[length]]++;
        }
        return hist;
    };

    CVUtils.otsuThreshold = function(imageWrapper, targetWrapper) {
        var hist, threshold;

        function px(init, end) {
            var sum = 0, i;
            for ( i = init; i <= end; i++) {
                sum += hist[i];
            }
            return sum;
        }

        function mx(init, end) {
            var i, sum = 0;

            for ( i = init; i <= end; i++) {
                sum += i * hist[i];
            }

            return sum;
        }

        function determineThreshold() {
            var vet = [0], p1, p2, p12, k, m1, m2, m12;

            hist = CVUtils.computeHistogram(imageWrapper);
            for ( k = 1; k < 255; k++) {
                p1 = px(0, k);
                p2 = px(k + 1, 255);
                p12 = p1 * p2;
                if (p12 === 0) {
                    p12 = 1;
                }
                m1 = mx(0, k) * p2;
                m2 = mx(k + 1, 255) * p1;
                m12 = m1 - m2;
                vet[k] = m12 * m12 / p12;
            }
            return ArrayHelper.maxIndex(vet);
        }

        threshold = determineThreshold();
        CVUtils.thresholdImage(imageWrapper, threshold, targetWrapper);
        return threshold;
    };

    // local thresholding
    CVUtils.computeBinaryImage = function(imageWrapper, integralWrapper, targetWrapper) {
        CVUtils.computeIntegralImage(imageWrapper, integralWrapper);

        if (!targetWrapper) {
            targetWrapper = imageWrapper;
        }
        var imageData = imageWrapper.data;
        var targetData = targetWrapper.data;
        var width = imageWrapper.size.x;
        var height = imageWrapper.size.y;
        var integralImageData = integralWrapper.data;
        var sum = 0, v, u, kernel = 3, A, B, C, D, avg, size = (kernel * 2 + 1) * (kernel * 2 + 1);

        // clear out top & bottom-border
        for ( v = 0; v <= kernel; v++) {
            for ( u = 0; u < width; u++) {
                targetData[((v) * width) + u] = 0;
                targetData[(((height - 1) - v) * width) + u] = 0;
            }
        }

        // clear out left & right border
        for ( v = kernel; v < height - kernel; v++) {
            for ( u = 0; u <= kernel; u++) {
                targetData[((v) * width) + u] = 0;
                targetData[((v) * width) + (width - 1 - u)] = 0;
            }
        }

        for ( v = kernel + 1; v < height - kernel - 1; v++) {
            for ( u = kernel + 1; u < width - kernel; u++) {
                A = integralImageData[(v - kernel - 1) * width + (u - kernel - 1)];
                B = integralImageData[(v - kernel - 1) * width + (u + kernel)];
                C = integralImageData[(v + kernel) * width + (u - kernel - 1)];
                D = integralImageData[(v + kernel) * width + (u + kernel)];
                sum = D - C - B + A;
                avg = sum / (size);
                targetData[v * width + u] = imageData[v * width + u] > (avg + 5) ? 0 : 1;
            }
        }
    };

    CVUtils.cluster = function(points, threshold, property) {
        var i, k, cluster, point, clusters = [];

        if (!property) {
            property = "rad";
        }

        function addToCluster(point) {
            var found = false;
            for ( k = 0; k < clusters.length; k++) {
                cluster = clusters[k];
                if (cluster.fits(point)) {
                    cluster.add(point);
                    found = true;
                }
            }
            return found;
        }

        // iterate over each cloud
        for ( i = 0; i < points.length; i++) {
            point = Cluster2.createPoint(points[i], i, property);
            if (!addToCluster(point)) {
                clusters.push(Cluster2.create(point, threshold));
            }
        }

        return clusters;

    };

    CVUtils.Tracer = {
        trace : function(points, vec) {
            var iteration, maxIterations = 10, top = [], result = [], centerPos = 0, currentPos = 0;

            function trace(idx, forward) {
                var from, to, toIdx, predictedPos, thresholdX = 1, thresholdY = Math.abs(vec[1] / 10), found = false;

                function match(pos, predicted) {
                    if (pos.x > (predicted.x - thresholdX) && pos.x < (predicted.x + thresholdX) && pos.y > (predicted.y - thresholdY) && pos.y < (predicted.y + thresholdY)) {
                        return true;
                    } else {
                        return false;
                    }
                }

                // check if the next index is within the vec specifications
                // if not, check as long as the threshold is met

                from = points[idx];
                if (forward) {
                    predictedPos = {
                        x : from.x + vec[0],
                        y : from.y + vec[1]
                    };
                } else {
                    predictedPos = {
                        x : from.x - vec[0],
                        y : from.y - vec[1]
                    };
                }

                toIdx = forward ? idx + 1 : idx - 1;
                to = points[toIdx];
                while (to && ( found = match(to, predictedPos)) !== true && (Math.abs(to.y - from.y) < vec[1])) {
                    toIdx = forward ? toIdx + 1 : toIdx - 1;
                    to = points[toIdx];
                }

                return found ? toIdx : null;
            }

            for ( iteration = 0; iteration < maxIterations; iteration++) {
                // randomly select point to start with
                centerPos = Math.floor(Math.random() * points.length);

                // trace forward
                top = [];
                currentPos = centerPos;
                top.push(points[currentPos]);
                while (( currentPos = trace(currentPos, true)) !== null) {
                    top.push(points[currentPos]);
                }
                if (centerPos > 0) {
                    currentPos = centerPos;
                    while (( currentPos = trace(currentPos, false)) !== null) {
                        top.push(points[currentPos]);
                    }
                }

                if (top.length > result.length) {
                    result = top;
                }
            }

            return result;

        }
    };

    CVUtils.DILATE = 1;
    CVUtils.ERODE = 2;

    CVUtils.dilate = function(inImageWrapper, outImageWrapper) {
        var v, u, inImageData = inImageWrapper.data, outImageData = outImageWrapper.data, height = inImageWrapper.size.y, width = inImageWrapper.size.x, sum, yStart1, yStart2, xStart1, xStart2;

        for ( v = 1; v < height - 1; v++) {
            for ( u = 1; u < width - 1; u++) {
                yStart1 = v - 1;
                yStart2 = v + 1;
                xStart1 = u - 1;
                xStart2 = u + 1;
                sum = inImageData[yStart1 * width + xStart1]/* +   inImageData[yStart1*width+u] */ + inImageData[yStart1 * width + xStart2] +
                /* inImageData[v*width+xStart1]  + */
                inImageData[v * width + u] + /* inImageData[v*width+xStart2] +*/
                inImageData[yStart2 * width + xStart1]/* +   inImageData[yStart2*width+u]*/ + inImageData[yStart2 * width + xStart2];
                outImageData[v * width + u] = sum > 0 ? 1 : 0;
            }
        }
    };

    CVUtils.erode = function(inImageWrapper, outImageWrapper) {
        var v, u, inImageData = inImageWrapper.data, outImageData = outImageWrapper.data, height = inImageWrapper.size.y, width = inImageWrapper.size.x, sum, yStart1, yStart2, xStart1, xStart2;

        for ( v = 1; v < height - 1; v++) {
            for ( u = 1; u < width - 1; u++) {
                yStart1 = v - 1;
                yStart2 = v + 1;
                xStart1 = u - 1;
                xStart2 = u + 1;
                sum = inImageData[yStart1 * width + xStart1]/* +   inImageData[yStart1*width+u] */ + inImageData[yStart1 * width + xStart2] +
                /* inImageData[v*width+xStart1]  + */
                inImageData[v * width + u] + /* inImageData[v*width+xStart2] +*/
                inImageData[yStart2 * width + xStart1]/* +   inImageData[yStart2*width+u]*/ + inImageData[yStart2 * width + xStart2];
                outImageData[v * width + u] = sum === 5 ? 1 : 0;
            }
        }
    };

    CVUtils.subtract = function(aImageWrapper, bImageWrapper, resultImageWrapper) {
        if (!resultImageWrapper) {
            resultImageWrapper = aImageWrapper;
        }
        var length = aImageWrapper.data.length, aImageData = aImageWrapper.data, bImageData = bImageWrapper.data, cImageData = resultImageWrapper.data;

        while (length--) {
            cImageData[length] = aImageData[length] - bImageData[length];
        }
    };

    CVUtils.bitwiseOr = function(aImageWrapper, bImageWrapper, resultImageWrapper) {
        if (!resultImageWrapper) {
            resultImageWrapper = aImageWrapper;
        }
        var length = aImageWrapper.data.length, aImageData = aImageWrapper.data, bImageData = bImageWrapper.data, cImageData = resultImageWrapper.data;

        while (length--) {
            cImageData[length] = aImageData[length] || bImageData[length];
        }
    };

    CVUtils.countNonZero = function(imageWrapper) {
        var length = imageWrapper.data.length, data = imageWrapper.data, sum = 0;

        while (length--) {
            sum += data[length];
        }
        return sum;
    };

    CVUtils.topGeneric = function(list, top, scoreFunc) {
        var i, minIdx = 0, min = 0, queue = [], score, hit, pos;

        for ( i = 0; i < top; i++) {
            queue[i] = {
                score : 0,
                item : null
            };
        }

        for ( i = 0; i < list.length; i++) {
            score = scoreFunc.apply(this, [list[i]]);
            if (score > min) {
                hit = queue[minIdx];
                hit.score = score;
                hit.item = list[i];
                min = Number.MAX_VALUE;
                for ( pos = 0; pos < top; pos++) {
                    if (queue[pos].score < min) {
                        min = queue[pos].score;
                        minIdx = pos;
                    }
                }
            }
        }

        return queue;
    };

    CVUtils.grayArrayFromImage = function(htmlImage, offsetX, ctx, array) {
        ctx.drawImage(htmlImage, offsetX, 0, htmlImage.width, htmlImage.height);
        var ctxData = ctx.getImageData(offsetX, 0, htmlImage.width, htmlImage.height).data;
        CVUtils.computeGray(ctxData, array);
    };

    CVUtils.grayArrayFromContext = function(ctx, size, offset, array) {
        var ctxData = ctx.getImageData(offset.x, offset.y, size.x, size.y).data;
        CVUtils.computeGray(ctxData, array);
    };

    CVUtils.grayAndHalfSampleFromCanvasData = function(canvasData, size, outArray) {
        var topRowIdx = 0;
        var bottomRowIdx = size.x;
        var endIdx = Math.floor(canvasData.length / 4);
        var outWidth = size.x / 2;
        var outImgIdx = 0;
        var inWidth = size.x;
        var i;

        while (bottomRowIdx < endIdx) {
            for ( i = 0; i < outWidth; i++) {
                outArray[outImgIdx] = Math.floor(((0.299 * canvasData[topRowIdx * 4 + 0] + 0.587 * canvasData[topRowIdx * 4 + 1] + 0.114 * canvasData[topRowIdx * 4 + 2]) + (0.299 * canvasData[(topRowIdx + 1) * 4 + 0] + 0.587 * canvasData[(topRowIdx + 1) * 4 + 1] + 0.114 * canvasData[(topRowIdx + 1) * 4 + 2]) + (0.299 * canvasData[(bottomRowIdx) * 4 + 0] + 0.587 * canvasData[(bottomRowIdx) * 4 + 1] + 0.114 * canvasData[(bottomRowIdx) * 4 + 2]) + (0.299 * canvasData[(bottomRowIdx + 1) * 4 + 0] + 0.587 * canvasData[(bottomRowIdx + 1) * 4 + 1] + 0.114 * canvasData[(bottomRowIdx + 1) * 4 + 2])) / 4);
                outImgIdx++;
                topRowIdx = topRowIdx + 2;
                bottomRowIdx = bottomRowIdx + 2;
            }
            topRowIdx = topRowIdx + inWidth;
            bottomRowIdx = bottomRowIdx + inWidth;
        }

    };

    CVUtils.computeGray = function(imageData, outArray) {
        var l = imageData.length / 4;
        var i = 0;
        for ( i = 0; i < l; i++) {
            //outArray[i] = (0.299*imageData[i*4+0] + 0.587*imageData[i*4+1] + 0.114*imageData[i*4+2]);

            outArray[i] = Math.floor(0.299 * imageData[i * 4 + 0] + 0.587 * imageData[i * 4 + 1] + 0.114 * imageData[i * 4 + 2]);
        }
    };

    CVUtils.loadImageArray = function(src, callback, canvas) {
        if (!canvas)
            canvas = document.createElement('canvas');
        var img = new Image();
        img.callback = callback;
        img.onload = function() {
            canvas.width = this.width;
            canvas.height = this.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(this, 0, 0);
            var array = new Uint8Array(this.width * this.height);
            ctx.drawImage(this, 0, 0);
            var data = ctx.getImageData(0, 0, this.width, this.height).data;
            CVUtils.computeGray(data, array);
            this.callback(array, {
                x : this.width,
                y : this.height
            }, this);
        };
        img.src = src;
    };

    /**
     * @param inImg {ImageWrapper} input image to be sampled
     * @param outImg {ImageWrapper} to be stored in
     */
    CVUtils.halfSample = function(inImgWrapper, outImgWrapper) {
        var inImg = inImgWrapper.data;
        var inWidth = inImgWrapper.size.x;
        var outImg = outImgWrapper.data;
        var topRowIdx = 0;
        var bottomRowIdx = inWidth;
        var endIdx = inImg.length;
        var outWidth = inWidth / 2;
        var outImgIdx = 0;
        while (bottomRowIdx < endIdx) {
            for (var i = 0; i < outWidth; i++) {
                outImg[outImgIdx] = Math.floor((inImg[topRowIdx] + inImg[topRowIdx + 1] + inImg[bottomRowIdx] + inImg[bottomRowIdx + 1]) / 4);
                outImgIdx++;
                topRowIdx = topRowIdx + 2;
                bottomRowIdx = bottomRowIdx + 2;
            }
            topRowIdx = topRowIdx + inWidth;
            bottomRowIdx = bottomRowIdx + inWidth;
        }
    };

    CVUtils.hsv2rgb = function(hsv, rgb) {
        var h = hsv[0], s = hsv[1], v = hsv[2], c = v * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = v - c, r = 0, g = 0, b = 0;
        rgb = rgb || [0, 0, 0];

        if (h < 60) {
            r = c;
            g = x;
        } else if (h < 120) {
            r = x;
            g = c;
        } else if (h < 180) {
            g = c;
            b = x;
        } else if (h < 240) {
            g = x;
            b = c;
        } else if (h < 300) {
            r = x;
            b = c;
        } else if (h < 360) {
            r = c;
            b = x;
        }
        rgb[0] = ((r + m) * 255) | 0;
        rgb[1] = ((g + m) * 255) | 0;
        rgb[2] = ((b + m) * 255) | 0;
        return rgb;
    };

    return (CVUtils);
});

