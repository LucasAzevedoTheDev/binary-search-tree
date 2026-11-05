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

    if (target === undefined) return;

    if (target.right === null && target.left === null) {
      if (parentNode === undefined) {
        this.root = null;
        return;
      }

      if (parentNode.data > value) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
      return;
    }

    if (
      (target.right !== null && target.left === null) ||
      (target.right === null && target.left !== null)
    ) {
      if (target.right !== null) {
        targetChild = target.right;
      } else if (target.left !== null) {
        targetChild = target.left;
      }

      if (parentNode === undefined) {
        this.root = targetChild;
        return;
      }

      if (parentNode.data > target.data) {
        parentNode.left = targetChild;
      }
      if (parentNode.data < target.data) {
        parentNode.right = targetChild;
      }
      return;
    }

    if (target.right !== null && target.left !== null) {
      let successor = target.right;
      while (successor.left !== null) {
        successor = successor.left;
      }
      this.deleteItem(successor.data);
      target.data = successor.data;
      return;
    }
  }

  levelOrderForEach(callback) {
    if (!callback) throw new Error("Callback function is required!");
    if (this.root === null) return;

    let queue = [this.root];

    while (queue.length !== 0) {
      let current = queue.shift();
      callback(current.data);

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
  }

  inOrderForEach(callback) {
    if (!callback) throw new Error("Callback function is required!");
    if (this.root === null) return;
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
tree.levelOrderForEach((value) => console.log(value));
