function TwoThreeTreeNode() {
    this.elements = [];
    this.children = [];
    this.parent = null;
};

TwoThreeTreeNode.prototype.getFirstEntry = function () {
    return this.elements[0];
};

TwoThreeTreeNode.prototype.getSecondEntry = function () {
    return this.elements[1];
};

TwoThreeTreeNode.prototype.getThirdEntry = function () {
    return this.elements[2];
};

TwoThreeTreeNode.prototype.setFirstEntry = function (value) {
    this.elements[0] = value;
};

TwoThreeTreeNode.prototype.setSecondEntry = function (value) {
    this.elements[1] = value;
};

TwoThreeTreeNode.prototype.removeFirstEntry = function () {
    return this.elements.splice(0, 1)[0];
};

TwoThreeTreeNode.prototype.removeSecondEntry = function () {
    return this.elements.splice(1, 1)[0];
};

TwoThreeTreeNode.prototype.getLeftChild = function () {
    return this.children[0];
};

TwoThreeTreeNode.prototype.getMidChild = function () {
    return this.children[1];
};

TwoThreeTreeNode.prototype.getRightChild = function () {
    return this.children[2];
};

TwoThreeTreeNode.prototype.setLeftChild = function (node) {
    this.children[0] = node;
    node.parent = this;
};

TwoThreeTreeNode.prototype.setMidChild = function (node) {
    this.children[1] = node;
    node.parent = this;
};

TwoThreeTreeNode.prototype.setRightChild = function (node) {
    this.children[2] = node;
    node.parent = this;
};

TwoThreeTreeNode.prototype.isTwoNode = function () {
    return this.elements[0] && !this.elements[1];
};

TwoThreeTreeNode.prototype.isTwoNode = function () {
    return this.elements[0] && !this.elements[1];
};

TwoThreeTreeNode.prototype.isThreeNode = function () {
    return this.elements[0] && this.elements[1];
};

function TwoThreeTree() {
    this.root = null;
};

TwoThreeTree.prototype.isEmpty = function () {
    return this.root === null || this.root.elements.length === 0;
};

TwoThreeTree.prototype.empty = function() {
    this.root = null;
};

