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

function canVisit(counts, node) {
  if (isUppercase(node)) return true;
  if ((counts[node] || 0) == 0) return true;
  for (let i in counts) {
    if (!isUppercase(i) && counts[i] > 1) return false;
  }
  return true;
}

function count_paths(edges, prefix, counts = {}) {

  let count = 0;
  let connection = prefix[prefix.length - 1];
  if (connection == 'end') {
    console.log(prefix.join(','));
    return 1;
  }
  for (let i of edges[connection]) {
    if (i == 'start') continue;
    if (canVisit(counts, i)) {
      counts[i] = (counts[i] || 0) + 1;
      prefix.push(i);
      count += count_paths(edges, prefix, counts);
      prefix.pop();
      counts[i] = (counts[i] || 0) - 1;
    }
  }
  return count;
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

  for (let i in edges) {
    edges[i].sort();
  }

  //console.log(edges);

  //let paths = find_paths(edges, ['start']);
  //console.log(paths.length);

  let count = count_paths(edges, ['start']);
  console.log(count);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

run();