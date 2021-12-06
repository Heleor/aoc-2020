var fs = require('fs');

const DEBUG = false;
const FILE = DEBUG ? './sample5' : './input5';

function five() {
  let data = readFileFlat(FILE);

  let points = {};

  for (let i of data) {
    let [s,e] = i.split(' -> ');
    let [fx,fy] = s.trim().split(',');
    let [tx,ty] = e.trim().split(',');
    let dx = Math.sign(tx - fx);
    let dy = Math.sign(ty - fy);

    //if (dx != 0 && dy != 0) continue;

    let cx = Number(fx), cy = Number(fy);
    do {
      let p = cx + ',' + cy;
      if (points[p] === undefined) {
        points[p] = 0;
      }
      points[p]++;

      cx += dx;
      cy += dy;
    } while (cx != tx || cy != ty);

    let p = cx + ',' + cy;
    if (points[p] === undefined) {
      points[p] = 0;
    }
    points[p]++;
  }

  let count = 0;
  for (let i in points) {
    //console.log(i, points[i]);
    if (points[i] > 1) {
      count++;
    }
  }

  console.log(count);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

five();