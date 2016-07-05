var expect = require("expect.js");
var AvlTree = require("../AvlTree.js").AvlTree;

describe("AvlTree", function () {
    var avlTree = new AvlTree();

    function seedTree() {
        var length = 100;

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
            avlTree.insert(array[i], array[i]);
            expect(avlTree.isBalanced()).equal(true);
        }
    }

    describe("insert", function () {
        it("puts a value by key into the heap", function () {
            seedTree();
        });
    });

    describe("height", function () {
        it("returns the count of levels of the heap", function () {
            //expect(avlTree.height()).equal(Math.floor(Math.log2(50)) + 1);
        });
    });

    describe("remove", function () {
        it("deletes and returns the root node from the heap", function () {
            for (var i = 0; i < 100; i++) {
                expect(avlTree.find(i)).equal(i);
                avlTree.remove(i);
                expect(avlTree.find(i)).equal(null);
                expect(avlTree.isBalanced()).equal(true);
            }
        });
    });

    describe("isEmpty", function () {
        it("returns true if tree has no nodes", function () {
            expect(avlTree.isEmpty()).equal(true);
            avlTree.insert(0, 0);
            expect(avlTree.isEmpty()).equal(false);
        });
    });

    describe("empty", function () {
        it("removes all nodes from the from the heap", function () {
            expect(avlTree.isEmpty()).equal(false);
            avlTree.empty();
            expect(avlTree.isEmpty()).equal(true);
        });
    });

});