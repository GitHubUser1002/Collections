function BinarySearchTreeNode(key, value, left, right) {
    this.key = key;
    this.value = value;
    this.left = left;
    this.right = right;
};

function BinarySearchTree(root) {
    this.root = root;
};

BinarySearchTree.prototype.insert = (function () {
    var insert = function (node, key, value) {
        if (key > node.key) {
            if (node.right)
                insert(node.right, key, value);
            else
                node.right = new BinarySearchTreeNode(key, value);
        } else if (key < node.key) {
            if (node.left)
                insert(node.left, key, value);
            else
                node.left = new BinarySearchTreeNode(key, value);
        } else if (key === node.key) {
            node.value = value;
        }
    };

    return function (key, value) {
        if (!this.root)
            this.root = new BinarySearchTreeNode(key, value);
        else if (this.root.key === key)
            this.root.value = value;
        else
            insert(this.root, key, value);
    }
}());

BinarySearchTree.prototype.find = (function () {
    var find = function (root, key) {
        if (!root) return null;

        if (root.key === key) {
            return root.value;
        } else if (root.key < key) {
            return find(root.right, key);
        } else
            return find(root.left, key);
    };

    return function (key) {
        return find(this.root, key);
    }
}());

BinarySearchTree.prototype.remove = (function () {
    var remove = function (key, root, parent) {
        if (!root) return;

        if (key === root.key) {
            if (root.left) {
                var replacement = getReplacementLeftNode(root.left, root);
                replacement.left = root.left;
                replacement.right = root.right;
                if (parent.left === root) {
                    parent.left = replacement;
                } else {
                    parent.right = replacement;
                }
            } else if (root.right) {
                var replacement = getReplacementRightNode(root.right, root);
                replacement.left = root.left;
                replacement.right = root.right;
                if (parent.left === root) {
                    parent.left = replacement;
                } else {
                    parent.right = replacement;
                }
            } else {
                if (parent.left === root) {
                    parent.left = null;
                } else {
                    parent.right = null;
                }
            }
        }
        else if (key < root.key)
            remove(key, root.left, root);
        else if (key > root.key)
            remove(key, root.right, root);
    };

    function getReplacementLeftNode(root, parent) {
        if (root.right) {
            return getReplacementLeftNode(root.right, root);
        } else if (root.left) {
            return getReplacementLeftNode(root.left, root);
        } else {
            if (parent.left === root) {
                parent.left = null;
            } else {
                parent.right = null;
            }
            return root;
        }
    }

    function getReplacementRightNode(root, parent) {
        if (root.left) {
            return getReplacementRightNode(root.left, root);
        } else if (root.right) {
            return getReplacementRightNode(root.right, root);
        } else {
            if (parent.left === root) {
                parent.left = null;
            } else {
                parent.right = null;
            }
            return root;
        }
    }

    return function (key) {
        if (key === this.root.key) {
            if (this.root.left) {
                var replacement = getReplacementLeftNode(this.root.left, this.root);
                replacement.left = this.root.left;
                replacement.right = this.root.right;
            } else if (this.root.right) {
                var replacement = getReplacementRightNode(this.root.right, this.root);
                replacement.left = this.root.left;
                replacement.right = this.root.right;
            } else {
                this.root = null;
            }
        }
        else if (key < this.root.key)
            remove(key, this.root.left, this.root);
        else if (key > this.root.key)
            remove(key, this.root.right, this.root);
    }
}());

BinarySearchTree.prototype.height = (function () {
    function height(root) {
        if (!root) return 0;
        if (!root.left && !root.right) return 1;
        return Math.max(height(root.left) + 1, height(root.right) + 1);
    };

    return function () {
        return height(this.root);
    }
}());

BinarySearchTree.prototype.isBalanced = (function () {
    function height(root) {
        if (!root) return 0;
        if (!root.left && !root.right) return 1;
        return Math.max(height(root.left) + 1, height(root.right) + 1);
    };

    function isBalanced(root) {
        if (!root) {
            return true;
        }

        if (!root.left && !root.right) {
            return true;
        }

        if (root.left && !isBalanced(root.left)) {
            return false;
        }

        if (root.right && !isBalanced(root.right)) {
            return false;
        }

        var leftHeight = height(root.left);

        var rightHeight = height(root.right);

        if ((Math.abs(leftHeight - rightHeight) > 1)) {
            return false;
        }

        return true;
    };

    return function () {
        return isBalanced(this.root);
    };
}());

BinarySearchTree.prototype.toList = (function() {
    function dfs(node, callback) {
        if (!node) return;
        dfs(node.left, callback);
        callback(node);
        dfs(node.right, callback);
    };

    return function() {
        var list = [];
        dfs(this.root, function(node) {
            list.push({
                key: node.key,
                value: node.value
            });
        });
        return list;
    };
}());

BinarySearchTree.prototype.balance = (function () {
    function balance(list, bst) {
        if (list.length === 0) return;

        if (list.length === 1) {
            bst.insert(list[0].key, list[0].value);
            return;
        }

        var midIdx = Math.floor(list.length / 2);

        bst.insert(list[midIdx].key, list[midIdx].value);

        var leftHalf = list.splice(0, midIdx);
        balance(leftHalf, bst);

        var rightHalf = list;
        balance(rightHalf, bst);

    };

    return function () {
        var list = this.toList();

        if (list.length <= 2) return;

        this.root = null;

        balance(list, this);

    };
}());

BinarySearchTree.prototype.keysToString = (function () {
    function dfs(root, bst, queue) {
        if (root.left)
            dfs(root.left, bst, queue);

        queue.push(root.key);

        if (root.right)
            dfs(root.right, bst, queue);
    };

    return function () {
        var queue = [];

        dfs(this.root, this, queue);

        return queue.toString();
    };
}());

BinarySearchTree.prototype.empty = function () {
    this.root = null;
};

BinarySearchTree.prototype.isEmpty = function () {
    return this.root === null;
};

BinarySearchTree.prototype.forEach = (function () {
    function dfs(root, callback) {
        if (!root) return;

        dfs(root.left, callback);

        callback(root.key, root.value);

        dfs(root.right, callback);
    };

    return function (callback) {
        dfs(this.root, callback);
    }
}());

BinarySearchTree.prototype.count = (function () {
    return function () {
        var count = 0;
        this.forEach(function() {
            count++;
        });
        return count;
    }
}());


module.exports.BinarySearchTree = BinarySearchTree;