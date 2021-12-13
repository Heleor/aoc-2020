var fs = require('fs');

const DEBUG = false;
const NUMBER = 13;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

function fold(points, dir, val) {
  let newPoints = [];

  for (let i of points) {
    if (dir == 'y') {
      if (i[1] < val) {
        newPoints.push(i);
      } else {
        let dist = i[1] - val;
        newPoints.push([i[0], val - dist]);
      }
    } else {
      if (i[0] < val) {
        newPoints.push(i);
      } else {
        let dist = i[0] - val;
        newPoints.push([val - dist, i[1]]);
      }
    }
  }

  return newPoints;
}

function run() {
  let data = readFileFlat(FILE);
  let lines = data[0].split('\r\n');
  let folds = data[1].split('\r\n');

  let points = [];

  for (let i of lines) {
    let [x, y] = i.split(',');
    points.push([Number(x), Number(y)]);
  }

  for (let f of folds) {
    let inst = f.split(' ')[2];
    let [dir, val] = inst.split('=');
    points = fold(points, dir, Number(val));
  }

  let dedup = {};
  for (let i of points) {
    let key = i.join(',');
    dedup[key] = true;
    console.log(key);
  }

  let arr = [];
  for (let x = 0; x < 2000; x++)  {
    arr[x] = [];
    for (let y = 0; y < 2000; y++) {
      arr[x][y] = ' ';
    }
  }

  for (let i of points) {
    arr[i[0]][i[1]] = '#';
  }

  let str = "";
  for (let i of arr) {
    str += i.join('') + '\n';
  }

  fs.writeFileSync('./output13', str)
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n\r\n');
}

run();