TwoThreeTree.prototype.insert = (function () {
    function setNewChildNode(root, index, newNode) {
        root.children[index] = newNode;
        if (newNode) newNode.parent = root;
    }

    function createNewChildNode(root, index) {
        setNewChildNode(root, index, new TwoThreeTreeNode());
    }

    function pushLeftEntryToParent(root) {
        var elements = [];
        elements.push(root.elements.splice(1, 1)[0]);
        for (var i = 0; i < root.parent.elements.length; i++)
            elements.push(root.parent.elements[i]);
        root.parent.elements = elements;
    }

    function pushMidEntryToParent(root) {
        var elements = [];
        elements.push(root.parent.elements[0]);
        elements.push(root.elements.splice(1, 1)[0]);
        elements.push(root.parent.elements[1]);
        root.parent.elements = elements;
    }

    function pushRightToParent(root) {
        var elements = [];
        elements.push(root.parent.elements[0]);
        if (root.parent.elements[1])
            elements.push(root.parent.elements[1]);
        elements.push(root.elements.splice(1, 1)[0]);
        root.parent.elements = elements;
    }

    function rebalance(twoThreeTree, root) {
        if (root.elements.length < 3 || !root.elements[2]) return;

        if (root === twoThreeTree.root) {
            twoThreeTree.root = new TwoThreeTreeNode();

            twoThreeTree.root.elements.push(root.elements.splice(1, 1)[0]);

            createNewChildNode(twoThreeTree.root, 0);
            twoThreeTree.root.children[0].elements.push(root.elements[0]);

            setNewChildNode(twoThreeTree.root.children[0], 0, root.children[0]);
            setNewChildNode(twoThreeTree.root.children[0], 2, root.children[1]);


            createNewChildNode(twoThreeTree.root, 2);
            twoThreeTree.root.children[2].elements.push(root.elements[1]);

            setNewChildNode(twoThreeTree.root.children[2], 0, root.children[2]);
            setNewChildNode(twoThreeTree.root.children[2], 2, root.children[3]);
        }
        else {
            if (root === root.parent.getLeftChild()) {
                pushLeftEntryToParent(root);

                var children = [];
                var child = new TwoThreeTreeNode();
                child.elements.push(root.elements.splice(0, 1)[0]);
                child.parent = root.parent;
                if (root.children.length !== 0) {
                    setNewChildNode(child, 0, root.children[0]);
                    setNewChildNode(child, 2, root.children[1]);
                }
                children.push(child);

                child = new TwoThreeTreeNode();
                child.elements.push(root.elements.splice(0, 1)[0]);
                child.parent = root.parent;
                if (root.children.length !== 0) {
                    setNewChildNode(child, 0, root.children[2]);
                    setNewChildNode(child, 2, root.children[3]);
                }
                children.push(child);

                if (root.parent.children[1]) children.push(root.parent.children[1]);

                if (root.parent.children[2]) children.push(root.parent.children[2]);

                root.parent.children = children;

                rebalance(twoThreeTree, root.parent);
            }
            else if (root === root.parent.getMidChild()) {
                pushMidEntryToParent(root);

                var children = [];

                children.push(root.parent.children[0]);

                var child = new TwoThreeTreeNode();
                child.elements.push(root.elements[0]);
                child.parent = root.parent;
                if (root.children[0]) setNewChildNode(child, 0, root.children[0]);
                if (root.children[1]) setNewChildNode(child, 2, root.children[1]);
                children.push(child);
                
                child = new TwoThreeTreeNode();
                child.elements.push(root.elements[1]);
                child.parent = root.parent;
                if (root.children[2]) setNewChildNode(child, 0, root.children[2]);
                if (root.children[3]) setNewChildNode(child, 2, root.children[3]);
                children.push(child);
                
                if (root.parent.children[2]) {
                    children.push(root.parent.children[2]);
                }

                root.parent.children = children;

                rebalance(twoThreeTree, root.parent);
            }
            else if (root === root.parent.getRightChild()) {
                pushRightToParent(root);

                var children = [];
                children.push(root.parent.children[0]);

                if (root.parent.children[1])
                    children.push(root.parent.children[1]);

                var child = new TwoThreeTreeNode();
                child.elements.push(root.elements[0]);
                child.parent = root.parent;
                if (root.children[0]) setNewChildNode(child, 0, root.children[0]);

                if (root.children[1]) setNewChildNode(child, 2, root.children[1]);

                children.push(child);
                child = new TwoThreeTreeNode();
                child.elements.push(root.elements[1]);
                child.parent = root.parent;

                if (root.children[2]) setNewChildNode(child, 0, root.children[2]);

                if (root.children[3]) setNewChildNode(child, 2, root.children[3]);

                children.push(child);

                root.parent.children = children;

                rebalance(twoThreeTree, root.parent);
            }

        }
    };

    function insertTwoNode(twoThreeTree, root, entry) {
        if (root.getFirstEntry().key > entry.key) {
            var leftNode = root.getLeftChild();
            if (leftNode) {
                insert(twoThreeTree, leftNode, entry);
            } else {

                root.elements.unshift(entry);
            }
        } else if (root.getFirstEntry().key < entry.key) {
            var rightNode = root.getRightChild();
            if (rightNode) {

                insert(twoThreeTree, rightNode, entry);
            } else {

                root.elements.push(entry);
            }
        } else {
            root.setFirstEntry(entry);
        }
    }

    function tryMoveLeft(twoThreeTree, root, entry) {
        var leftNode = root.getLeftChild();

        if (leftNode) {
            insert(twoThreeTree, leftNode, entry);
            return true;
        }

        root.elements.unshift(entry);
        return false;
    }

    function tryMoveRight(twoThreeTree, root, entry) {
        var rightNode = root.getRightChild();

        if (rightNode) {
            insert(twoThreeTree, rightNode, entry);
            return true;
        }

        root.elements.push(entry);
        return false;
    }

    function tryMoveCenter(twoThreeTree, root, entry) {
        var midNode = root.getMidChild();
        if (midNode) {
            insert(twoThreeTree, midNode, entry);
            return true;
        }

        var elements = [];
        elements.push(root.elements[0]);
        elements.push(entry);
        elements.push(root.elements[1]);
        root.elements = elements;

        return false;
    }

    function splitThreeNodeRoot(twoThreeTree, root) {
        twoThreeTree.root = new TwoThreeTreeNode();
        twoThreeTree.root.elements.push(root.elements[1]);

        var node = new TwoThreeTreeNode();
        node.parent = twoThreeTree.root;
        node.elements.push(root.elements[0]);
        twoThreeTree.root.setLeftChild(node);

        node = new TwoThreeTreeNode();
        node.parent = twoThreeTree.root;
        node.elements.push(root.elements[2]);
        twoThreeTree.root.setRightChild(node);
    }

    function insert(twoThreeTree, root, entry) {
        if (root.elements.length === 0) {
            root.elements.push(entry);
            return;
        }

        if (root.isTwoNode()) insertTwoNode(twoThreeTree, root, entry);
        else {
            if (entry.key < root.elements[0].key) {
                if (tryMoveLeft(twoThreeTree, root, entry)) return;
            }
            else if (root.elements[1].key < entry.key) {
                if (tryMoveRight(twoThreeTree, root, entry)) return;
            }
            else {
                if (tryMoveCenter(twoThreeTree, root, entry)) return;
            }

            if (root === twoThreeTree.root) {
                splitThreeNodeRoot(twoThreeTree, root);
            }
            else if (root.parent.isTwoNode()) {
                if (root.parent.getLeftChild() === root) {
                    root.parent.elements.unshift(root.elements.splice(1, 1)[0]);

                    var rightNode = root.parent.children[2];
                    root.parent.children = [];

                    createNewChildNode(root.parent, 0);
                    root.parent.children[0].elements[0] = root.elements[0];


                    createNewChildNode(root.parent, 1);
                    root.parent.children[1].elements[0] = root.elements[1];

                    setNewChildNode(root.parent, 2, rightNode);
                }
                else {
                    var elements = [];
                    elements.push(root.parent.elements[0]);
                    elements.push(root.elements[1]);
                    root.parent.elements = elements;

                    var leftNode = root.parent.children[0];
                    root.parent.children = [];

                    setNewChildNode(root.parent, 0, leftNode);

                    createNewChildNode(root.parent, 1);
                    root.parent.children[1].elements[0] = root.elements[0];

                    createNewChildNode(root.parent, 2);
                    root.parent.children[2].elements[0] = root.elements[2];
                }
            }
            else if (root.parent.isThreeNode()) {
                if (root.parent.getLeftChild() === root) {
                    root.parent.elements.unshift(root.elements.splice(1, 1)[0]);

                    var leftChild = new TwoThreeTreeNode();
                    leftChild.elements[0] = root.elements[0];
                    leftChild.parent = root.parent;
                    
                    var midChild = new TwoThreeTreeNode();
                    midChild.elements[0] = root.elements[1];
                    midChild.parent = root.parent;
                    
                    root.parent.children.splice(0, 1);
                    root.parent.children.unshift(midChild);
                    root.parent.children.unshift(leftChild);
                    
                }
                else if (root.parent.getMidChild() === root) {
                    var elements = [];
                    elements.push(root.parent.elements[0]);
                    elements.push(root.elements.splice(1, 1)[0]);
                    elements.push(root.parent.elements[1]);
                    root.parent.elements = elements;

                    var midChild1 = new TwoThreeTreeNode();
                    midChild1.elements[0] = root.elements.splice(0, 1)[0];
                    midChild1.parent = root.parent;

                    var midChild2 = new TwoThreeTreeNode();
                    midChild2.elements[0] = root.elements.splice(0, 1)[0];
                    midChild2.parent = root.parent;

                    var children = [];
                    children[0] = root.parent.children[0];
                    children[1] = midChild1;
                    children[2] = midChild2;
                    children[3] = root.parent.children[2];
                    root.parent.children = children;
                }
                else {
                    var elements = [];
                    elements.push(root.parent.elements[0]);
                    elements.push(root.parent.elements[1]);
                    elements.push(root.elements.splice(1, 1)[0]);
                    root.parent.elements = elements;

                    var midChild = new TwoThreeTreeNode();
                    midChild.elements[0] = root.elements.splice(0, 1)[0];
                    midChild.parent = root.parent;

                    var rightChild = new TwoThreeTreeNode();
                    rightChild.elements[0] = root.elements.splice(0, 1)[0];
                    rightChild.parent = root.parent;

                    var children = [];
                    children[0] = root.parent.children[0];
                    children[1] = root.parent.children[1];
                    children[2] = midChild;
                    children[3] = rightChild;
                    root.parent.children = children;
                }

                rebalance(twoThreeTree, root.parent);
            }
        }
    };

    return function (key, value) {
        if (!this.root) {
            this.root = new TwoThreeTreeNode();
            this.root.elements.push({
                key: key,
                value: value
            });
        } else {
            insert(this, this.root, {
                key: key,
                value: value
            });
        }
    }
}());

