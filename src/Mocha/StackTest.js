var expect = require("expect.js");
var Stack = require("../Stack.js");

describe("Stack", function () {
    var stack = Stack();
    for (var i = 0; i < 10; i++)
        stack.push(i);

    describe("push", function () {
        it("inserts into the top of the stack", function() {
            expect(stack.getLength()).equal(10);
            expect(stack.peek()).equal(9);
        });
    });

    describe("forEach", function () {
        it("iterates through the stack from top to bottom", function () {
            var j = 9;
            stack.forEach(function (i) {
                expect(i).equal(j--);
            });
        });
    });

    describe("pop", function () {
        it("removes the top value of the stack", function () {
            for (var i = 9; i >= 0; i--)
                expect(i).equal(stack.pop());
        });
        it("returns null when the stack is empty", function () {
            expect(null).equal(stack.pop());
        });
    });

    describe("isEmpty", function () {
        it("returns true when the stack has no values", function () {
            expect(true).equal(stack.isEmpty());
        });
        it("returns false when the stack has at least one value", function () {
            stack.push(1);
            expect(false).equal(stack.isEmpty());
        });
    });

    describe("empty", function () {
        it("empties the entire stack", function () {
            stack.empty();
            expect(true).equal(stack.isEmpty());
        });
    });

    describe("getLength", function () {
        it("returns the count of values in the stack", function () {
            expect(0).equal(stack.getLength());
            for (var i = 1; i <= 10; i++) {
                stack.push(i);
                expect(i).equal(stack.getLength());
            }
        });
    });

    describe("peek", function () {
        it("shows the top value on the stack", function () {
            expect(10).equal(stack.peek());
        });
        it("returns null when the stack is empty", function () {
            stack.empty();
            expect(null).equal(stack.peek());
        });
    });
});