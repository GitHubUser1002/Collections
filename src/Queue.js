var Queue = function() {
    var array = [];

    var enqueue = function(item) {
        array.push(item);
    };

    var dequeue = function () {
        if (array.length === 0) return null;
        return array.splice(0, 1)[0];
    };

    var empty = function () {
        array.splice(0, array.length);
    };

    var isEmpty = function () {
        return array.length === 0;
    };

    var peek = function () {
        if (array.length === 0) return null;
        return array[0];
    };

    var getLength = function () {
        return array.length;
    };

    var forEach = function (callback) {
        for (var i = 0; i < array.length; i++) {
            callback(array[i]);
        }
    };

    return {
        enqueue: enqueue,
        dequeue: dequeue,
        empty: empty,
        isEmpty: isEmpty,
        peek: peek,
        getLength: getLength,
        forEach: forEach
    };
};

module.exports = Queue;