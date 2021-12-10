var fs = require('fs');

const DEBUG = false;
const NUMBER = 9;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

function run() {
  let data = readFileFlat(FILE);

  let arr = [];
  let w, h;
  for (let x = 0; x < data.length; x++) {
    arr[x] = [];
    w = data.length;
    for (let y = 0; y < data[x].length; y++) {
      arr[x][y] = data[x][y];
      h = data[x].length;
    }
  }

  let neighbor = (x,y) => {
    if (x < 0 || x >= w || y < 0 || y >= h) {
      return false;
    }
    return arr[x][y];
  }

  let low_points = [];

  let risk = 0;

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let t = arr[x][y];
      let n = neighbor(x, y-1);
      let s = neighbor(x, y+1);
      let e = neighbor(x+1, y);
      let w = neighbor(x-1, y);
      if ((n === false || n > t) && (s === false || s > t) && (e === false || e > t) && (w === false || w > t)) {
        low_points.push([x, y, t]);
        risk += Number(t) + 1;
      }
    }
  }
  
  //console.log(low_points);
  console.log(risk);

  let basins = [];

  for (let i of low_points) {
    let positions = {};
    let to_visit = [i];
    
    while (to_visit.length > 0) {
      let cur = to_visit.pop();
      let x = cur[0], y = cur[1];
      positions[cur[0] + ',' + cur[1]] = true;
      let n = neighbor(x, y-1);
      let s = neighbor(x, y+1);
      let e = neighbor(x+1, y);
      let w = neighbor(x-1, y);
      if (n && n > cur[2] && n < 9) {
        to_visit.push([x, y-1, n]);
      }
      if (s && s > cur[2] && s < 9) {
        to_visit.push([x, y+1, s]);
      }
      if (e && e > cur[2] && e < 9) {
        to_visit.push([x+1, y, e]);
      }
      if (w && w > cur[2] && w < 9) {
        to_visit.push([x-1, y, w]);
      }
    }

    basins.push(positions);
  }

  let sizes = [];
  for (let i of basins) {
    sizes.push(Number(Object.keys(i).length));
  }

  let sorted = sizes.sort(function(a, b){return a-b}).reverse()

  console.log(sorted[0] * sorted[1] * sorted[2]);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

run();