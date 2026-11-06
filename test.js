import { Tree, prettyPrint } from "./script.js";

const tree = new Tree([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
]);

prettyPrint(tree.root);

console.log(tree.isBalanced());

tree.inOrderForEach((value) => console.log(value));
tree.preOrderForEach((value) => console.log(value));
tree.postOrderForEach((value) => console.log(value));