define(['array_helper'], function(ArrayHelper){
    describe('init', function() {
        it('initializes an array with the given value', function() {
            var input = [0, 0, 0];
            ArrayHelper.init(input, 5);
            expect(input).to.deep.equal([5, 5, 5]);
        });
    });

    describe('shuffle', function() {
        before(function() {
            sinon.stub(Math, 'random').returns(0.5);
        });

        after(function() {
            sinon.restore(Math);
        });
        it('shuffles the content of an array', function() {
            var input = [1, 2, 3];
            expect(ArrayHelper.shuffle(input)).to.deep.equal([3, 1, 2]);
        });
    });

    describe('toPointList', function() {
        it('converts an Array to a List of poitns', function() {
            var input = [[1, 2], [2, 2], [3, 2]];
            expect(ArrayHelper.toPointList(input)).to.equal("[[1,2],\r\n[2,2],\r\n[3,2]]");
        });
    });

    describe('threshold', function() {
        it('returns all elements above the given threshold', function() {
            var input = [1, 2, 3];
            expect(ArrayHelper.threshold(input, 2, function(score) { 
                return score * 1.5;
            })).to.deep.equal([2, 3]);
        });
    });

    describe('maxIndex', function() {
        it('gets the index of the biggest element in the array', function() {
            var input = [1, 2, 3];
            expect(ArrayHelper.maxIndex(input)).to.equal(2);
        });
    });

    describe('max', function() {
        it('gets the biggest element in the array', function() {
            var input = [1, 3, 2];
            expect(ArrayHelper.max(input)).to.equal(3);
        });
    });
});
