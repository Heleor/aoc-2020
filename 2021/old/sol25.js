var fs = require('fs');

const DEBUG = false;
const NUMBER = 25;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

function print(data) {
  for (let row of data) {
    console.log(row.join(''));
  }
}

function run() {
  let data = readFileFlat(FILE);
  let h = data.length;
  let w = data[0].length;

  let step = () => {
    let new_data = [];
    for (let y = 0; y < h; y++) {
      new_data.push([]);
      for (let x = 0; x < w; x++) {
        new_data[y][x] = '.';
      }
    }

    let moves = 0;
    // move right
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        let c = data[y][x];
        if (c == '>' && data[y][(x + 1) % w] == '.') {
          new_data[y][(x + 1) % w] = '>';
          moves++;
        } else if (c == '>' || c == 'v') {
          new_data[y][x] = c;
        }
      }
    }
    
    data = new_data;
    new_data = JSON.parse(JSON.stringify(data));
    for (let x = 0; x < w; x++) {
      new_data.push([]);
      for (let y = 0; y < h; y++) {
        new_data[y][x] = '.';
      }
    }

    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        let c = data[y][x];
        if (c == 'v' && data[(y + 1) % h][x] == '.') {
          new_data[(y + 1) % h][x] = 'v';
          moves++;
        } else if (c == '>' || c == 'v') {
          new_data[y][x] = c;
        }
      }
    }

    data = new_data;

    return moves;
  }

  let move = 0;
  while (true) {
    move++;
    let moves = step();
    console.log("After ", move, "steps", moves, "moves");
    //print(data);
    //if (move == 2) return;
    if (moves == 0) {
      console.log(move);
      return;
    }
  }

}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

run();