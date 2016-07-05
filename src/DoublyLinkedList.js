function DoublyLinkedListNode(data, prev, next) {
    this.data = data;
    this.prev = prev;
    this.next = next;
};

function DoublyLinkedList(first) {
    this.first = first;
    this.last = first;
};

DoublyLinkedList.prototype.add = function (node) {
    if (!this.first) {
        this.first = node;
        this.last = node;
        return;
    }

    this.last.next = node;
    node.prev = this.last;
    node.next = null;
    this.last = node;
};

DoublyLinkedList.prototype.remove = function (node) {
    var curr = this.first;

    while(curr) {
        if (curr !== node) {
            curr = curr.next;
             continue;
        }

        if (curr === this.first) {
            var next = curr.next;
            next.prev = null;
            this.first = next;
            curr = null;
            return;
        } else if (curr === this.last) {
            var prev = curr.prev;
            this.last = prev;
            this.last.next = null;
            curr = null;
            return;
        } else {
            var next = curr.next;
            var prev = curr.prev;
            prev.next = next;
            next.prev = prev;
            curr = null;
            return;
        }
    }
};

DoublyLinkedList.prototype.empty = function () {
    var node = this.first;
    this.first = null;
    this.last = null;

    while (node) {
        var curr = node;
        node = node.next;
        curr.next = null;
        curr.prev = null;
    }
};

DoublyLinkedList.prototype.isEmpty = function () {
    return this.first === null;
};

DoublyLinkedList.prototype.forEach = function (callback) {
    var node = this.first;

    while (node) {
        callback(node);
        node = node.next;
    }
};

module.exports.DoublyLinkedListNode = DoublyLinkedListNode;
module.exports.DoublyLinkedList = DoublyLinkedList;