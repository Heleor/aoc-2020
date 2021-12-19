var fs = require('fs');

const DEBUG = true;
const NUMBER = 20;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

function run() {
  let data = readFileFlat(FILE);
  console.log(":)");
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

run();