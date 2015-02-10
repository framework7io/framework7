/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(["image_loader"], function(ImageLoader) {
    "use strict";

    var InputStream = {};
    InputStream.createVideoStream = function(video) {
        var that = {},
            _config = null,
            _eventNames = ['canrecord', 'ended'],
            _eventHandlers = {};

        that.getRealWidth = function() {
            return video.videoWidth;
        };

        that.getRealHeight = function() {
            return video.videoHeight;
        };

        that.getWidth = function() {
            return _config.halfSample ? video.videoWidth / 2 : video.videoWidth;
        };

        that.getHeight = function() {
            return _config.halfSample ? video.videoHeight / 2 : video.videoHeight;
        };

        that.setInputStream = function(config) {
            _config = config;
            video.src = config.src;
        };

        that.ended = function() {
            return video.ended;
        };

        that.getConfig = function() {
            return _config;
        };

        that.setAttribute = function(name, value) {
            video.setAttribute(name, value);
        };

        that.pause = function() {
            video.pause();
        };

        that.play = function() {
            video.play();
        };

        that.setCurrentTime = function(time) {
            if (_config.type !== "LiveStream")
                video.currentTime = time;
        };

        that.addEventListener = function(event, f, bool) {
            if (_eventNames.indexOf(event) !== -1) {
                if (!_eventHandlers[event]) {
                    _eventHandlers[event] = [];
                }
                _eventHandlers[event].push(f);
            } else {
                video.addEventListener(event, f, bool);
            }
        };

        that.trigger = function(eventName, args) {
            var j,
                handlers = _eventHandlers[eventName];
                
            if (handlers && handlers.length > 0) {
                for ( j = 0; j < handlers.length; j++) {
                    handlers[j].apply(that, args);
                }
            }
        };

        that.getFrame = function() {
            return video;
        };

        return that;
    };

    InputStream.createLiveStream = function(video) {
        video.setAttribute("autoplay", true);
        var that = InputStream.createVideoStream(video);

        that.ended = function() {
            return false;
        };

        that.getWidth = function() {
            return this.getConfig().halfSample ? video.videoWidth / 2 : video.videoWidth;
        };

        that.getHeight = function() {
            return this.getConfig().halfSample ? video.videoHeight / 2 : video.videoHeight;
        };

        return that;
    };

    InputStream.createImageStream = function() {
        var that = {};
        var _config = null;

        var width = 0,
            height = 0,
            frameIdx = 0,
            paused = true,
            loaded = false,
            imgArray = null,
            size = 0,
            offset = 1,
            baseUrl = null,
            ended = false,
            _eventNames = ['canrecord', 'ended'],
            _eventHandlers = {};

        function loadImages() {
            loaded = false;
            ImageLoader.load(baseUrl, function(imgs) {
                imgArray = imgs;
                width = imgs[0].width;
                height = imgs[0].height;
                loaded = true;
                frameIdx = 0;
                setTimeout(function() {
                    publishEvent("canrecord", []);
                }, 0);
            }, offset, size, _config.sequence);
        }

        function publishEvent(eventName, args) {
            var j,
                handlers = _eventHandlers[eventName];
                
            if (handlers && handlers.length > 0) {
                for ( j = 0; j < handlers.length; j++) {
                    handlers[j].apply(that, args);
                }
            }
        }


        that.trigger = publishEvent;

        that.getWidth = function() {
            return _config.size ? width/height > 1 ? _config.size : (width/height) * _config.size : width;
        };

        that.getHeight = function() {
            return _config.size ? width/height > 1 ? (height/width) * _config.size : _config.size : height;
        };

        that.getRealWidth = function() {
            return width;
        };

        that.getRealHeight = function() {
            return height;
        };

        that.setInputStream = function(stream) {
            _config = stream;
            if (stream.sequence === false) {
                baseUrl = stream.src;
                size = 1;
            } else {
                baseUrl = stream.src;
                size = stream.length;
            }
            loadImages();
        };

        that.ended = function() {
            return ended;
        };

        that.setAttribute = function() {};

        that.getConfig = function() {
            return _config;
        };

        that.pause = function() {
            paused = true;
        };

        that.play = function() {
            paused = false;
        };

        that.setCurrentTime = function(time) {
            frameIdx = time;
        };

        that.addEventListener = function(event, f) {
            if (_eventNames.indexOf(event) !== -1) {
                if (!_eventHandlers[event]) {
                    _eventHandlers[event] = [];
                }
                _eventHandlers[event].push(f);
            }
        };

        that.getFrame = function() {
            var frame;
            
            if (!loaded){
                return null;
            }
            if (!paused) {
                frame = imgArray[frameIdx];
                if (frameIdx < (size - 1)) {
                    frameIdx++;
                } else {
                    setTimeout(function() {
                        ended = true;
                        publishEvent("ended", []);
                    }, 0);
                }
            }
            return frame;
        };

        return that;
    };

    return (InputStream);
});
