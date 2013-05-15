var assert = require('assert');
var introsort = require('./');

var test = [4,2,10,8282,338,228,550,328,969,2828,1010,292,84,28,3];
var expected = test.slice(0);
expected.sort(function(a,b) { return a-b; });

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i]) return false;
    }
    return true;
}

describe('sorting an array', function() {
    it('should sort correctly', function() {
        var sorted = test.slice(0);
        introsort(sorted);
        assert(arraysEqual(sorted, expected), "Expected " + expected.join(',') + " got " + sorted.join(","));
    });
});
