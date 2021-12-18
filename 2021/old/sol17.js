var fs = require('fs');

const DEBUG = false;
const NUMBER = 17;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

function is_in_area(point, area) {
  //console.log(point, area);
  if (point[0] >= area[0] && point[0] <= area[2] && point[1] >= area[1] && point[1] <= area[3]) {
    return true;
  }
  return false;
}

function sim(xv, yv, area) {
  let cur_x = 0, cur_y = 0;
  let cur_xv = xv, cur_yv = yv;

  //console.log("sim", xv, yv);

  //console.log(cur_x, cur_y, cur_xv, cur_yv);

  let step = () => {
    cur_x += cur_xv;
    cur_y += cur_yv;
    if (cur_xv > 0) cur_xv--; else if (cur_xv < 0) cur_xv++;
    cur_yv--;

    //console.log(cur_x, cur_y, cur_xv, cur_yv);
  }

  let can_hit = (x,y,xv,yv) => {
    if (yv > 0) return true;
    if (xv <= 0 && x < area[0]) return false;
    if (y < area[1]) return false;
    return true;
  }

  let max_y = cur_y;

  while (can_hit(cur_x, cur_y, cur_xv, cur_yv)) {
    step();

    if (cur_y > max_y) max_y = cur_y;

    if (is_in_area([cur_x, cur_y], area)) {
      //console.log(xv, yv);
      return [true, max_y];
    }
  }

  return [false, 0];
}

function run() {
  let data = readFileFlat(FILE);
  let [x,y] = data.split(',');
  let xx = x.split('..');
  let yy = y.split('..');
  let x1 = parseInt(xx[0]);
  let x2 = parseInt(xx[1]);

  let y1 = parseInt(yy[0]);
  let y2 = parseInt(yy[1]);

  let area = [x1,y1,x2,y2];

  //console.log(is_in_area([28, -7], area));

  //console.log(sim(5,7, area));

  //process.exit();

  let total_max_y = 0;
  let sum_valid = 0;
  //let all_valid = [];
  for (let xv = -200; xv < 200; xv++) {
    for (let yv = -300; yv < 1000; yv++) {
      let [valid, max_y] = sim(xv, yv, area);
      if (valid) {
        //console.log("Valid", xv, yv);
        sum_valid++;
        //all_valid.push([xv,yv]);
        if (max_y > total_max_y) {
          total_max_y = max_y;
        }
      }
    }
  }

  console.log(sum_valid);
  //console.log(all_valid);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n')[0];
}

run();