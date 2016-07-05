function MaxHeapNode(key, value) {
    this.key = key;
    this.value = value;
}

function MaxHeap() {
    this.array = [];
}

MaxHeap.prototype.insert = (function () {
    function shift(array, idx) {
        var a = array[idx];

        var idx2 = Math.ceil(idx / 2);
        if (idx2 === 1 && idx === 1) idx2 = 0;

        var b = array[idx2];

        if (b.key >= a.key) return;

        array[idx] = b;
        array[idx2] = a;

        if (idx === 0) return;
        
        shift(array, idx2);
    };

    return function (key, value) {
        this.array.push(new MaxHeapNode(key, value));

        if (this.array.length > 1)
            shift(this.array, this.array.length - 1);
    };
}());

MaxHeap.prototype.remove = (function () {
    function swap(array, idx) {
        if (array.length <= 1) return;
        if (array.length === 2) {
            if (array[0].key < array[1].key) {
                var temp = array[0];
                array[0] = array[1];
                array[1] = temp;
            }
            return;
        }

        var childAidx = (2 * idx) + 1;
        var childBidx = (2 * idx) + 2;

        if (childBidx > array.length - 1) return;

        var childa = array[childAidx];
        var childb = array[childBidx];

        var parent = array[idx];

        if (parent.key > childa.key && parent.key > childb.key) return;

        var largerChild = childa.key > childb.key ? childa : childb;
        var largerIdx = childa.key > childb.key ? childAidx : childBidx;

        array[largerIdx] = parent;
        array[idx] = largerChild;
        
        swap(array, largerIdx);
    };

    return function () {
        if (this.array.length === 0) return null;

        if (this.array.length === 1) return this.array.splice(0, 1)[0];

        var last = this.array.splice(this.array.length - 1, 1)[0];

        var ret = this.array[0];

        this.array[0] = last;

        swap(this.array, 0);

        return ret;
    };
}());

MaxHeap.prototype.height = function () {
    return Math.floor(Math.log2(this.array.length)) + 1;
};

MaxHeap.prototype.empty = function () {
    this.array = [];
    //this.array.splice(0, this.Array.length - 1);
};

MaxHeap.prototype.isEmpty = function () {
    return this.array.length === 0;
};

module.exports.MaxHeap = MaxHeap;