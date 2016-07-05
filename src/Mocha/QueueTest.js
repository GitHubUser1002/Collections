var expect = require("expect.js");
var Queue = require("../Queue.js");

describe("Queue", function () {
    var queue = Queue();
    for (var i = 0; i < 10; i++)
        queue.enqueue(i);

    describe("enqueue", function () {
        it("inserts into the end of the queue", function () {
            expect(queue.getLength()).equal(10);
            expect(queue.peek()).equal(0);
        });
    });

    describe("forEach", function () {
        it("iterates through the queue from top to bottom", function () {
            var j = 0;
            queue.forEach(function (i) {
                expect(i).equal(j++);
            });
        });
    });

    describe("dequeue", function () {
        it("removes the top value of the queue", function () {
            for (var i = 0; i < 10; i++)
                expect(i).equal(queue.dequeue());
        });
        it("returns null when the queue is empty", function () {
            expect(null).equal(queue.dequeue());
        });
    });

    describe("isEmpty", function () {
        it("returns true when the queue has no values", function () {
            expect(true).equal(queue.isEmpty());
        });
        it("returns false when the stack has at least one value", function () {
            queue.enqueue(1);
            expect(false).equal(queue.isEmpty());
        });
    });

    describe("empty", function () {
        it("empties the entire queue", function () {
            queue.empty();
            expect(true).equal(queue.isEmpty());
        });
    });

    describe("getLength", function () {
        it("returns the count of values in the queue", function () {
            expect(0).equal(queue.getLength());
            for (var i = 1; i <= 10; i++) {
                queue.enqueue(i);
                expect(i).equal(queue.getLength());
            }
        });
    });

    describe("peek", function () {
        it("shows the top value on the queue", function () {
            expect(1).equal(queue.peek());
        });
        it("returns null when the stack is empty", function () {
            queue.empty();
            expect(null).equal(queue.peek());
        });
    });
});