TwoThreeTree.prototype.bfs = (function () {
    function bfs(array, callback) {
        if (array.length === 0) return;
        var node = array.splice(0, 1)[0];
        callback({
            parent: node.parent ? node.parent.elements : null,
            elements: node.elements
        })
        if (node.children[0]) array.push(node.children[0])
        if (node.children[1]) array.push(node.children[1])
        if (node.children[2]) array.push(node.children[2])
        bfs(array, callback)
    }

    return function (callback) {
        var array = [this.root];
        bfs(array, callback)
    }
}());

TwoThreeTree.prototype.remove = (function () {
    function indexofkey(elements, key) {
        for (var i = 0; i < elements.length; i++) {
            if (key === elements[i].key) return i;
        }
        return null;
    };

    function getOneLess(root, key) {
        if (!root) return null;
        var rightChild = root.getRightChild();
        if (!rightChild) {
            return root;
        } else {
            return getOneLess(rightChild, key);
        }
    };

    function rebalance(twoThreeTree, root) {
        if (!root) return;
        
        if (root.elements.length === 0) {
            rebalance(twoThreeTree, root.parent);
            return;
        }

        if (root.isTwoNode()) {
            
            var left = root.getLeftChild();
            var right = root.getRightChild();

            if (left && !right) {
                if (left.elements.length === 1) {
                    var elements = [];
                    elements.push(left.elements.splice(0, 1)[0]);
                    elements.push(root.elements.splice(0, 1)[0]);
                    left.elements = elements;
                    root.children = [];
                    root.children[1] = left;
                    root.children[1].parent = root;
                    rebalance(twoThreeTree, root.parent);
                } else {
                    var entryB = left.elements.splice(1, 1)[0];
                    var entryA = left.elements.splice(0, 1)[0];
                    var entryC = root.elements[0];
                    root.elements[0] = entryB;
                    left.elements[0] = entryA;
                    root.children[2] = new TwoThreeTreeNode();
                    root.children[2].parent = root;
                    root.children[2].elements.push(entryC);
                }
            }
            else if (left && right.elements.length === 0) {
                var newnode = new TwoThreeTreeNode();
                newnode.elements.push(left.elements.splice(0, 1)[0]);
                if (left.elements[0]) newnode.elements.push(left.elements.splice(0, 1)[0]);
                newnode.elements.push(root.elements.splice(0, 1)[0]);

                if (newnode.elements.length === 3) {
                    if (left.children[0]) {
                        newnode.children[0] = left.children[0];
                        newnode.children[0].parent = newnode;
                    }
                    if (left.children[1]) {
                        newnode.children[1] = left.children[1];
                        newnode.children[1].parent = newnode;
                    }
                    if (left.children[2]) {
                        newnode.children[2] = left.children[2];
                        newnode.children[2].parent = newnode;
                    }
                    if (right.children[1]) {
                        newnode.children[3] = right.children[1];
                        newnode.children[3].parent = newnode;
                    }

                    var centerNode = new TwoThreeTreeNode();
                    centerNode.elements.push(newnode.elements.splice(1, 1)[0]);

                    var leftNode = new TwoThreeTreeNode();
                    centerNode.children[0] = leftNode;
                    centerNode.children[0].parent = centerNode;
                    leftNode.elements.push(newnode.elements.splice(0, 1)[0]);

                    leftNode.children[0] = newnode.children[0];
                    if (leftNode.children[0]) leftNode.children[0].parent = leftNode;
                    
                    leftNode.children[2] = newnode.children[1];
                    if (leftNode.children[2]) leftNode.children[2].parent = leftNode;

                    var rightNode = new TwoThreeTreeNode();
                    centerNode.children[2] = rightNode;
                    centerNode.children[2].parent = centerNode;
                    rightNode.elements.push(newnode.elements.splice(0, 1)[0]);

                    rightNode.children[0] = newnode.children[2];
                    if (rightNode.children[0]) rightNode.children[0].parent = rightNode;

                    rightNode.children[2] = newnode.children[3];
                    if (rightNode.children[2]) rightNode.children[2].parent = rightNode;

                    if (root.parent) {
                        centerNode.parent = root.parent;
                        if (root.parent.children[0] === root) root.parent.children[0] = centerNode;
                        else if (root.parent.children[1] === root) root.parent.children[1] = centerNode;
                        else if (root.parent.children[2] === root) root.parent.children[2] = centerNode;
                    } else if (root === twoThreeTree.root) {
                        twoThreeTree.root = centerNode;
                    }

                    return;
                }
                else {
                    if (root !== twoThreeTree.root) {
                        root.children = [];
                        root.children[1] = newnode;
                        newnode.parent = root;
                    }

                    if (left.children[0]) {
                        newnode.children[0] = left.children[0];
                        newnode.children[0].parent = newnode;
                    }
                    if (left.children[2]) {
                        newnode.children[1] = left.children[2];
                        newnode.children[1].parent = newnode;
                    }
                    if (right.children[1]) {
                        newnode.children[2] = right.children[1];
                        newnode.children[2].parent = newnode;
                    }
                    
                    if (root.parent === null) {
                        twoThreeTree.root = newnode;
                        return;
                    }

                    rebalance(twoThreeTree, root.parent);
                }

            }
            else if (right && left.elements.length === 0) {
                var newnode = new TwoThreeTreeNode();
                newnode.elements.push(root.elements.splice(0, 1)[0]);
                newnode.elements.push(right.elements.splice(0, 1)[0]);
                if (right.elements[0]) newnode.elements.push(right.elements.splice(0, 1)[0]);

                if (newnode.elements.length === 3) {
                    if (left.children[1]) {
                        newnode.children[0] = left.children[1];
                        newnode.children[0].parent = newnode;
                    }
                    if (right.children[0]) {
                        newnode.children[1] = right.children[0];
                        newnode.children[1].parent = newnode;
                    }
                    if (right.children[1]) {
                        newnode.children[2] = right.children[1];
                        newnode.children[2].parent = newnode;
                    }
                    if (right.children[2]) {
                        newnode.children[3] = right.children[2];
                        newnode.children[3].parent = newnode;
                    }
                    

                    var centerNode = new TwoThreeTreeNode();
                    centerNode.elements.push(newnode.elements.splice(1, 1)[0]);

                    var leftNode = new TwoThreeTreeNode();
                    centerNode.children[0] = leftNode;
                    centerNode.children[0].parent = centerNode;

                    leftNode.elements.push(newnode.elements.splice(0, 1)[0]);
                    leftNode.children[0] = newnode.children[0];
                    if (leftNode.children[0]) leftNode.children[0].parent = leftNode;
                    leftNode.children[2] = newnode.children[1];
                    if (leftNode.children[2]) leftNode.children[2].parent = leftNode;

                    var rightNode = new TwoThreeTreeNode();
                    centerNode.children[2] = rightNode;
                    centerNode.children[2].parent = centerNode;
                    rightNode.elements.push(newnode.elements.splice(0, 1)[0]);
                    rightNode.children[0] = newnode.children[2];
                    if (rightNode.children[0]) rightNode.children[0].parent = rightNode;
                    rightNode.children[2] = newnode.children[3];
                    if (rightNode.children[2]) rightNode.children[2].parent = rightNode;

                    if (root.parent) {
                        centerNode.parent = root.parent;
                        if (root.parent.children[0] === root) root.parent.children[0] = centerNode;
                        else if (root.parent.children[1] === root) root.parent.children[1] = centerNode;
                        else if (root.parent.children[2] === root) root.parent.children[2] = centerNode;
                    } else if (root === twoThreeTree.root) {
                        twoThreeTree.root = centerNode;
                    }

                    return;
                }
                else {
                    if (left.children[1]) {
                        newnode.children[0] = left.children[1];
                        newnode.children[0].parent = newnode;
                    }
                    if (right.children[0]) {
                        newnode.children[1] = right.children[0];
                        newnode.children[1].parent = newnode;
                    }
                    if (right.children[2]) {
                        newnode.children[2] = right.children[2];
                        newnode.children[2].parent = newnode;
                    }

                    if (root !== twoThreeTree.root) {
                        root.children = [];
                        root.children[1] = newnode;
                        root.children[1].parent = root;
                    }
                    else if (root === twoThreeTree.root) {
                        twoThreeTree.root = newnode;
                        return;
                    }

                    rebalance(twoThreeTree, root.parent);
                }

            }
            else if (!left && right) {
                if (right.elements.length === 1) {
                    var elements = [];
                    elements.push(root.elements.splice(0, 1)[0]);
                    elements.push(right.elements.splice(0, 1)[0]);
                    right.elements = elements;
                    root.children = [];
                    root.children[1] = right;
                    root.children[1].parent = root;
                    rebalance(twoThreeTree, root.parent);
                } else {
                    var entryA = root.elements[0];
                    var entryB = right.elements.splice(0, 1)[0];
                    var entryC = right.elements.splice(0, 1)[0];
                    root.elements[0] = entryB;
                    right.elements[0] = entryC;
                    root.children[0] = new TwoThreeTreeNode();
                    root.children[0].parent = root;
                    root.children[2].elements.push(entryA);
                }
            }
            else {
                rebalance(twoThreeTree, root.parent);
            }
        }
        else {
            if (
				root.children[0] &&
				root.children[1] &&
				root.children[2] &&
				root.children[0].length > 0 &&
				root.children[1].length > 0 &&
				root.children[2].length > 0
			) return;

            if (!root.children[0] || root.children[0].elements.length === 0) {

                var leftentry = root.elements.splice(0, 1)[0];
                root.children[0].elements.push(leftentry)

                if (root.children[1].elements.length > 1) {
                    root.elements.unshift(root.children[1].elements.splice(0, 1)[0]);

                    if (root.children[0].children[1]) {
                        root.children[0].children[0] = root.children[0].children[1];
                        root.children[0].children[0].parent = root.children[0];
                        root.children[0].children[1] = null;
                    }

                    if (root.children[1].children[0]) {
                        root.children[0].children[2] = root.children[1].children[0];
                        root.children[0].children[2].parent = root.children[0];
                    }

                    if (root.children[1].children[1]) {
                        root.children[1].children[0] = root.children[1].children[1];
                        root.children[1].children[0].parent = root.children[1];
                        root.children[1].children[1] = null;
                    }
                }
                else {
                    root.children[0].elements.push(root.children[1].elements.splice(0, 1)[0]);

                    if (root.children[0].children[1]) {
                        root.children[0].children[0] = root.children[0].children[1];
                        root.children[0].children[0].parent = root.children[0];
                        root.children[0].children[1] = null;
                    }

                    if (root.children[1].children[0]) {
                        root.children[0].children[1] = root.children[1].children[0];
                        root.children[0].children[1].parent = root.children[0];
                    }

                    if (root.children[1].children[2]) {
                        root.children[0].children[2] = root.children[1].children[2];
                        root.children[0].children[2].parent = root.children[0];
                    }

                    root.children[1] = null;
                }
            }
            else if (!root.children[1] || root.children[1].elements.length === 0) {

                if (root.children[0].elements.length === 2) {
                    var midentry = root.elements.splice(0, 1)[0];
                    if (!root.children[1])
                        root.children[1] = new TwoThreeTreeNode();
                    root.children[1].elements.push(midentry);
                    root.children[1].parent = root;
                    var elements = [];
                    elements.push(root.children[0].elements.splice(1, 1)[0]);
                    elements.push(root.elements.splice(0, 1)[0]);
                    root.elements = elements;

                    root.children[1].children[0] = root.children[0].children[2];
                    if (root.children[1].children[0]) root.children[1].children[0].parent = root.children[1];
                    root.children[1].children[2] = root.children[1].children[1];
                    root.children[1].children[1] = null;
                    root.children[0].children[2] = root.children[0].children[1];
                    root.children[0].children[1] = null;
                }
                else if (root.children[2].elements.length === 2) {

                    var midentry = root.elements.splice(1, 1)[0];
                    if (root.children[1] === null)
                        root.children[1] = new TwoThreeTreeNode();
                    root.children[1].elements.push(midentry);
                    root.children[1].parent = root;
                    root.children[1].children[0] = root.children[1].children[1];
                    root.children[1].children[1] = null;
                    root.children[1].children[2] = root.children[2].children[0];
                    if (root.children[1].children[2]) root.children[1].children[2].parent = root.children[1];
                    root.children[2].children[0] = root.children[2].children[1];
                    root.children[2].children[1] = null;
                    var elements = [];
                    elements.push(root.elements.splice(0, 1)[0]);
                    elements.push(root.children[2].elements.splice(0, 1)[0]);
                    root.elements = elements;
                }
                else {
                    var leftentry = root.elements.splice(0, 1)[0];
                    root.children[0].elements.push(leftentry);
                    
                    root.children[0].children[1] = root.children[0].children[2];
                    root.children[0].children[2] = root.children[1].children[1];
                    if (root.children[0].children[2]) root.children[0].children[2].parent = root.children[0];

                    root.children[1] = null;
                }

            }
            else if (!root.children[2] || root.children[2].elements.length === 0) {
                if (root.children[1].elements.length === 2) {
                    var rightentry = root.elements.splice(1, 1)[0];
                    var midentry = root.children[1].elements.splice(1, 1)[0];
                    root.elements.push(midentry);
                    if (!root.children[2])
                        root.children[2] = new TwoThreeTreeNode();
                    root.children[2].parent = root;
                    root.children[2].elements.push(rightentry);
                    if (root.children[2].children[1]) {
                        root.children[2].children[2] = root.children[2].children[1];
                        root.children[2].children[1] = null;
                    }
                    root.children[2].children[0] = root.children[1].children[2];
                    if (root.children[2].children[0]) root.children[2].children[0].parent = root.children[2];
                    root.children[1].children[2] = root.children[1].children[1];
                    root.children[1].children[1] = null;

                } else {
                    var rightentry2 = root.elements.splice(1, 1)[0];
                    var rightentry1 = root.children[1].elements.splice(0, 1)[0];
                    var tempmid = root.children[1];
                    root.children[1] = null;
                    if (root.children[2] === null)
                        root.children[2] = new TwoThreeTreeNode();
                    root.children[2].parent = root;
                    root.children[2].elements = [];
                    root.children[2].elements.push(rightentry1);
                    root.children[2].elements.push(rightentry2);
                    if (root.children[2].children[1]) {
                        root.children[2].children[2] = root.children[2].children[1];
                        root.children[2].children[2].parent = root.children[2];
                    }
                    if (tempmid.children[2]) {
                        root.children[2].children[1] = tempmid.children[2];
                        root.children[2].children[1].parent = root.children[2];
                    }
                    if (tempmid.children[0]) {
                        root.children[2].children[0] = tempmid.children[0];
                        root.children[2].children[0].parent = root.children[2];
                    }
                }
            }

        }
    };

    function remove(twoThreeTree, root, key) {
        if (!root || root.elements.length === 0) return;

        var index = indexofkey(root.elements, key);

        if (index !== null) {
            if (!root.children[0]) {
                root.elements.splice(index, 1);
                rebalance(twoThreeTree, root.parent);
                return;
            } else {
                var oneLess = null;

                if (root.isTwoNode()) {

                    oneLess = getOneLess(root.getLeftChild(), key);
                }
                else {
                    if (index === 0) oneLess = getOneLess(root.getLeftChild(), key);
                    else oneLess = getOneLess(root.getMidChild(), key);
                }

                root.elements[index] = oneLess.elements.splice(oneLess.elements.length - 1, 1)[0];

                if (oneLess && oneLess != root) {
                    rebalance(twoThreeTree, oneLess.parent);
                    return;
                }
            }

            rebalance(twoThreeTree, root);
        }
        else {
            if (root.isTwoNode()) {

                if (root.elements[0].key > key) {
                    remove(twoThreeTree, root.getLeftChild(), key);
                } else {
                    remove(twoThreeTree, root.getRightChild(), key);
                }
            } else {
                if (root.elements[0].key > key) {
                    remove(twoThreeTree, root.getLeftChild(), key);
                } else if (root.elements[0].key < key && root.elements[1].key > key) {
                    remove(twoThreeTree, root.getMidChild(), key);
                } else {
                    remove(twoThreeTree, root.getRightChild(), key);
                }
            }

        }
    };

    return function (key) {        
        remove(this, this.root, key);
    };
}());

