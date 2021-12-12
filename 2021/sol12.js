var fs = require('fs');

const DEBUG = false;
const NUMBER = 12;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

function isUppercase(s) {
  return s === s.toUpperCase();
}

function find_paths(edges, root) {
  let paths = [];
  let connection = root[root.length - 1];
  if (connection == 'end') return [root];
  for (let i of edges[connection]) {
    if (isUppercase(i) || root.indexOf(i) == -1) {
      for (let path of find_paths(edges, [...root, i])) {
        paths.push(path);
      }
    }
  }
  return paths;
}

function run() {
  let data = readFileFlat(FILE);
  let edges = {

  }
  for (let i of data) {
    let [from,to] = i.split('-');
    edges[from] = edges[from] || [];
    edges[from].push(to);
    edges[to] = edges[to] || [];
    edges[to].push(from);
  }

  let paths = find_paths(edges, ['start']);
  console.log(paths.length);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

run();