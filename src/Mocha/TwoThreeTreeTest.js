var expect = require("expect.js");
var TwoThreeTree = require("../TwoThreeTree.js").TwoThreeTree;

describe("TwoThreeTree", function () {
    var twoThreeTree = new TwoThreeTree();

    var length = 75;

    function seedTree() {
        var array = Array.apply(null, Array(length)).map(function (_, i) { return i; });

        for (var i = length; i > 0; i--) {
            var x = Math.floor((Math.random() * length));
            var y = Math.floor((Math.random() * length));

            if (x === y) continue;

            var temp = array[x];
            array[x] = array[y];
            array[y] = temp;
        }

        //console.log(array);

        for (var i = 0; i < array.length; i++) {
            twoThreeTree.insert(array[i], array[i]);

            var list = [];
            twoThreeTree.toString(function (value) {
                list.push(value);
            });
            expect(list.length).equal(i + 1);
        }

    }

    describe("insert", function () {
        it("puts a value by key into the heap", function () {
            seedTree();

            var count = 0;
            var lastvalue = -1;
            twoThreeTree.toString(function (value) {
                count++;
                expect(lastvalue < value).equal(true);
                lastvalue = value;
            });

            expect(count).equal(length);
        });
    });

    describe("remove", function () {
        it("deletes and returns the root node from the heap", function () {

            var num = 75;
            var array = Array.apply(null, Array(num)).map(function (_, i) { return i; });

            for (var i = num; i > 0; i--) {
                var x = Math.floor((Math.random() * num));
                var y = Math.floor((Math.random() * num));

                if (x === y) continue;

                var temp = array[x];
                array[x] = array[y];
                array[y] = temp;
            }

            for (var j = 0; j < num; j++) {
                var i = array[j];

                expect(twoThreeTree.search(i)).equal(i);
                twoThreeTree.remove(i);
                expect(twoThreeTree.search(i)).equal(null);

                continue;
            }
        });
    });

    describe("isEmpty", function () {
        it("returns true if tree has no nodes", function () {
            expect(twoThreeTree.isEmpty()).equal(true);
            twoThreeTree.insert(0, 0);
            expect(twoThreeTree.isEmpty()).equal(false);
        });
    });

    describe("empty", function () {
        it("removes all nodes from the from the heap", function () {
            expect(twoThreeTree.isEmpty()).equal(false);
            twoThreeTree.empty();
            expect(twoThreeTree.isEmpty()).equal(true);
        });
    });

});