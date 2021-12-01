var fs = require('fs');

function one() {
    let data = readFileFlat('./input1');


    let last = undefined;
    let window = [];

    let count = 0;
    for (let i of data) {
      let j = Number(i);

      window.push(j);
      if (window.length > 3) {
        window.shift();
      } else if (window.length <= 2) {
        continue;
      }

      let measure = window[0] + window[1] + window[2];

      if (last === undefined) { last = measure; continue; }

      if (measure > last) count++;

      last = measure;
    }

    console.log(count);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

one();