/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(["bresenham", "image_debug", 'code_128_reader', 'ean_reader'], function(Bresenham, ImageDebug, Code128Reader, EANReader) {
    "use strict";
    
    var readers = {
        code_128_reader: Code128Reader,
        ean_reader: EANReader
    };
    var BarcodeDecoder = {
        create : function(config, inputImageWrapper) {
            var _canvas = {
                ctx : {
                        frequency : null,
                        pattern : null,
                        overlay : null
                    },
                    dom : {
                        frequency : null,
                        pattern : null,
                        overlay : null
                    }
                },
                _barcodeReaders = [],
                _barcodeReader = null;
            
            initCanvas();
            initReaders();
            initConfig();

            function initCanvas() {
                if (typeof document !== 'undefined') {
                    var $debug = document.querySelector("#debug.detection");
                    _canvas.dom.frequency = document.querySelector("canvas.frequency");
                    if (!_canvas.dom.frequency) {
                        _canvas.dom.frequency = document.createElement("canvas");
                        _canvas.dom.frequency.className = "frequency";
                        if($debug) {
                            $debug.appendChild(_canvas.dom.frequency);
                        }
                    }
                    _canvas.ctx.frequency = _canvas.dom.frequency.getContext("2d");

                    _canvas.dom.pattern = document.querySelector("canvas.patternBuffer");
                    if (!_canvas.dom.pattern) {
                        _canvas.dom.pattern = document.createElement("canvas");
                        _canvas.dom.pattern.className = "patternBuffer";
                        if($debug) {
                            $debug.appendChild(_canvas.dom.pattern);
                        }
                    }
                    _canvas.ctx.pattern = _canvas.dom.pattern.getContext("2d");

                    _canvas.dom.overlay = document.querySelector("canvas.drawingBuffer");
                    if (_canvas.dom.overlay) {
                        _canvas.ctx.overlay = _canvas.dom.overlay.getContext("2d");
                    }
                }
            }

            function initReaders() {
                var i;
                for ( i = 0; i < config.readers.length; i++) {
                    console.log(config.readers[i]);
                    _barcodeReaders.push(new readers[config.readers[i]]());
                }
            }

            function initConfig() {
                if (typeof document !== 'undefined') {
                    var i,
                        vis = [{
                            node : _canvas.dom.frequency,
                            prop : config.showFrequency
                        }, {
                            node : _canvas.dom.pattern,
                            prop : config.showPattern
                        }];

                    for (i = 0; i < vis.length; i++) {
                        if (vis[i].prop === true) {
                            vis[i].node.style.display = "block";
                        } else {
                            vis[i].node.style.display = "none";
                        }
                    }
                }
            }

            /**
             * extend the line on both ends 
             * @param {Array} line
             * @param {Number} angle 
             */
            function getExtendedLine(line, angle, ext) {
                var extension = {
                        y : ext * Math.sin(angle),
                        x : ext * Math.cos(angle)
                    };
                    
                line[0].y -= extension.y;
                line[0].x -= extension.x;
                line[1].y += extension.y;
                line[1].x += extension.x;

                // check if inside image
                if (!inputImageWrapper.inImageWithBorder(line[0], 0) || !inputImageWrapper.inImageWithBorder(line[1], 0)) {
                    return null;
                }
                return line;
            }
            
            function getLine(box) {
                return [{
                    x : (box[1][0] - box[0][0]) / 2 + box[0][0],
                    y : (box[1][1] - box[0][1]) / 2 + box[0][1]
                }, {
                    x : (box[3][0] - box[2][0]) / 2 + box[2][0],
                    y : (box[3][1] - box[2][1]) / 2 + box[2][1]
                }];
            }
            
            function tryDecode(line) {
                var result = null,
                    i,
                    barcodeLine = Bresenham.getBarcodeLine(inputImageWrapper, line[0], line[1]);
                    
                if (config.showFrequency) {
                    ImageDebug.drawPath(line, {x: 'x', y: 'y'}, _canvas.ctx.overlay, {color: 'red', lineWidth: 3});
                    Bresenham.debug.printFrequency(barcodeLine.line, _canvas.dom.frequency);
                }
                Bresenham.toBinaryLine(barcodeLine);
                if (config.showPattern) {
                    Bresenham.debug.printPattern(barcodeLine.line, _canvas.dom.pattern);
                }
                
                for ( i = 0; i < _barcodeReaders.length && result === null; i++) {
                    result = _barcodeReaders[i].decodePattern(barcodeLine.line);
                    if (result !== null) {
                        _barcodeReader = _barcodeReaders[i];
                    }
                }
                if(result === null){
                    return null;
                }
                return {
                    codeResult: result,
                    barcodeLine: barcodeLine
                };
                
            }
            
            /**
             * This method slices the given area apart and tries to detect a barcode-pattern
             * for each slice. It returns the decoded barcode, or null if nothing was found
             * @param {Array} box
             * @param {Array} line
             * @param {Number} lineAngle 
             */
            function tryDecodeBruteForce(box, line, lineAngle) {
                var sideLength = Math.sqrt(Math.pow(box[1][0] - box[0][0], 2) + Math.pow((box[1][1] - box[0][1]), 2)),
                    i,
                    slices = 16,
                    result = null,
                    dir,
                    extension,
                    xdir = Math.sin(lineAngle),
                    ydir = Math.cos(lineAngle);
                    
                for ( i = 1; i < slices && result === null; i++) {
                    // move line perpendicular to angle
                    dir = sideLength / slices * i * (i % 2 === 0 ? -1 : 1);
                    extension = {
                        y : dir * xdir,
                        x : dir * ydir
                    };
                    line[0].y += extension.x;
                    line[0].x -= extension.y;
                    line[1].y += extension.x;
                    line[1].x -= extension.y;

                    result = tryDecode(line);
                }
                return result;
            }

            /**
             * With the help of the configured readers (Code128 or EAN) this function tries to detect a 
             * valid barcode pattern within the given area.
             * @param {Object} box The area to search in
             * @returns {Object} the result {codeResult, line, angle, pattern, threshold}
             */
            function decodeFromBoundingBox(box) {
                var line,
                    lineAngle,
                    ctx = _canvas.ctx.overlay,
                    result;

                if (config.drawBoundingBox && ctx) {
                    ImageDebug.drawPath(box, {x: 0, y: 1}, ctx, {color: "blue", lineWidth: 2});
                }

                line = getLine(box);
                lineAngle = Math.atan2(line[1].y - line[0].y, line[1].x - line[0].x);
                line = getExtendedLine(line, lineAngle, 10);
                if(line === null){
                    return null;
                }

                result = tryDecode(line);
                if(result === null) {
                    result = tryDecodeBruteForce(box, line, lineAngle);
                }
                
                if(result === null) {
                    return null;
                }

                if (result && config.drawScanline && ctx) {
                    ImageDebug.drawPath(line, {x: 'x', y: 'y'}, ctx, {color: 'red', lineWidth: 3});
                }

                return {
                    codeResult : result.codeResult,
                    line : line,
                    angle : lineAngle,
                    pattern : result.barcodeLine.line,
                    threshold : result.barcodeLine.threshold
                };
            }

            return {
                decodeFromBoundingBox : function(box) {
                    return decodeFromBoundingBox(box);
                },
                decodeFromBoundingBoxes : function(boxes) {
                    var i, result;
                    for ( i = 0; i < boxes.length; i++) {
                        result = decodeFromBoundingBox(boxes[i]);
                        if (result && result.codeResult) {
                            result.box = boxes[i];
                            return result;
                        }
                    }
                },
                setReaders: function(readers) {
                    config.readers = readers;
                    _barcodeReaders.length = 0;
                    initReaders();
                }
            };
        }
    };

    return (BarcodeDecoder);
}); 