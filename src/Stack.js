var Stack = function () {
    var array = [];

    var push = function (item) {
        array.push(item);
    };

    var pop = function () {
        if (array.length === 0) return null;
        return array.splice(array.length - 1, 1)[0];
    };

    var peek = function () {
        if (array.length === 0) return null;
        return array[array.length - 1];
    };

    var empty = function () {
        array.splice(0, array.length);
    };

    var isEmpty = function () {
        return array.length === 0;
    };

    var getLength = function () {
        return array.length;
    };

    var forEach = function (callback) {
        for (var i = array.length - 1; i >= 0; i--) {
            callback(array[i]);
        }
    };

    return {
        push: push,
        pop: pop,
        empty: empty,
        isEmpty: isEmpty,
        peek: peek,
        getLength: getLength,
        forEach: forEach
    };
};

module.exports = Stack;