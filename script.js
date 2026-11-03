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
    this.root = null;
  }
}

function buildTree(array) {
  if (array.length === 0) {
    return null;
  }
  const mid = Math.floor(array.length / 2);
  const root = new Node(array[mid]);

  const left = array.slice(0, mid);
  root.left = buildTree(left);

  const right = array.slice(mid + 1, array.length);
  root.right = buildTree(right);

  return root;
}

function includes(node, value) {
  // node is null = ?
  // value equals node's data = ? 
  // value smaller than node's data = ? 
  // value bigger than node's data = ? 
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const root = buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
prettyPrint(root);
