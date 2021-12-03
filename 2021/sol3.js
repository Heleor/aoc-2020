var fs = require('fs');

const DEBUG = false;
const FILE = DEBUG ? './sample3' : './input3';

function find(data, bits, type) {
  let current_data = [...data];
  let next_data = [];
  for (let index = 0; index < bits; index++) {

    let this_filter = find_common(current_data, type);
    console.log(index, this_filter);

    for (let i of current_data) {
      if (i.split('')[index] == this_filter[index]) {
        next_data.push(i);
      }
    }
    console.log(next_data.length, next_data);
    if (next_data.length == 1) return next_data[0];
    current_data = next_data;
    next_data = [];
  }
}

function find_common(data, type = 'most') {
  let count = {};
  let total = 0;
  let bits = 0;

  for (let i of data) {
    total++;
    let a = i.split('');
    for (let j = 0; j < a.length; j++) {
      if (a[j] == '1') {
        if (!count[j]) count[j] = 0;
        count[j]++;
      }
    }
    if (bits < a.length) bits = a.length;
  }

  let debug = "";
  for (let i = bits - 1; i >= 0; i--) {
    if (count[i] > total / 2) {
      if (type =='most') debug = "1" + debug;
      else debug = "0" + debug;
    } else if (count[i] == total / 2) {
      if (type == 'most') debug = "1" + debug;
      else debug = "0" + debug;
    } else {
      if (type =='most') debug = "0" + debug;
      else debug = "1" + debug;
    }
  }
  return debug;
}

function three() {
  let data = readFileFlat(FILE);

  let count = {};
  let total = 0;
  let bits = 0;

  for (let i of data) {
    total++;
    let a = i.split('');
    for (let j = 0; j < a.length; j++) {
      if (a[j] == '1') {
        if (!count[j]) count[j] = 0;
        count[j]++;
      }
    }
    if (bits < a.length) bits = a.length;
  }


  let o = find(data, bits, 'most');
  let s = find(data, bits, 'least');

  console.log(parseInt(o, 2) * parseInt(s, 2));

  //console.log(g_debug, e_debug);
  //console.log(gamma, epsilon);
  //console.log(gamma * epsilon);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

three();