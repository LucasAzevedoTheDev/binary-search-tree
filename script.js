class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor(array) {
    this.array = organizeArray(array);
    this.root = this.buildTree(this.array);
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }
    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    const left = array.slice(0, mid);
    root.left = this.buildTree(left);

    const right = array.slice(mid + 1, array.length);
    root.right = this.buildTree(right);

    return root;
  }

  includes(value, node = this.root) {
    if (node === null) {
      return false;
    }
    if (value === node.data) {
      return true;
    }

    if (value < node.data) {
      return this.includes(value, node.left);
    } else if (value > node.data) {
      return this.includes(value, node.right);
    }
  }

  insert(value, node = this.root) {
    if (this.root === null) {
      this.root = new Node(value);
      return this.root;
    }

    if (node.data === value) {
      return node;
    }

    if (node.data < value) {
      if (node.right === null) {
        node.right = new Node(value);
        return this.root;
      }
      return this.insert(value, node.right);
    }

    if (node.data > value) {
      if (node.left === null) {
        node.left = new Node(value);
        return this.root;
      }
      return this.insert(value, node.left);
    }
  }

  find(value, node = this.root) {
    if (node === null) {
      return undefined;
    }
    if (value === node.data) {
      return node;
    }

    if (value < node.data) {
      return this.find(value, node.left);
    } else if (value > node.data) {
      return this.find(value, node.right);
    }
  }

  findParent(value, node = this.root) {
    if (node === null) {
      return undefined;
    }
    if (value < node.data) {
      if (node.left !== null && node.left.data === value) {
        return node;
      }
      return this.findParent(value, node.left);
    } else if (value > node.data) {
      if (node.right !== null && node.right.data === value) {
        return node;
      }
      return this.findParent(value, node.right);
    }
  }

  deleteItem(value) {
    let parentNode = this.findParent(value);
    let target = this.find(value);
    let targetChild;

    //                    CASE 1 (Node has no children)
    if (target.right === null && target.left === null) {
      if (parentNode.data > value) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
      return;
    }
    //                    CASE 2 (Node has one child (left or right))
    if (target.right !== null || target.left !== null) {
      if (target.right !== null) {
        targetChild = target.right;
      } else if (target.left !== null) {
        targetChild = target.left;
      }

      if (parentNode > target) {
        parentNode.right = targetChild;
      }
      if (parentNode < target) {
        parentNode.left = targetChild;
      }
      return;
    }
    //                    CASE 3
  }
}

function organizeArray(array) {
  const uniqueNumbers = [...new Set(array)];
  uniqueNumbers.sort((a, b) => a - b);

  return uniqueNumbers;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
prettyPrint(tree.root);
tree.deleteItem(5);
prettyPrint(tree.root);
