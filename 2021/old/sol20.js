var fs = require('fs');

const DEBUG = false;
const NUMBER = 20;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

const LIGHT = '#';
const DARK = '.';

function print(points, w, h) {
  console.log();
  for (let y = 0; y < h; y++) {
    let row = "";
    for (let x = 0; x < w; x++) {
      row = row + (points[x + ',' + y] ? LIGHT : DARK);
    }
    console.log(row);
  }
  console.log();
}

function img_to_points(img) {
  let points = {};

  let w = img[0].length;
  let h = img.length;

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      if (img[y][x] === LIGHT) {
        points[x + ',' + y] = true;
      }
    }
  }

  return [points, w, h];
}

function run() {
  let data = readFileFlat(FILE);
  let alg = data[0];
  let img = data[1].split('\r\n');

  let [cur_points, cur_w, cur_h, cur_booleans = 'light'] = img_to_points(img);

  console.log(cur_w, cur_h);

  //print(cur_points, cur_w, cur_h);

  let pixel = (x,y) => {
    if (cur_booleans == 'light') return cur_points[x + ',' + y] ? 1 : 0;
    else return cur_points[x + ',' + y] ? 0 : 1;
  }

  let apply_algorithm = () => {
    let next_w = cur_w + 2, next_h = cur_h + 2;

    let next_points = {};

    for (let x = 0; x < next_w; x++) {
      for (let y = 0; y < next_h; y++) {
        let old_x = x - 1;
        let old_y = y - 1;

        let code = "";
        code = code + pixel(old_x-1,old_y-1);
        code = code + pixel(old_x,old_y-1);
        code = code + pixel(old_x+1,old_y-1);

        code = code + pixel(old_x-1,old_y);
        code = code + pixel(old_x,old_y);
        code = code + pixel(old_x+1,old_y);
        
        code = code + pixel(old_x-1,old_y+1);
        code = code + pixel(old_x,old_y+1);
        code = code + pixel(old_x+1,old_y+1);

        //code = code.split('').reverse().join('');

        let index = parseInt(code, 2);
        let new_pixel = alg[index];

        /*if (old_x == 2 && old_y == 2) {
          console.log(code, index, new_pixel);
        }*/

        if (cur_booleans == 'light' && new_pixel == DARK) {
          next_points[x + ',' + y] = true;
        } else if (cur_booleans == 'dark' && new_pixel == LIGHT) {
          next_points[x + ',' + y] = true;
        }
      }
    }

    cur_points = next_points;
    cur_w = next_w; cur_h = next_h;
    if (cur_booleans == 'light')
      cur_booleans = 'dark';
    else 
      cur_booleans = 'light';
  }

  for (let i = 0; i < 50; i++) {
    apply_algorithm();
  }

  console.log(Object.keys(cur_points).length);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n\r\n');
}

run();