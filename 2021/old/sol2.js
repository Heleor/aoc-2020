var fs = require('fs');

const DEBUG = false;
const FILE = DEBUG ? './sample2' : './input2';

function two() {
    let data = readFileFlat(FILE);

    let h = 0, d = 0, aim = 0;
    for (let i of data) {
      let s = i.split(' ');
      //if (s[0] == 'forward') h += Number(s[1]);
      //if (s[0] == 'down') d += Number(s[1]);
      //if (s[0] == 'up') d -= Number(s[1]);
      if (s[0] == 'down') aim += Number(s[1]);
      if (s[0] == 'up') aim -= Number(s[1]);
      if (s[0] == 'forward') { 
        h += Number(s[1]);
        d += Number(s[1]) * aim;
      }
    }

    console.log(h * d);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

two();