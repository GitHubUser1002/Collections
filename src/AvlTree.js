function AvlNode(key, value) {
    this.parent = null;

    this.left = null;
    this.right = null;

    this.key = key;
    this.value = value;

    this.balance = 0;
};

function AvlTree() {
    this.root = null;
};

AvlTree.prototype.insert = (function () {
    function balance(node, balanceIncr, avl) {
        if (!node) return;

        var balanceWeight = (node.balance += balanceIncr);
        
        var parent = node.parent;

        if (balanceWeight === 0) {
            return;
        } else if (balanceWeight === 2) {
            if (node.left.balance === 1) {
                rotateRight(node, avl);
                return;
            }
            else {
                rotateLeftRight(node, avl);
                return;
            }
        } else if (balanceWeight === -2) {
            if (node.right.balance === -1) {

                rotateLeft(node, avl);
                return;

            }
            else {
                rotateRightLeft(node, avl);
                return;
            }
        }

        if (parent) {
            balanceWeight = parent.left === node ? 1 : -1;
            balance(parent, balanceWeight, avl);
        }
    };

    function insert(node, key, value, avl) {
        if (node.key > key) {
            if (!node.left) {
                node.left = new AvlNode(key, value);
                node.left.parent = node;
                balance(node, 1, avl);
            } else {
                insert(node.left, key, value, avl);
            }
        } else if (node.key < key) {
            if (!node.right) {
                node.right = new AvlNode(key, value);
                node.right.parent = node;
                balance(node, -1, avl);
            } else {
                insert(node.right, key, value, avl);
            }
        } else {
            node.value = value;
        }
    };

    return function (key, value) {
        if (!this.root) {
            this.root = new AvlNode(key, value);
            return;
        }

        insert(this.root, key, value, this);
    };
}());

AvlTree.prototype.keysToString = (function () {
    function bfs(root) {
        if (!root) return [];
        var queue = [];

        var node = root;
        queue.push(node);
        var idx = 0;
        while (true) {
            if (node.left)
                queue.push(node.left);

            if (node.right)
                queue.push(node.right);

            if ((++idx) >= queue.length) break;

            node = queue[idx];
        }

        return queue;
    };

    return function () {
        var nodes = bfs(this.root);

        var ret = [];

        for (var i = 0; i < nodes.length; i++)
            ret.push({
                key: nodes[i].key,
                balance: nodes[i].balance,
                parent: nodes[i].parent ? nodes[i].parent.key : null
            });

        return ret;//.toString();
    };
}());

AvlTree.prototype.empty = function () {
    this.root = null;
};

AvlTree.prototype.isEmpty = function () {
    return this.root === null;
};

