class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(array);
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

  includes(node, value) {
    let currentNode = node;

    if (currentNode === null) {
      return false;
    }
    if (value === currentNode.data) {
      return true;
    }

    if (value < currentNode.data) {
      currentNode = node.left;
      return this.includes(currentNode, value);
    } else if (value > currentNode.data) {
      currentNode = node.right;
      return this.includes(currentNode, value);
    }
  }
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
console.log(tree.array);
prettyPrint(tree.root);
console.log(tree.includes(tree.root, 1));
