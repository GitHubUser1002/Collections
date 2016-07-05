var expect = require("expect.js");
var BinarySearchTree = require("../BinarySearchTree.js").BinarySearchTree;

describe("BinarySearchTree", function () {
    var binarySearchTree = new BinarySearchTree();

    function seedTree() {
        var array = Array.apply(null, Array(100)).map(function (_, i) { return i; });

        for (var i = 100; i > 0; i--) {
            var x = Math.floor((Math.random() * 100));
            var y = Math.floor((Math.random() * 100));

            if (x === y) continue;

            var temp = array[x];
            array[x] = array[y];
            array[y] = temp;
        }

        for (var i = 0; i < array.length; i++)
            binarySearchTree.insert(array[i], array[i]);
    }

    describe("insert", function () {
        it("puts a value by key into the tree", function () {
            expect(binarySearchTree.count()).equal(0);

            seedTree();

            expect(binarySearchTree.count()).equal(100);
        });

        it("replaces a value by key into the tree if the key already exists", function () {
            expect(binarySearchTree.find(10)).equal(10);
            binarySearchTree.insert(10, -10);
            expect(binarySearchTree.find(10)).equal(-10);
        });
    });

    describe("find", function () {
        it("returns the value assiciated with a specified key that exists in the tree", function () {
            expect(binarySearchTree.find(55)).equal(55);
        });

        it("returns the value assiciated with a specified key that exists in the tree", function () {
            expect(binarySearchTree.find(binarySearchTree.count() + 1)).equal(null);
        });
    });

    describe("count", function () {
        it("returns number of nuodes in the tree", function () {
            expect(binarySearchTree.count()).equal(100);
        });
    });

    describe("height", function () {
        it("returns the count of levels of the tree", function () {
            expect((Math.floor(Math.log2(binarySearchTree.count())) + 1) <= binarySearchTree.height()).equal(true);
        });
    });

    describe("isBalanced", function () {
        it("returns true if the left and right subtrees have heights within one of each other", function () {
            expect((Math.floor(Math.log2(binarySearchTree.count())) + 1) === binarySearchTree.height()).equal(binarySearchTree.isBalanced());
        });
    });

    describe("balance", function () {
        it("rebuilds the tree to be balanced", function () {
            binarySearchTree.balance();
            expect(binarySearchTree.height()).equal(Math.floor(Math.log2(binarySearchTree.count())) + 1);
        });
    });

    describe("forEach", function () {
        it("iterates over each node in the tree in sequential key order", function () {
            var last = -1;

            binarySearchTree.forEach(function (key, value) {
                expect(key > last).equal(true);
                last = key;
            });
        });
    });

    describe("remove", function () {
        it("deletes a node with the specified key from the tree if the key exists in the tree", function () {
            for (var i = 50; i > 0; i--) {
                var x = Math.floor((Math.random() * 100));
                binarySearchTree.remove(x);
            }
        });
    });

    describe("empty", function () {
        it("removes all nodes from the from the tree", function () {
            expect(binarySearchTree.count() > 0).equal(true);
            binarySearchTree.empty();
            expect(binarySearchTree.count()).equal(0);
        });
    });

    describe("isEmpty", function () {
        it("returns true if tree has no nodes", function () {
            expect(binarySearchTree.isEmpty()).equal(true);
            binarySearchTree.insert(1, 1);
            expect(binarySearchTree.isEmpty()).equal(false);
        });

        it("returns false if the tree has one or more nodes", function () {
            expect(binarySearchTree.isEmpty()).equal(false);
            binarySearchTree.empty();
            expect(binarySearchTree.isEmpty()).equal(true);
        });
    });

});