# Binary Search Tree

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=flat&logo=nodedotjs&logoColor=white)

A balanced binary search tree built from scratch with JavaScript classes and run with Node.js. This project is part of [The Odin Project's](https://www.theodinproject.com/) JavaScript curriculum, focused on trees: every node has up to two children, smaller values go left, larger values go right, and keeping the tree balanced keeps every search fast.

## Features

- **`Node` Class:** Holds `data` plus `left` and `right` references, both `null` by default.
- **Balanced Build:** `new Tree(array)` removes duplicates, sorts the values, and `buildTree` recursively picks the middle element as the root of each subtree.
- **`insert(value)`:** Walks down the tree and adds the value as a new leaf, ignoring duplicates.
- **`deleteItem(value)`:** Handles all three cases: a leaf, a node with one child (the child takes its place), and a node with two children (replaced by its in-order successor).
- **`find(value)` / `includes(value)`:** Return the node holding a value, or whether the value is in the tree.
- **Traversals:** `levelOrderForEach` (breadth-first, with a queue) and `inOrderForEach`, `preOrderForEach`, `postOrderForEach` (depth-first, recursive). All take a callback and throw an error if none is passed.
- **`height(value)` / `depth(value)`:** The number of edges from a node down to its deepest leaf, or from the root down to the node.
- **`isBalanced()`:** Checks that the left and right subtree heights differ by at most 1 at every node, not just the root.
- **`rebalance()`:** Collects every value in order and rebuilds a balanced tree from them.
- **`prettyPrint(node)`:** Draws the tree in the console.
- **ES Modules:** `Tree` and `prettyPrint` live in `script.js` and are imported into `test.js`, which builds a tree, unbalances it with values over 100 and rebalances it.

## Key Learnings

- **Checking Every Node:** Equal heights at the root don't make a tree balanced, so `isBalanced` checks the current node and then calls itself on both subtrees.
- **Choosing the Base Case:** Tracing the smallest possible tree (a single node) showed that an empty subtree has to return `true`. Returning `null` made every leaf report "unbalanced" and pushed that answer all the way up to the root.
- **Reading `null` Children:** `node.left.data` throws when `node.left` is `null`, so the `null` check has to come before reading any property, and an empty subtree counts as height `-1`.
- **`return` Ends the Function:** Two `return` lines in a row never reach the second one, so both recursive results go in one expression with `&&` (and `||` would have accepted a single balanced side).
- **Passing vs Calling a Callback:** `array.push()` runs immediately; the traversal needs a function it can call later, like `(value) => array.push(value)`.
- **Storing the Result:** A local variable disappears when the method ends, so `rebalance` has to assign the new tree to `this.root`, just like the constructor does.
- **Reusing My Own Methods:** `rebalance` is three lines because in-order traversal already returns sorted values and `buildTree` already turns a sorted array into a balanced tree.

## How to Run Locally

```bash
git clone https://github.com/LucasAzevedoTheDev/binary-search-tree.git
cd binary-search-tree
node test.js
```

---
Developed by [Lucas Azevedo](https://github.com/LucasAzevedoTheDev)
