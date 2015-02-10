define(['camera_access'], function(CameraAccess){
    var originalURL,
        originalUserMedia,
        originalMediaStreamTrack,
        video,
        stream;
            
    beforeEach(function() {
        var tracks = [{
            stop: function() {}
        }];
        
        originalURL = window.URL;
        originalUserMedia = window.getUserMedia;
        originalMediaStreamTrack = window.MediaStreamTrack;
        window.MediaStreamTrack = {};
        window.URL = null;
        
        
        stream = {
            getVideoTracks: function() {
                return tracks;
            }
        };
        sinon.spy(tracks[0], "stop");
        navigator.getUserMedia = function(constraints, cb) {
            cb(stream);
        };
        sinon.spy(navigator, "getUserMedia");
        video = {
            src: null,
            addEventListener: function() {
                
            },
            play: function() {
                
            },
            videoWidth: 320,
            videoHeight: 480
        };
        sinon.stub(video, "addEventListener", function(event, cb) {
            cb();
        });
        sinon.stub(video, "play");
    });
    
    afterEach(function() {
        navigator.getUserMedia = originalUserMedia;
        window.URL = originalURL;
        window.MediaStreamTrack = originalMediaStreamTrack;
    });
    
    describe('request', function() {
        it('should request the camera', function(done) {
            CameraAccess.request(video, {}, function() {
                expect(navigator.getUserMedia.calledOnce).to.equal(true);
                expect(video.src).to.deep.equal(stream);
                done();
            });
        });
    });
    
    describe('release', function() {
        it('should release the camera', function(done) {
            CameraAccess.request(video, {}, function() {
                expect(video.src).to.deep.equal(stream);
                CameraAccess.release();
                expect(video.src.getVideoTracks()).to.have.length(1);
                expect(video.src.getVideoTracks()[0].stop.calledOnce).to.equal(true);
                done();
            });
        });
    });
});
