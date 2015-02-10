define(['events'], function(Events){
    beforeEach(function() {
        Events.unsubscribe();
    });
    describe("subscribe", function() {
        
        
        it("should call one callback for a single event", function() {
            var callbackA = sinon.stub(),
                callbackB = sinon.stub();
                
            Events.subscribe("test", callbackA);
            Events.subscribe("test", callbackB);
            Events.publish("test");
            
            expect(callbackA.calledOnce).to.be.equal(true);
            expect(callbackB.calledOnce).to.be.equal(true);
        });
        
        it("should call one callback twice if published twice", function() {
            var callback = sinon.stub();
            
            Events.subscribe("test", callback);
            
            Events.publish("test");
            Events.publish("test");
            
            expect(callback.calledTwice).to.be.equal(true);
        });
        
        it("should call the callback asynchronuously", function(done) {
            var test = {
                    callback: function() {
                        
                    }
                };
            
            sinon.stub(test, "callback", function() {
                expect(test.callback.calledOnce).to.be.true;
                done();
            });
            Events.subscribe("test", test.callback, true);
            Events.publish("test");
            expect(test.callback.called).to.be.false;
        });
    });
    
    describe("once", function() {
        it("should call the callback once, even when published twice", function() {
            var callbackA = sinon.stub(),
                callbackB = sinon.stub();
                
            Events.once("test", callbackA);
            Events.subscribe("test", callbackB);
            
            Events.publish("test");
            Events.publish("test");
            
            expect(callbackA.calledOnce).to.be.equal(true);
            expect(callbackB.calledTwice).to.be.equal(true);
        });
    });
    
    describe("unsubscribe", function() {
        it("should unsubscribe all callbacks from a single event", function() {
            var callbackA = sinon.stub(),
                callbackB = sinon.stub(),
                callbackC = sinon.stub();
                
            Events.subscribe("test", callbackA);
            Events.subscribe("test", callbackB);
            Events.subscribe("testC", callbackC);
            
            Events.publish("test");
            
            expect(callbackC.called).to.be.equal(false);
            expect(callbackA.calledOnce).to.be.equal(true);
            expect(callbackB.calledOnce).to.be.equal(true);
            
            Events.publish("testC");
            
            expect(callbackC.calledOnce).to.be.equal(true);
            expect(callbackA.calledOnce).to.be.equal(true);
            expect(callbackB.calledOnce).to.be.equal(true);
            
            Events.unsubscribe("test");
            Events.publish("test");
            
            expect(callbackC.calledOnce).to.be.equal(true);
            expect(callbackA.calledOnce).to.be.equal(true);
            expect(callbackB.calledOnce).to.be.equal(true);
        });
        
        it("should unsubscribe a single callback from a single event", function() {
            var callbackA = sinon.stub(),
                callbackB = sinon.stub();
                
            Events.subscribe("test", callbackA);
            Events.subscribe("test", callbackB);
            
            Events.publish("test");
            
            expect(callbackA.calledOnce).to.be.equal(true);
            expect(callbackB.calledOnce).to.be.equal(true);
            
            
            Events.unsubscribe("test", callbackB);
            Events.publish("test");
            
            expect(callbackA.calledTwice).to.be.equal(true);
            expect(callbackB.calledOnce).to.be.equal(true);
        });
    });
});