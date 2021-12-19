var fs = require('fs');

const DEBUG = true;
const NUMBER = 18;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

function to_tree(list, counter = {root: list, index:0, inner_index:0}) {
  if (Number.isInteger(list)) {
    return {
      type: 'regular',
      value: parseInt(list),
      index: counter.index++,
    };
  } else {
    let left = to_tree(list[0], counter);
    let right = to_tree(list[1], counter);
    let cur = {
      type: 'pair',
      left: left,
      right: right,
      index: "i" + counter.inner_index++,
    }
    return cur;
  }
}

function renumber(root) {
  let counter = 0;
  let inner_counter = 0;
  let traverse = (node) => {
    if (node.type == 'regular') {
      node.index = counter++;
    } else {
      traverse(node.left);
      traverse(node.right);
      node.index = "i" + inner_counter++;
    }
  }
  traverse(root);
}

function print_tree(tree) {
  let str = "";
  let traverse = (node) => {
    if (node.type == 'regular') {
      str += node.value;
    } else {
      str += '[';
      traverse(node.left);
      str += ',';
      traverse(node.right);
      str += ']';
    }
  }
  traverse(tree);
  return str;
}

function add_index(node, index, value) {
  if (node.type == 'regular') {
    if (node.index == index) {
      node.value = Number(node.value) + Number(value);;
    }
  } else {
    add_index(node.left, index, value);
    add_index(node.right, index, value);
  }
}

function replace_index(root, index, replacement) {
  //console.log("replacing", index, replacement);
  let traverse = (node) => {
    if (node.type == 'regular') {
    } else {
      if (node.left.index == index) {
        node.left = replacement;
      } else {
        traverse(node.left);
      }
      if (node.right.index == index) {
        node.right = replacement;
      } else {
        traverse(node.right);
      }
    }
  }
  traverse(root);
}

function find_explode(root, node, level = 0) {
  if (level >= 4) {
    if (node.type == 'pair') {
      // exploding this one.
      let left = node.left;
      let right = node.right;

      add_index(root, left.index - 1, Number(left.value));
      add_index(root, right.index + 1, Number(right.value));
      
      replace_index(root, node.index, {
        type: 'regular',
        value: 0
      })

      renumber(root);

      return true;
    }
  }

  if (node.type == 'regular') {
    // noop
    return false;
  } else {
    if (find_explode(root, node.left, level + 1)) return true;
    if (find_explode(root, node.right, level + 1)) return true;
  }
  return false;
}

function find_split(root, node) {
  if (node.type == 'regular') {
    if (node.value >= 10) {
      replace_index(root, node.index, {
        type: 'pair',
        left: {
          type: 'regular',
          value: Math.floor(node.value / 2),
        },
        right: {
          type: 'regular',
          value: Math.ceil(node.value / 2),
        }
      })
      renumber(root);
      return true;
    }
    return false;
  } else {
    if (find_split(root, node.left)) return true;
    if (find_split(root, node.right)) return true;
  }
  return false;
}

function add_two(left, right) {
  let new_root = {
    type: 'pair',
    left: left,
    right: right
  }
  renumber(new_root);
  return new_root;
}

function magnitude(node) {
    if (node.type == 'regular') {
      return Number(node.value);
    } else {
      return 3 * magnitude(node.left) + 2 * magnitude(node.right);
    }
}

function run() {
  let data = readFileFlat(FILE);

  let current = undefined;

  /*for (let i of data) {
    let c = JSON.parse(i);
    let root = to_tree(c);

    if (current === undefined) {
      current = root;
      continue;
    }

    let next_root = add_two(current, root);

    //console.log("after_addition", print_tree(next_root));

    console.log("  ", print_tree(current));
    console.log("+ ", print_tree(root));

    let step = () => {
      if (find_explode(next_root, next_root)) {
        //console.log("after_explode", print_tree(next_root));
        return 'explode';
      }
      if (find_split(next_root, next_root)) {
        //console.log("after_split", print_tree(next_root));
        return 'split';
      }
      return 'done';
    }

    let reduction = step();
    while (reduction != 'done') {
      reduction = step();
    }

    console.log("= ", print_tree(next_root));
    console.log("...");

    current = next_root;
  }

  console.log(magnitude(current));*/

  let max_magnitude = 0;

  for (let a = 0; a < data.length; a++) {
    for (let b = 0; b < data.length; b++) {
      if (a == b) continue;

      let left = to_tree(JSON.parse(data[a]));
      let right = to_tree(JSON.parse(data[b]));
      let expr = add_two(left, right);

      let step = () => {
        if (find_explode(expr, expr)) {
          //console.log("after_explode", print_tree(next_root));
          return 'explode';
        }
        if (find_split(expr, expr)) {
          //console.log("after_split", print_tree(next_root));
          return 'split';
        }
        return 'done';
      }
  
      let reduction = step();
      while (reduction != 'done') {
        reduction = step();
      }

      let mm = magnitude(expr);
      if (mm > max_magnitude) max_magnitude = mm;
    }
  }

  console.log("max magnitude", max_magnitude);
}

function test() {
  let data = readFileFlat(FILE);
  let a = to_tree(JSON.parse(data[0]));
  
  let step = () => {
    if (find_explode(a, a)) {
      console.log("after_explode", print_tree(a));
      return 'explode';
    }
    if (find_split(a, a)) {
      console.log("after_split", print_tree(a));
      return 'split';
    }
    return 'done';
  }

  let reduction = step();
  while (reduction != 'done') {
    reduction = step();
  }

  console.log(print_tree(a));
}
test();

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

//run();