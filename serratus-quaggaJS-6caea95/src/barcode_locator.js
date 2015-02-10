/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define, mat2, vec2 */

define(["image_wrapper", "cv_utils", "rasterizer", "tracer", "skeletonizer", "array_helper", "image_debug"],
function(ImageWrapper, CVUtils, Rasterizer, Tracer, skeletonizer, ArrayHelper, ImageDebug) {
    "use strict";
    
    var _config,
        _currentImageWrapper,
        _skelImageWrapper,
        _subImageWrapper,
        _labelImageWrapper,
        _patchGrid,
        _patchLabelGrid,
        _imageToPatchGrid,
        _binaryImageWrapper,
        _patchSize,
        _canvasContainer = {
            ctx : {
                binary : null
            },
            dom : {
                binary : null
            }
        },
        _numPatches = {x: 0, y: 0},
        _inputImageWrapper,
        _skeletonizer,
        self = this;

    function initBuffers() {
        var skeletonImageData;
        
        if (_config.halfSample) {
            _currentImageWrapper = new ImageWrapper({
                x : _inputImageWrapper.size.x / 2 | 0,
                y : _inputImageWrapper.size.y / 2 | 0
            });
        } else {
            _currentImageWrapper = _inputImageWrapper;
        }

        _patchSize = {
            x : 16 * ( _config.halfSample ? 1 : 2),
            y : 16 * ( _config.halfSample ? 1 : 2)
        };

        _numPatches.x = _currentImageWrapper.size.x / _patchSize.x | 0;
        _numPatches.y = _currentImageWrapper.size.y / _patchSize.y | 0;

        _binaryImageWrapper = new ImageWrapper(_currentImageWrapper.size, undefined, Uint8Array, false);

        _labelImageWrapper = new ImageWrapper(_patchSize, undefined, Array, true);

        skeletonImageData = new ArrayBuffer(64*1024);
        _subImageWrapper = new ImageWrapper(_patchSize, new Uint8Array(skeletonImageData, 0, _patchSize.x * _patchSize.y));
        _skelImageWrapper = new ImageWrapper(_patchSize, new Uint8Array(skeletonImageData, _patchSize.x * _patchSize.y * 3, _patchSize.x * _patchSize.y), undefined, true);
        _skeletonizer = skeletonizer(self, {
            size : _patchSize.x
        }, skeletonImageData);

        _imageToPatchGrid = new ImageWrapper({
            x : (_currentImageWrapper.size.x / _subImageWrapper.size.x) | 0,
            y : (_currentImageWrapper.size.y / _subImageWrapper.size.y) | 0
        }, undefined, Array, true);
        _patchGrid = new ImageWrapper(_imageToPatchGrid.size, undefined, undefined, true);
        _patchLabelGrid = new ImageWrapper(_imageToPatchGrid.size, undefined, Int32Array, true);
    }

    function initCanvas() {
        if (_config.useWorker || typeof document === 'undefined') {
            return;
        }
        _canvasContainer.dom.binary = document.createElement("canvas");
        _canvasContainer.dom.binary.className = "binaryBuffer";
        if (_config.showCanvas === true) {
            document.querySelector("#debug").appendChild(_canvasContainer.dom.binary);
        }
        _canvasContainer.ctx.binary = _canvasContainer.dom.binary.getContext("2d");
        _canvasContainer.dom.binary.width = _binaryImageWrapper.size.x;
        _canvasContainer.dom.binary.height = _binaryImageWrapper.size.y;
    }

    /**
     * Creates a bounding box which encloses all the given patches
     * @returns {Array} The minimal bounding box 
     */
    function boxFromPatches(patches) {
        var overAvg, i, j, patch, transMat, minx = _binaryImageWrapper.size.x, miny = _binaryImageWrapper.size.y, maxx = -_binaryImageWrapper.size.x, maxy = -_binaryImageWrapper.size.y, box, scale;

        // draw all patches which are to be taken into consideration
        overAvg = 0;
        for ( i = 0; i < patches.length; i++) {
            patch = patches[i];
            overAvg += patch.rad;
            if (_config.showPatches) {
                ImageDebug.drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, {color: "red"});
            }
        }

        overAvg /= patches.length;
        overAvg = (overAvg * 180 / Math.PI + 90) % 180 - 90;
        if (overAvg < 0) {
            overAvg += 180;
        }

        //console.log(overAvg);
        overAvg = (180 - overAvg) * Math.PI / 180;
        transMat = mat2.create([Math.cos(overAvg), -Math.sin(overAvg), Math.sin(overAvg), Math.cos(overAvg)]);

        // iterate over patches and rotate by angle
        for ( i = 0; i < patches.length; i++) {
            patch = patches[i];
            for ( j = 0; j < 4; j++) {
                mat2.xVec2(transMat, patch.box[j]);
            }

            if (_config.boxFromPatches.showTransformed) {
                ImageDebug.drawPath(patch.box, {x: 0, y: 1}, _canvasContainer.ctx.binary, {color: '#99ff00', lineWidth: 2});
            }
        }

        // find bounding box
        for ( i = 0; i < patches.length; i++) {
            patch = patches[i];
            for ( j = 0; j < 4; j++) {
                if (patch.box[j][0] < minx) {
                    minx = patch.box[j][0];
                }
                if (patch.box[j][0] > maxx) {
                    maxx = patch.box[j][0];
                }
                if (patch.box[j][1] < miny) {
                    miny = patch.box[j][1];
                }
                if (patch.box[j][1] > maxy) {
                    maxy = patch.box[j][1];
                }
            }
        }

        box = [[minx, miny], [maxx, miny], [maxx, maxy], [minx, maxy]];

        if (_config.boxFromPatches.showTransformedBox) {
            ImageDebug.drawPath(box, {x: 0, y: 1}, _canvasContainer.ctx.binary, {color: '#ff0000', lineWidth: 2});
        }

        scale = _config.halfSample ? 2 : 1;
        // reverse rotation;
        transMat = mat2.inverse(transMat);
        for ( j = 0; j < 4; j++) {
            mat2.xVec2(transMat, box[j]);
        }

        if (_config.boxFromPatches.showBB) {
            ImageDebug.drawPath(box, {x: 0, y: 1}, _canvasContainer.ctx.binary, {color: '#ff0000', lineWidth: 2});
        }
        
        for ( j = 0; j < 4; j++) {
            vec2.scale(box[j], scale);
        }

        return box;
    }

    /**
     * Creates a binary image of the current image
     */
    function binarizeImage() {
        CVUtils.otsuThreshold(_currentImageWrapper, _binaryImageWrapper);
        _binaryImageWrapper.zeroBorder();
        if (_config.showCanvas) {
            _binaryImageWrapper.show(_canvasContainer.dom.binary, 255);
        }
    }
    
    /**
     * Iterate over the entire image
     * extract patches
     */
    function findPatches() {
        var i,
            j,
            x,
            y,
            moments,
            patchesFound = [],
            rasterizer,
            rasterResult,
            patch;
        for ( i = 0; i < _numPatches.x; i++) {
            for ( j = 0; j < _numPatches.y; j++) {

                x = _subImageWrapper.size.x * i;
                y = _subImageWrapper.size.y * j;

                // seperate parts
                skeletonize(x, y);

                // Rasterize, find individual bars
                _skelImageWrapper.zeroBorder();
                ArrayHelper.init(_labelImageWrapper.data, 0);
                rasterizer = Rasterizer.create(_skelImageWrapper, _labelImageWrapper);
                rasterResult = rasterizer.rasterize(0);

                if (_config.showLabels) {
                    _labelImageWrapper.overlay(_canvasContainer.dom.binary, Math.floor(360 / rasterResult.count), {x : x, y : y});
                }

                // calculate moments from the skeletonized patch
                moments = _labelImageWrapper.moments(rasterResult.count);

                // extract eligible patches
                patchesFound = patchesFound.concat(describePatch(moments, [i, j], x, y));
            }
        }
        
        if (_config.showFoundPatches) {
            for ( i = 0; i < patchesFound.length; i++) {
                patch = patchesFound[i];
                ImageDebug.drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, {color: "#99ff00", lineWidth: 2});
            }
        }
        
        return patchesFound;
    }
    
    /**
     * Finds those connected areas which contain at least 6 patches
     * and returns them ordered DESC by the number of contained patches
     * @param {Number} maxLabel 
     */
    function findBiggestConnectedAreas(maxLabel){
        var i,
            sum,
            labelHist = [],
            topLabels = [];
            
        for ( i = 0; i < maxLabel; i++) {
            labelHist.push(0);
        }
        sum = _patchLabelGrid.data.length;
        while (sum--) {
            if (_patchLabelGrid.data[sum] > 0) {
                labelHist[_patchLabelGrid.data[sum] - 1]++;
            }
        }

        labelHist = labelHist.map(function(val, idx) {
            return {
                val : val,
                label : idx + 1
            };
        });

        labelHist.sort(function(a, b) {
            return b.val - a.val;
        });

        // extract top areas with at least 6 patches present
        topLabels = labelHist.filter(function(el) {
            return el.val >= 5;
        });
        
        return topLabels;
    }
    
    /**
     * 
     */
    function findBoxes(topLabels, maxLabel) {
        var i,
            j,
            sum,
            patches = [],
            patch,
            box,
            boxes = [],
            hsv = [0, 1, 1],
            rgb = [0, 0, 0];
            
        for ( i = 0; i < topLabels.length; i++) {
            sum = _patchLabelGrid.data.length;
            patches.length = 0;
            while (sum--) {
                if (_patchLabelGrid.data[sum] === topLabels[i].label) {
                    patch = _imageToPatchGrid.data[sum];
                    patches.push(patch);
                }
            }
            box = boxFromPatches(patches);
            if (box) {
                boxes.push(box);

                // draw patch-labels if requested
                if (_config.showRemainingPatchLabels) {
                    for ( j = 0; j < patches.length; j++) {
                        patch = patches[j];
                        hsv[0] = (topLabels[i].label / (maxLabel + 1)) * 360;
                        CVUtils.hsv2rgb(hsv, rgb);
                        ImageDebug.drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, {color: "rgb(" + rgb.join(",") + ")", lineWidth: 2});
                    }
                }
            }
        }
        return boxes;
    }

    /**
     * Find similar moments (via cluster)
     * @param {Object} moments
     */
    function similarMoments(moments) {
        var clusters = CVUtils.cluster(moments, 0.90);
        var topCluster = CVUtils.topGeneric(clusters, 1, function(e) {
            return e.getPoints().length;
        });
        var points = [], result = [];
        if (topCluster.length === 1) {
            points = topCluster[0].item.getPoints();
            for (var i = 0; i < points.length; i++) {
                result.push(points[i].point);
            }
        }
        return result;
    }

    function skeletonize(x, y) {
        _binaryImageWrapper.subImageAsCopy(_subImageWrapper, CVUtils.imageRef(x, y));
        _skeletonizer.skeletonize();
        
        // Show skeleton if requested
        if (_config.showSkeleton) {
            _skelImageWrapper.overlay(_canvasContainer.dom.binary, 360, CVUtils.imageRef(x, y));
        }
    }

    /**
     * Extracts and describes those patches which seem to contain a barcode pattern
     * @param {Array} moments
     * @param {Object} patchPos,
     * @param {Number} x
     * @param {Number} y
     * @returns {Array} list of patches
     */
    function describePatch(moments, patchPos, x, y) {
        var k, avg, sum = 0, eligibleMoments = [], matchingMoments, patch, patchesFound = [];
        if (moments.length >= 2) {
            // only collect moments which's area covers at least 6 pixels.
            for ( k = 0; k < moments.length; k++) {
                if (moments[k].m00 > 6) {
                    eligibleMoments.push(moments[k]);
                }
            }

            // if at least 2 moments are found which have 6pixels covered
            if (eligibleMoments.length >= 2) {
                sum = eligibleMoments.length;
                matchingMoments = similarMoments(eligibleMoments);
                avg = 0;
                // determine the similarity of the moments
                for ( k = 0; k < matchingMoments.length; k++) {
                    avg += matchingMoments[k].rad;
                }

                // Only two of the moments are allowed not to fit into the equation
                // add the patch to the set
                if (matchingMoments.length > 1 && matchingMoments.length >= (eligibleMoments.length / 4) * 3 && matchingMoments.length > moments.length / 4) {
                    avg /= matchingMoments.length;
                    patch = {
                        index : patchPos[1] * _numPatches.x + patchPos[0],
                        pos : {
                            x : x,
                            y : y
                        },
                        box : [vec2.create([x, y]), vec2.create([x + _subImageWrapper.size.x, y]), vec2.create([x + _subImageWrapper.size.x, y + _subImageWrapper.size.y]), vec2.create([x, y + _subImageWrapper.size.y])],
                        moments : matchingMoments,
                        rad : avg,
                        vec : vec2.create([Math.cos(avg), Math.sin(avg)])
                    };
                    patchesFound.push(patch);
                }
            }
        }
        return patchesFound;
    }

    /**
     * finds patches which are connected and share the same orientation
     * @param {Object} patchesFound
     */
    function rasterizeAngularSimilarity(patchesFound) {
        var label = 0,
            threshold = 0.95,
            currIdx = 0,
            j,
            patch,
            hsv = [0, 1, 1],
            rgb = [0, 0, 0];

        function notYetProcessed() {
            var i;
            for ( i = 0; i < _patchLabelGrid.data.length; i++) {
                if (_patchLabelGrid.data[i] === 0 && _patchGrid.data[i] === 1) {
                    return i;
                }
            }
            return _patchLabelGrid.length;
        }

        function trace(currentIdx) {
            var x, y, currentPatch, patch, idx, dir, current = {
                x : currentIdx % _patchLabelGrid.size.x,
                y : (currentIdx / _patchLabelGrid.size.x) | 0
            }, similarity;

            if (currentIdx < _patchLabelGrid.data.length) {
                currentPatch = _imageToPatchGrid.data[currentIdx];
                // assign label
                _patchLabelGrid.data[currentIdx] = label;
                for ( dir = 0; dir < Tracer.searchDirections.length; dir++) {
                    y = current.y + Tracer.searchDirections[dir][0];
                    x = current.x + Tracer.searchDirections[dir][1];
                    idx = y * _patchLabelGrid.size.x + x;

                    // continue if patch empty
                    if (_patchGrid.data[idx] === 0) {
                        _patchLabelGrid.data[idx] = Number.MAX_VALUE;
                        continue;
                    }

                    patch = _imageToPatchGrid.data[idx];
                    if (_patchLabelGrid.data[idx] === 0) {
                        similarity = Math.abs(vec2.dot(patch.vec, currentPatch.vec));
                        if (similarity > threshold) {
                            trace(idx);
                        }
                    }
                }
            }
        }
        
        // prepare for finding the right patches
        ArrayHelper.init(_patchGrid.data, 0);
        ArrayHelper.init(_patchLabelGrid.data, 0);
        ArrayHelper.init(_imageToPatchGrid.data, null);

        for ( j = 0; j < patchesFound.length; j++) {
            patch = patchesFound[j];
            _imageToPatchGrid.data[patch.index] = patch;
            _patchGrid.data[patch.index] = 1;
        }

        // rasterize the patches found to determine area
        _patchGrid.zeroBorder();

        while (( currIdx = notYetProcessed()) < _patchLabelGrid.data.length) {
            label++;
            trace(currIdx);
        }
        
        // draw patch-labels if requested
        if (_config.showPatchLabels) {
            for ( j = 0; j < _patchLabelGrid.data.length; j++) {
                if (_patchLabelGrid.data[j] > 0 && _patchLabelGrid.data[j] <= label) {
                    patch = _imageToPatchGrid.data[j];
                    hsv[0] = (_patchLabelGrid.data[j] / (label + 1)) * 360;
                    CVUtils.hsv2rgb(hsv, rgb);
                    ImageDebug.drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, {color: "rgb(" + rgb.join(",") + ")", lineWidth: 2});
                }
            }
        }
        
        return label;
    }

    return {
        init : function(inputImageWrapper, config) {
            _config = config;
            _inputImageWrapper = inputImageWrapper;

            initBuffers();
            initCanvas();
        },
        locate : function() {
            var patchesFound,
            topLabels = [],
            boxes = [];

            if (_config.halfSample) {
                CVUtils.halfSample(_inputImageWrapper, _currentImageWrapper);
            }

            binarizeImage();
            patchesFound = findPatches();
            // return unless 5% or more patches are found
            if (patchesFound.length < _numPatches.x * _numPatches.y * 0.05) {
                return null;
            }

            // rasterrize area by comparing angular similarity;
            var maxLabel = rasterizeAngularSimilarity(patchesFound);
            if (maxLabel <= 1) {
                return null;
            }

            // search for area with the most patches (biggest connected area)
            topLabels = findBiggestConnectedAreas(maxLabel);
            if (topLabels.length === 0) {
                return null;
            }

            boxes = findBoxes(topLabels, maxLabel);
            return boxes;
        }
    };
});