TwoThreeTree.prototype.toString = (function () {
    function iterate(root, callback)
    {
        //callback({
        //    elements: root.elements,
        //    parent: root.parent ? root.parent.elements : null
        //});

        if (root.children[0])
            iterate(root.children[0], callback);

        if (root.elements[0])
            callback(root.elements[0].value);

        if (root.children[1])
            iterate(root.children[1], callback);

        if (root.elements[1])
            callback(root.elements[1].value);

        if (root.children[2])
            iterate(root.children[2], callback);
    }

    return function (callback) {
        iterate(this.root, callback);
    }
}());

TwoThreeTree.prototype.search = (function () {
    function search(root, key) {
        if (!root) return null;
        
        for (var i = 0; i < root.elements.length; i++) {
            if (root.elements[i] && root.elements[i].key === key)
                return root.elements[i].value;
        }

        if (root.isTwoNode()) {
            if (key < root.elements[0].key) {
                return search(root.children[0], key);
            }
            else {
                return search(root.children[2], key);
            }
        }
        else if (root.isThreeNode()) {
            if (key < root.elements[0].key) {
                return search(root.children[0], key);
            }
            else if (key < root.elements[1].key)
                return search(root.children[1], key);
            else {
                
                return search(root.children[2], key);
            }
        }

        return null;
    }

    return function (key) {
        return search(this.root, key);
    };
}());

TwoThreeTree.prototype.clear = function () {
    this.root = null;
};

TwoThreeTree.prototype.getHeight = (function () {
    function getHeight(root) {
        if (!root) return 0;
        return getHeight(root.children[0]) + 1;
    }

    return function () {
        return getHeight(this.root);
    }
}());

TwoThreeTree.prototype.height = (function () {
    function height(root) {
        if (!root) return 0;
        if (!root.children[0] && !root.children[1] && !root.children[2]) return 1;
        return Math.max(height(root.children[0]) + 1, height(root.children[1]) + 1, height(root.children[2]) + 1);
    };

    return function () {
        return height(this.root);
    };
}());

module.exports.TwoThreeTree = TwoThreeTree;