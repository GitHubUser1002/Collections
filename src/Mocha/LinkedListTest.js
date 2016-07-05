var expect = require("expect.js");
var LinkedList = require("../LinkedList.js").LinkedList;
var LinkedListNode = require("../LinkedList.js").LinkedListNode;

describe("LinkedList", function () {
    var linkedList = new LinkedList();

    describe("add", function () {
        it("inserts into the end of the linked list", function () {
            linkedList.add(new LinkedListNode(1));
            expect(linkedList.first).equal(linkedList.last);
            expect(linkedList.first.data).equal(1);
            linkedList.add(new LinkedListNode(2));
            expect(linkedList.first.data + 1).equal(linkedList.last.data);
        });
    });

    describe("remove", function () {
        it("the selected node from the linked list", function () {
            linkedList.add(new LinkedListNode(3));
            linkedList.add(new LinkedListNode(4));
            linkedList.add(new LinkedListNode(5));

            linkedList.remove(linkedList.last);
            linkedList.remove(linkedList.first);
            linkedList.remove(linkedList.first.next);
            
            expect(linkedList.first.data).equal(2);
            expect(linkedList.last.data).equal(4);
            expect(linkedList.first.next.data).equal(4);
        });
    });

    describe("forEach", function () {
        it("iterates over each node in the linked list", function () {
            var curr = linkedList.first;
            linkedList.forEach(function (node) {
                expect(node).equal(curr);
                curr = curr.next;
            });
        });
    });

    describe("empty", function () {
        it("removes all nodes from the linked list", function () {
            expect(linkedList.isEmpty()).equal(false);
            linkedList.empty();
            expect(linkedList.isEmpty()).equal(true);
        });
    });

});