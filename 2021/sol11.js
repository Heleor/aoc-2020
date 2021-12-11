var fs = require('fs');

const DEBUG = false;
const NUMBER = 11;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

const SIZE = 10;

function print(grid) {
  for (let x = 0; x < SIZE; x++) {
    console.log(grid[x].join(''));
  }
}

function run() {
  let data = readFileFlat(FILE);
  let grid = [];
  for (let i of data) {
    grid.push(i.split(''));
  }

  let for_neighbor = (x,y, callback) => {
    if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) {
      return;
    }
    callback(x,y);
  }

  let flash_count = 0;

  let step = () => {
    let new_grid = JSON.parse(JSON.stringify(grid));
    let flashed = {};

    let flashes = [];
    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        new_grid[x][y] = Number(grid[x][y]) + 1;
        if (new_grid[x][y] > 9) {
          flashes.push([x,y]);
        }
      }
    }

    let increase = (x,y) => {
      new_grid[x][y] = Number(new_grid[x][y]) + 1;
      if (new_grid[x][y] > 9) {
        flashes.push([x,y]);
      }
    }

    while (flashes.length > 0) {
      let [x,y] = flashes.pop();

      if (flashed[x + ',' + y]) {
        continue;
      }

      flashed[x + ',' + y] = true;
      flash_count++;

      for_neighbor(x-1,y-1, increase);
      for_neighbor(x,y-1, increase);
      for_neighbor(x+1,y-1, increase);

      for_neighbor(x-1,y, increase);
      for_neighbor(x+1,y, increase);

      for_neighbor(x-1,y+1, increase);
      for_neighbor(x,y+1, increase);
      for_neighbor(x+1,y+1, increase);
    }

    for (let i in flashed) {
      let [x,y] = i.split(',');
      new_grid[Number(x)][Number(y)] = 0;
    }

    grid = new_grid;

    if (Object.keys(flashed).length == 100) {
      return true;
    }
    return false;
  }

  let i = 0;
  while (true) {
    i++;
    let final = step();
    if (final) {
      console.log(i);
      return;
    }
    //print(grid);
  }

  console.log(flash_count);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

run();