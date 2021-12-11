var fs = require('fs');

const DEBUG = false;
const NUMBER = 10;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

const pairs = {
  '[': ']',
  '{': '}',
  '(': ')',
  '<': '>'
}

const costs = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}

const second_costs = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4
}

function parse_line(line) {
  let stack = [];
  let chars = line.split('');
  for (let char of chars) {
    if (pairs[char]) {
      stack.push(char);
    } else {
      let close = stack.pop();
      if (pairs[close] !== char) {
        //console.log("Expected " + pairs[close] + " but got " + char + " instead.");
        return char;
      }
    }
  }
  return 'incomplete';
}

function complete_line(line) {
  let stack = [];
  let chars = line.split('');
  for (let char of chars) {
    if (pairs[char]) {
      stack.push(char);
    } else {
      let close = stack.pop();
      if (pairs[close] !== char) {
        throw "ew";
      }
    }
  }

  let cost = 0;
  
  while (stack.length > 0) {
    let close = stack.pop();
    cost = cost * 5;
    cost = cost + second_costs[close];
  }
  return cost;
}

function run() {
  let data = readFileFlat(FILE);

  let sum = 0;
  let scores = [];

  for (let i of data) {
    let res = parse_line(i);
    if (res != 'incomplete') continue;
    //sum += costs[res];
    let val = complete_line(i);
    scores.push(val);
  }
  //console.log(sum);

  scores.sort( (a,b) => {
    return a - b;
  });
  console.log(scores[Math.floor(scores.length / 2)]);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

run();