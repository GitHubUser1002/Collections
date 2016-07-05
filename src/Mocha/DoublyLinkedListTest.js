var expect = require("expect.js");
var DoublyLinkedList = require("../DoublyLinkedList.js").DoublyLinkedList;
var DoublyLinkedListNode = require("../DoublyLinkedList.js").DoublyLinkedListNode;

describe("DoublyLinkedList", function () {
    var doublyLinkedList = new DoublyLinkedList();

    describe("add", function () {
        it("inserts into the end of the doubly linked list", function () {
            doublyLinkedList.add(new DoublyLinkedListNode(1));
            expect(doublyLinkedList.first).equal(doublyLinkedList.last);
            expect(doublyLinkedList.first.data).equal(1);
            doublyLinkedList.add(new DoublyLinkedListNode(2));
            expect(doublyLinkedList.first.data + 1).equal(doublyLinkedList.last.data);
            expect(doublyLinkedList.first.next).equal(doublyLinkedList.last);
            expect(doublyLinkedList.first).equal(doublyLinkedList.last.prev);
        });
    });

    describe("remove", function () {
        it("the selected node from the doubly linked list", function () {
            doublyLinkedList.add(new DoublyLinkedListNode(3));
            doublyLinkedList.add(new DoublyLinkedListNode(4));
            doublyLinkedList.add(new DoublyLinkedListNode(5));

            doublyLinkedList.remove(doublyLinkedList.last);
            doublyLinkedList.remove(doublyLinkedList.first);
            doublyLinkedList.remove(doublyLinkedList.first.next);

            expect(doublyLinkedList.first.data).equal(2);
            expect(doublyLinkedList.last.data).equal(4);
            expect(doublyLinkedList.first.next.data).equal(4);
            expect(doublyLinkedList.first).equal(doublyLinkedList.first.next.prev);
            expect(doublyLinkedList.last.prev.next).equal(doublyLinkedList.last);
        });
    });

    describe("forEach", function () {
        it("iterates over each node in the doubly linked list", function () {
            var curr = doublyLinkedList.first;
            doublyLinkedList.forEach(function (node) {
                expect(node).equal(curr);
                if (node !== doublyLinkedList.last) {
                    expect(node).equal(curr.next.prev);
                    expect(node.next.prev).equal(curr);
                } else {
                    expect(node.prev.next).equal(curr);
                    expect(node).equal(curr.prev.next);
                }
                curr = curr.next;
            });
        });
    });

    describe("empty", function () {
        it("removes all nodes from the doubly linked list", function () {
            expect(doublyLinkedList.isEmpty()).equal(false);
            doublyLinkedList.empty();
            expect(doublyLinkedList.isEmpty()).equal(true);
        });
    });

});