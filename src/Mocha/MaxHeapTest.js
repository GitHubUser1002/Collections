var expect = require("expect.js");
var MaxHeap = require("../MaxHeap.js").MaxHeap;

describe("MaxHeap", function () {
    var maxHeap = new MaxHeap();

    function seedTree() {
        var length = 10;

        var array = Array.apply(null, Array(length)).map(function (_, i) { return i; });

        for (var i = length; i > 0; i--) {
            var x = Math.floor((Math.random() * length));
            var y = Math.floor((Math.random() * length));

            if (x === y) continue;

            var temp = array[x];
            array[x] = array[y];
            array[y] = temp;
        }

        for (var i = 0; i < array.length; i++) {
            maxHeap.insert(array[i], array[i]);
        }
    }

    describe("insert", function () {
        it("puts a value by key into the heap", function () {
            expect(maxHeap.array.length).equal(0);
            seedTree();
            expect(maxHeap.array.length).equal(10);
        });
    });

    describe("height", function () {
        it("returns the count of levels of the heap", function () {
            expect(maxHeap.height()).equal(Math.floor(Math.log2(maxHeap.array.length)) + 1);
        });
    });

    describe("remove", function () {
        it("deletes and returns the root node from the heap", function () {
            var last = maxHeap.remove().key;
            
            while (maxHeap.array.length > 0) {
                var last2 = maxHeap.remove().key;
                expect(last > last2).equal(true);
                last = last2;
            }
        });
    });

    describe("empty", function () {
        it("removes all nodes from the from the heap", function () {
            expect(maxHeap.isEmpty()).equal(true);
            maxHeap.insert(1, 1);
            expect(maxHeap.isEmpty()).equal(false);
            maxHeap.empty();
            expect(maxHeap.isEmpty()).equal(true);
        });
    });

    describe("isEmpty", function () {
        it("returns true if tree has no nodes", function () {
            expect(maxHeap.isEmpty()).equal(true);
        });

        it("returns false if the tree has one or more nodes", function () {
            maxHeap.insert(1, 1);
            expect(maxHeap.isEmpty()).equal(false);
        });
    });

});