/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define,  vec2, importScripts */

define(["code_128_reader", "ean_reader", "input_stream", "image_wrapper", "barcode_locator", "barcode_decoder", "frame_grabber", "html_utils", "config", "events", "camera_access", "async", "image_debug"],
function(Code128Reader, EANReader, InputStream, ImageWrapper, BarcodeLocator, BarcodeDecoder, FrameGrabber, HtmlUtils, _config, Events, CameraAccess, async, ImageDebug) {
    "use strict";
    
    var _inputStream,
        _framegrabber,
        _stopped,
        _canvasContainer = {
            ctx : {
                image : null,
                overlay : null
            },
            dom : {
                image : null,
                overlay : null
            }
        },
        _inputImageWrapper,
        _boxSize,
        _decoder,
        _workerPool = [],
        _onUIThread = true;

    function initializeData(imageWrapper) {
        initBuffers(imageWrapper);
        _decoder = BarcodeDecoder.create(_config.decoder, _inputImageWrapper);
    }

    function initConfig() {
        var vis = [{
            node : document.querySelector("div[data-controls]"),
            prop : _config.controls
        }, {
            node : _canvasContainer.dom.overlay,
            prop : _config.visual.show
        }];

        for (var i = 0; i < vis.length; i++) {
            if (vis[i].node) {
                if (vis[i].prop === true) {
                    vis[i].node.style.display = "block";
                } else {
                    vis[i].node.style.display = "none";
                }
            }
        }
    }

    function initInputStream(cb) {
        var video;
        if (_config.inputStream.type == "VideoStream") {
            video = document.createElement("video");
            _inputStream = InputStream.createVideoStream(video);
        } else if (_config.inputStream.type == "ImageStream") {
            _inputStream = InputStream.createImageStream();
        } else if (_config.inputStream.type == "LiveStream") {
            video = document.createElement("video");
            var $viewport = document.querySelector("#interactive.viewport");
            if($viewport) {
                $viewport.appendChild(video);
            }
            _inputStream = InputStream.createLiveStream(video);
            CameraAccess.request(video, _config.inputStream.constraints, function(err) {
                if (!err) {
                    _inputStream.trigger("canrecord");
                } else {
                    console.log(err);
                }
            });
        }

        _inputStream.setAttribute("preload", "auto");
        _inputStream.setAttribute("autoplay", true);
        _inputStream.setInputStream(_config.inputStream);
        _inputStream.addEventListener("canrecord", canRecord.bind(undefined, cb));
    }

    function canRecord(cb) {
        initCanvas();
        _framegrabber = FrameGrabber.create(_inputStream, _canvasContainer.dom.image);
        initConfig();

        if (_config.numOfWorkers > 0) {
            initWorkers(function() {
                console.log("Workers created");
                ready(cb);
            });
        } else {
            initializeData();
            ready(cb);
        }
    }

    function ready(cb){
        _inputStream.play();
        cb();
    }

    function initCanvas() {
        var $viewport = document.querySelector("#interactive.viewport");
        _canvasContainer.dom.image = document.querySelector("canvas.imgBuffer");
        if (!_canvasContainer.dom.image) {
            _canvasContainer.dom.image = document.createElement("canvas");
            _canvasContainer.dom.image.className = "imgBuffer";
            if($viewport && _config.inputStream.type == "ImageStream") {
                $viewport.appendChild(_canvasContainer.dom.image);
            }
        }
        _canvasContainer.ctx.image = _canvasContainer.dom.image.getContext("2d");
        _canvasContainer.dom.image.width = _inputStream.getWidth();
        _canvasContainer.dom.image.height = _inputStream.getHeight();

        _canvasContainer.dom.overlay = document.querySelector("canvas.drawingBuffer");
        if (!_canvasContainer.dom.overlay) {
            _canvasContainer.dom.overlay = document.createElement("canvas");
            _canvasContainer.dom.overlay.className = "drawingBuffer";
            if($viewport) {
                $viewport.appendChild(_canvasContainer.dom.overlay);
            }
            var clearFix = document.createElement("br");
            clearFix.setAttribute("clear", "all");
            if($viewport) {
                $viewport.appendChild(clearFix);
            }
        }
        _canvasContainer.ctx.overlay = _canvasContainer.dom.overlay.getContext("2d");
        _canvasContainer.dom.overlay.width = _inputStream.getWidth();
        _canvasContainer.dom.overlay.height = _inputStream.getHeight();
    }

    function initBuffers(imageWrapper) {
        if (imageWrapper) {
            _inputImageWrapper = imageWrapper;
        } else {
            _inputImageWrapper = new ImageWrapper({
                x : _inputStream.getWidth(),
                y : _inputStream.getHeight()
            });
        }

        console.log(_inputImageWrapper.size);
        _boxSize = [
                vec2.create([20, _inputImageWrapper.size.y / 2 - 100]),
                vec2.create([20, _inputImageWrapper.size.y / 2 + 100]),
                vec2.create([_inputImageWrapper.size.x - 20, _inputImageWrapper.size.y / 2 + 100]),
                vec2.create([_inputImageWrapper.size.x - 20, _inputImageWrapper.size.y / 2 - 100])
            ];
        BarcodeLocator.init(_inputImageWrapper, _config.locator);
    }

    function getBoundingBoxes() {
        if (_config.locate) {
            return BarcodeLocator.locate();
        } else {
            return [_boxSize];
        }
    }

    function locateAndDecode() {
        var result,
            boxes;

        boxes = getBoundingBoxes();
        if (boxes) {
            result = _decoder.decodeFromBoundingBoxes(boxes);
            result = result || {};
            result.boxes = boxes;
            Events.publish("processed", result);
            if (result && result.codeResult) {
                Events.publish("detected", result);
            }
        } else {
            Events.publish("processed");
        }

    }

    function update() {
        var availableWorker;

        if (_onUIThread) {
            if (_workerPool.length > 0) {
                availableWorker = _workerPool.filter(function(workerThread) {
                    return !workerThread.busy;
                })[0];
                if (availableWorker) {
                    _framegrabber.attachData(availableWorker.imageData);
                } else {
                    return; // all workers are busy
                }
            } else {
                _framegrabber.attachData(_inputImageWrapper.data);
            }
            if (_framegrabber.grab()) {
                if (availableWorker) {
                    availableWorker.busy = true;
                    availableWorker.worker.postMessage({
                        cmd: 'process',
                        imageData: availableWorker.imageData
                    }, [availableWorker.imageData.buffer]);
                } else {
                    locateAndDecode();
                }
            }
        } else {
            locateAndDecode();
        }
    }

    function start() {
        _stopped = false;
        ( function frame() {
            if (!_stopped) {
                update();
                if (_onUIThread && _config.inputStream.type == "LiveStream") {
                    window.requestAnimFrame(frame);
                }
            }
        }());
    }

    function initWorkers(cb) {
        _workerPool = [];

        async.times(_config.numOfWorkers, function(n, next) {
            initWorker(function(workerThread) {
                _workerPool.push(workerThread);
                next(null);
            });
        }, cb);
    }

    function initWorker(cb) {
        var blobURL,
            workerThread = {
                worker: null,
                imageData: new Uint8Array(_inputStream.getWidth() * _inputStream.getHeight()),
                busy: true
            };

        blobURL = generateWorkerBlob();
        workerThread.worker = new Worker(blobURL);
        URL.revokeObjectURL(blobURL);

        workerThread.worker.onmessage = function(e) {
            if (e.data.event === 'initialized') {
                workerThread.busy = false;
                workerThread.imageData = new Uint8Array(e.data.imageData);
                console.log("Worker initialized");
                return cb(workerThread);
            } else if (e.data.event === 'processed') {
                workerThread.imageData = new Uint8Array(e.data.imageData);
                workerThread.busy = false;
                Events.publish("processed", e.data.result);
                if (e.data.result && e.data.result.codeResult) {
                    Events.publish("detected", e.data.result);
                }
            }
        };

        workerThread.worker.postMessage({
            cmd: 'init',
            size: {x: _inputStream.getWidth(), y: _inputStream.getHeight()},
            imageData: workerThread.imageData,
            config: _config
        }, [workerThread.imageData.buffer]);
    }


    function workerInterface(scriptUrl) {
        importScripts(scriptUrl);
        /* jshint ignore:start */
        var imageWrapper;

        self.onmessage = function(e) {
            if (e.data.cmd === 'init') {
                var config = e.data.config;
                config.numOfWorkers = 0;
                imageWrapper = new Quagga.ImageWrapper({
                    x : e.data.size.x,
                    y : e.data.size.y
                }, new Uint8Array(e.data.imageData));
                Quagga.init(config, ready, imageWrapper);
                Quagga.onProcessed(onProcessed);
            } else if (e.data.cmd === 'process') {
                imageWrapper.data = new Uint8Array(e.data.imageData);
                Quagga.start();
            } else if (e.data.cmd === 'setReaders') {
                Quagga.setReaders(e.data.readers);
            }
        };

        function onProcessed(result) {
            self.postMessage({'event': 'processed', imageData: imageWrapper.data, result: result}, [imageWrapper.data.buffer]);
        }

        function ready() {
            self.postMessage({'event': 'initialized', imageData: imageWrapper.data}, [imageWrapper.data.buffer]);
        }
        /* jshint ignore:end */
    }

    function generateWorkerBlob() {
        var blob,
            quaggaAbsoluteUrl,
            scripts = document.getElementsByTagName('script'),
            regex = new RegExp('\/' + _config.scriptName + '$');

        quaggaAbsoluteUrl = Array.prototype.slice.apply(scripts).filter(function(script) {
            return script.src && script.src.match(regex);
        }).map(function(script) {
            return script.src;
        })[0];


        blob = new Blob(['(' + workerInterface.toString() + ')("' + quaggaAbsoluteUrl + '");'],
            {type : 'text/javascript'});

        return window.URL.createObjectURL(blob);
    }

    function setReaders(readers) {
        if (_decoder) {
            _decoder.setReaders(readers);
        } else if (_onUIThread && _workerPool.length > 0) {
            _workerPool.forEach(function(workerThread) {
                workerThread.worker.postMessage({cmd: 'setReaders', readers: readers});
            });
        }
    }

    return {
        init : function(config, cb, imageWrapper) {
            _config = HtmlUtils.mergeObjects(_config, config);
            if (imageWrapper) {
                _onUIThread = false;
                initializeData(imageWrapper);
                return cb();
            } else {
                initInputStream(cb);
            }
        },
        start : function() {
            start();
        },
        stop : function() {
            _stopped = true;
            if (_config.inputStream.type === "LiveStream") {
                CameraAccess.release();
            }
        },
        onDetected : function(callback) {
            Events.subscribe("detected", callback);
        },
        onProcessed: function(callback) {
            Events.subscribe("processed", callback);
        },
        setReaders: function(readers) {
            setReaders(readers);
        },
        canvas : _canvasContainer,
        decodeSingle : function(config, resultCallback) {
            config.inputStream = {
                type : "ImageStream",
                src : config.src,
                sequence : false,
                size: 800
            };
            config.numOfWorkers = 1;
            this.init(config, function() {
                Events.once("detected", function(result) {
                    _stopped = true;
                    resultCallback.call(null, result);
                }, true);
                start();
            });
        },
        Reader: {
          EANReader : EANReader,
          Code128Reader : Code128Reader
        },
        ImageWrapper: ImageWrapper,
        ImageDebug: ImageDebug
    };
});
