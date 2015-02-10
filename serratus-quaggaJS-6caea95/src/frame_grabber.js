/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(["cv_utils"], function(CVUtils) {
    "use strict";

    var FrameGrabber = {};

    FrameGrabber.create = function(inputStream, canvas) {
        var _that = {},
            _streamConfig = inputStream.getConfig(),
            _video_size = CVUtils.imageRef(inputStream.getRealWidth(), inputStream.getRealHeight()),
            _size =_streamConfig.size ? CVUtils.imageRef(_streamConfig.size, _streamConfig.size) : _video_size,
            _sx = 0,
            _sy = 0,
            _dx = 0,
            _dy = 0,
            _sWidth,
            _dWidth,
            _sHeight,
            _dHeight,
            _canvas = null,
            _ctx = null,
            _data = null;

        // Check if size is given
        if (_streamConfig.size) {
            if (_video_size.x/_video_size.y > 1) {
                _size.x = _streamConfig.size;
                _size.y = (_video_size.y/_video_size.x)*_streamConfig.size;
            } else {
                _size.y = _streamConfig.size;
                _size.x = (_video_size.x/_video_size.y)*_streamConfig.size;
            }
        }
        
        _sWidth = _video_size.x;
        _dWidth = _size.x;
        _sHeight = _video_size.y;
        _dHeight = _size.y;

        _canvas = canvas ? canvas : document.createElement("canvas");
        _canvas.width = _size.x;
        _canvas.height = _size.y;
        _ctx = _canvas.getContext("2d");
        _data = new Uint8Array(_size.x * _size.y);

        /**
         * Uses the given array as frame-buffer 
         */
        _that.attachData = function(data) {
            _data = data;
        };

        /**
         * Returns the used frame-buffer
         */
        _that.getData = function() {
            return _data;
        };

        /**
         * Fetches a frame from the input-stream and puts into the frame-buffer.
         * The image-data is converted to gray-scale and then half-sampled if configured.
         */
        _that.grab = function() {
            var doHalfSample = _streamConfig.halfSample,
                frame = inputStream.getFrame(),
                ctxData;
            if (frame) {
                _ctx.drawImage(frame, _sx, _sy, _sWidth, _sHeight, _dx, _dy, _dWidth, _dHeight);
                ctxData = _ctx.getImageData(0, 0, _size.x, _size.y).data;
                if(doHalfSample){
                    CVUtils.grayAndHalfSampleFromCanvasData(ctxData, _size, _data);
                } else {
                    CVUtils.computeGray(ctxData, _data);
                }
                return true;
            } else {
                return false;
            }
        };

        _that.getSize = function() {
            return _size;
        };

        return _that;
    };

    return (FrameGrabber);
});
