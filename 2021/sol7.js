var fs = require('fs');

const DEBUG = false;
const NUMBER = 7;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

function run() {
  let data = readFileFlat(FILE)[0].split(',');
  let counts = {

  }
  let min = 0;
  let max = 0;
  for (let i of data) {
    let n = Number(i);
    counts[n] = counts[n] ? counts[n] + 1 : 1;
    if (min > n) min = n;
    if (max < n) max = n;
  }

  let min_pos;
  let min_cost;
  for (let j =  min; j <= max; j++) {
    let sum = 0;
    for (let i in counts) {
      let distance = Math.abs(Number(i) - j);
      let cost = 0;
      for (let k = 0; k < distance; k++) {
        cost += (1+k);
      }
      sum += cost * counts[i];
    }
    if (min_cost > sum || !min_cost) {
      min_cost = sum;
      min_pos = j;
    }

  }

  console.log(min_pos, min_cost);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

run();