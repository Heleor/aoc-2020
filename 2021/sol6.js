var fs = require('fs');

const DEBUG = false;
const NUMBER = 6;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

function run() {
  let data = readFileFlat(FILE);
  let numbers = data[0].split(',');

  let count = {

  }

  for (let i of numbers) {
    count[i] = (count[i] || 0) + 1;
  }

  let sum = () => {
    let total = 0;
    for (let i in count) {
      total += count[i];
    }
    return total;
  }

  let iteration = 0;
  let iterate = () => {
    iteration++;
    let new_count = {};
    for (let i in count) {
      let next_number = Number(i) - 1;
      if (next_number < 0) {
        next_number = 6;
        new_count[8] = count[i];
      }
      new_count[next_number] = (new_count[next_number] || 0) + count[i];
    }
    count = new_count;

    console.log(iteration, sum(), new_count);
  }

  for (let i = 0; i < 256; i++) {
    iterate();
  }


  console.log(sum());
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

run();