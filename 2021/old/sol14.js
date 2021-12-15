var fs = require('fs');

const DEBUG = false;
const NUMBER = 14;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

function make_pairs(c) {
  let pairs = {};
  let last_char = undefined;
  for (let i of c.split('')) {
    if (last_char) {
      pairs[last_char + i] = (pairs[last_char + i] || 0) + 1;
    }
    last_char = i;
  }
  return pairs;
}

function run() {
  let data = readFileFlat(FILE);
  let template = data[0].trim();
  let insertions = data[1].split('\r\n');

  let parsed = {};
  for (let i of insertions) {
    let [from, to] = i.split(' -> ');
    parsed[from] = to;
  }

  let pairs = make_pairs(template);
  
  console.log(pairs);

  let step = () => {
    let new_pairs = {};
    let sum = 0;
    for (let i in pairs) {
      if (parsed[i]) {
        let left = i[0] + parsed[i];
        let right = parsed[i] + i[1];
        new_pairs[left] = (new_pairs[left] || 0) + pairs[i];
        new_pairs[right] = (new_pairs[right] || 0) + pairs[i];

        sum += 2 * pairs[i];
      } else {
        new_pairs[i] = (new_pairs[i] || 0) + pairs[i];

        sum += pairs[i];
      }
    }

    console.log(sum);

    pairs = new_pairs;

    /*let new_string = "";
    let last_char = undefined;
    for (let c of template.split('')) {
      let pair = last_char + c;

      if (parsed[last_char + c]) {
        new_string += last_char;
        new_string += parsed[last_char + c];
      } else if (last_char) {
        new_string += last_char;
      }

      last_char = c;
    }
    new_string += last_char;
    template = new_string;*/
  }

  for (let i = 0; i < 40; i++) {
    step();
    //console.log(pairs);
    //console.log(template);
  }  

  let count = {};
  for (let i in pairs) {
    count[i[0]] = (count[i[0]] || 0) + pairs[i];
  }

  let min = undefined, max = undefined;
  let min_let = undefined, max_let = undefined;
  for (let i in count) {
    if (count[i] < min || min === undefined) {
      min = count[i];
      min_let = i;
    }
    if (count[i] > max || max === undefined) {
      max = count[i];
      max_let = i;
    }
  }
  console.log(min_let, min);
  console.log(max_let, max);
  console.log(max - min);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n\r\n');
}

run();