AvlTree.prototype.forEach = (function () {
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

function rotateLeft(node, avl) {
    var right = node.right;
    var rightLeft = right.left;
    var parent = node.parent;

    right.parent = parent;
    right.left = node;
    node.right = rightLeft;
    node.parent = right;

    if (rightLeft) {
        rightLeft.parent = node;
    }

    if (node === avl.root) {
        avl.root = right;
    } else if (parent.right === node) {
        parent.right = right;
    } else {
        parent.left = right;
    }

    right.balance++;

    node.balance = -right.balance;

    return right;
};

function rotateRight(node, avl) {
    var left = node.left;
    var leftRight = left.right;
    var parent = node.parent;

    left.parent = parent;
    left.right = node;
    node.left = leftRight;
    node.parent = left;

    if (leftRight)
        leftRight.parent = node;

    if (node === avl.root)
        avl.root = left;
    else if (parent.left === node)
        parent.left = left;
    else
        parent.right = left;

    left.balance--;
    node.balance = -left.balance;

    return left;
};

function rotateLeftRight(node, avl) {
    var left = node.left;
    var leftRight = left.right;
    var parent = node.parent;
    var leftRightRight = left.right.right;
    var leftRightLeft = left.right.left;

    var tempMidLeft = leftRight.left;
    var tempMidRight = leftRight.right;

    leftRight.parent = parent;
    node.left = leftRightRight;
    leftRight.left = left;
    leftRight.right = node;
    left.parent = leftRight;
    node.parent = leftRight;

    left.right = tempMidLeft;
    node.left = tempMidRight;

    if (leftRightRight) {
        leftRightRight.parent = node;
    }

    if (leftRightLeft) {
        leftRightLeft.parent = left;
    }

    if (node === avl.root) {
        avl.root = leftRight;
    } else if (parent.left === node) {
        parent.left = leftRight;
    } else {
        parent.right = leftRight;
    }

    if (leftRight.balance === -1) {
        node.balance = 0;
        left.balance = 1;
    } else if (leftRight.balance === 0) {
        node.balance = 0;
        left.balance = 0;
    } else {
        node.balance = -1;
        left.balance = 0;
    }

    leftRight.balance = 0;

    return leftRight;
};

function rotateRightLeft(node, avl) {
    var right = node.right;

    var rightLeft = right.left;
    var parent = node.parent;
    var rightLeftLeft = rightLeft.left;
    var rightLeftRight = rightLeft.right;

    rightLeft.parent = parent;
    node.right = rightLeftLeft;
    right.left = rightLeftRight;
    rightLeft.right = right;
    rightLeft.left = node;
    right.parent = rightLeft;
    node.parent = rightLeft;

    if (rightLeftLeft)
        rightLeftLeft.parent = node;

    if (rightLeftRight)
        rightLeftRight.parent = right;

    if (avl.root === node)
        avl.root = rightLeft;
    else if (parent.right === node)
        parent.right = rightLeft;
    else
        parent.left = rightLeft;

    if (rightLeft.balance === 1) {
        node.balance = 0;
        right.balance = -1;
    } else if (rightLeft.balance === 0) {
        node.balance = 0;
        right.balance = 0;
    } else {
        node.balance = 1;
        right.balance = 0;
    }

    rightLeft.balance = 0;

    return rightLeft;

};

AvlTree.prototype.remove = (function () {
    function balance(node, balanceIncr, avl) {
        if (!node) return;

        var balanceWeight = (node.balance += balanceIncr);

        var parent = node.parent;

        if (balanceWeight === 0) {
            //return;
        } else if (balanceWeight === 2) {
            if (node.left.balance >= 0) {
                node = rotateRight(node, avl);
            } else {
                node = rotateLeftRight(node, avl);
            }
            if (node.balance === -1)
                return;
        } else if (balanceWeight === -2) {
            if (node.right.balance <= 0) {
                node = rotateLeft(node, avl);
            }
            else
                node = rotateRightLeft(node, avl);
            if (node.balance === 1)
                return;
        }
        else
            return;


        if (parent) {
            balanceWeight = parent.left === node ? -1 : 1;
            balance(parent, balanceWeight, avl);
        }
    };

    function replace(target, source) {
        var left = source.left;
        var right = source.right;

        target.balance = source.balance;
        target.key = source.key;
        target.value = source.value;
        target.left = left;
        target.right = right;

        if (left)
            left.parent = target;

        if (right)
            right.parent = target;
    };

    function remove(node, key, avl) {
        if (!node) return;

        if (node.key < key) {
            remove(node.right, key, avl);
        } else if (node.key > key) {
            remove(node.left, key, avl);
        } else {
            var left = node.left;
            var right = node.right;

            if (!left) {
                if (!right) {
                    if (node === avl.root) {
                        avl.root = null;
                    } else {
                        var parent = node.parent;
                        if (parent.left === node) {
                            parent.left = null;
                            balance(parent, -1, avl);
                        } else {
                            parent.right = null;
                            balance(parent, 1, avl);
                        }
                    }
                } else {
                    replace(node, right);
                    balance(node, 0, avl);
                }
            } else if (!right) {
                replace(node, left);
                balance(node, 0, avl);
            } else {
                var successor = right;

                if (!successor.left) {
                    var parent = node.parent;

                    successor.parent = parent;
                    successor.left = left;
                    successor.balance = node.balance;

                    if (left) {
                        left.parent = successor;
                    }

                    if (node === avl.root) {
                        avl.root = successor;
                    } else {
                        if (parent.left === node)
                            parent.left = successor;
                        else
                            parent.right = successor;
                    }

                    balance(successor, 1, avl);
                } else {
                    while (successor.left)
                        successor = successor.left;

                    var parent = node.parent;
                    var successorParent = successor.parent;
                    var successorRight = successor.right;

                    if (successorParent.left === successor)
                        successorParent.left = successorRight;
                    else
                        successorParent.right = successorRight;

                    if (successorRight)
                        successorRight.parent = successorParent;

                    successor.parent = parent;
                    successor.left = left;
                    successor.balance = node.balance;
                    successor.right = right;
                    right.parent = successor;

                    if (left)
                        left.parent = successor;

                    if (node === avl.root)
                        avl.root = successor;
                    else {
                        if (parent.left === node)
                            parent.left = successor;
                        else
                            parent.right = successor;
                    }

                    balance(successorParent, -1, avl);
                }
            }
        }
    };

    return function (key) {
        remove(this.root, key, this);
    };
}());

AvlTree.prototype.isBalanced = (function () {
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


AvlTree.prototype.find = (function () {
    var find = function (root, key) {
        if (!root) return null;

        if (root.key === key) {
            return root;
        } else if (root.key < key) {
            return find(root.right, key);
        } else
            return find(root.left, key);
    };

    return function (key) {
        var ret = find(this.root, key);
        return ret ? ret.value : null;
    }
}());

AvlTree.prototype.height = (function () {
    function height(root) {
        if (!root) return 0;
        if (!root.left && !root.right) return 1;
        return Math.max(height(root.left) + 1, height(root.right) + 1);
    };

    return function () {
        return height(this.root);
    }
}());

module.exports.AvlTree = AvlTree;

