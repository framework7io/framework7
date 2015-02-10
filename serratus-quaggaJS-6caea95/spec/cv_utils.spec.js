
define(['cv_utils'], function(CVUtils){
    describe('imageRef', function() {
        it('gets the image Reference for a coordinate', function() {
            var res = CVUtils.imageRef(1, 2);
            expect(res.x).to.equal(1);
            expect(res.y).to.equal(2);
            expect(res.toVec2()[0]).to.equal(1);
        });
    });
});
