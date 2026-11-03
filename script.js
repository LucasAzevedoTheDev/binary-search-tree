class Node {
  constructor(value) {  
    this.value = value;
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
  if(array.length === 0) {
    return null;
  }
  const mid = Math.floor(array.length / 2);
  const root = new Node(array[mid]);

  const left = array.slice(0,mid);  
  root.left = buildTree(left);

  const right = array.slice(0, mid);
  root.right = buildTree(right);
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}