function LinkedListNode(data, next) {
    this.data = data;
    this.next = next;
};

function LinkedList(first) {
    this.first = first;
    this.last = first;
};

LinkedList.prototype.add = function (node) {
    if (!this.first) {
        this.first = node;
        this.last = node;
        return;
    }

    this.last.next = node;
    node.next = null;
    this.last = node;
};

LinkedList.prototype.remove = function (node) {
    var curr = this.first;

    while (curr) {
        if (curr === this.first && curr === node) {
            var next = curr.next;
            this.first = next;
            return;
        } 
        else if (curr.next === node) {
            var next = curr.next;
            curr.next = next.next;
            if (next === this.last)
                this.last = curr;
            return;
        }
        else {
            curr = curr.next;
        }
    }
};

LinkedList.prototype.empty = function () {
    var node = this.first;
    this.first = null;
    this.last = null;

    while (node) {
        var curr = node;
        node = node.next;
        curr.next = null;
    }
};

LinkedList.prototype.isEmpty = function () {
    return this.first === null;
};

LinkedList.prototype.forEach = function (callback) {
    var node = this.first;

    while (node) {
        callback(node);
        node = node.next;
    }
};

module.exports.LinkedList = LinkedList;
module.exports.LinkedListNode = LinkedListNode;