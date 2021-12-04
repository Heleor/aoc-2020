var fs = require('fs');

const DEBUG = false;
const FILE = DEBUG ? './sample4' : './input4';

function check_win(board, matchers, debug = false) {
  for (let col = 0; col < 5; col++) {
    let matched = 0;
    for (let row = 0; row < 5; row++) {
      if (matchers[board[row * 5 + col]]) matched++;
    }
    if (debug) console.log("col", col, matched);
    if (matched == 5) return true;
  }

  for (let col = 0; col < 5; col++) {
    let matched = 0;
    for (let row = 0; row < 5; row++) {
      if (matchers[board[col * 5 + row]]) matched++;
    }
    if (debug) console.log("row", col, matched);
    if (matched == 5) return true;
  }

  return false;
}

function run_sim(numbers, matchers, boards) {
  let already_won = {};
  let last_won;
  for (let i of numbers) {
    matchers[Number(i)] = true;
    let winners = 0;
    for (let b = 0; b < boards.length; b++) {
      let board = boards[b];
      if (check_win(board,matchers)) {
        winners++;
        if (!already_won[b]) {
          last_won = b;
        }
        already_won[b] = true;
      }
    }
    if (winners == boards.length) {
      return [i, boards[last_won]];
    }
  }
  return false;
}

function four() {
  let data = readFileFlat(FILE);

  let numbers = data[0].split(',');
  let matchers = {};
  let boards = [];
  for (let i = 1; i < data.length; i++) {
    let b = [];
    for (let k of data[i].split('\r\n')) {
      for (let j of k.split(' ')) {
        if (j.length > 0) b.push(Number(j));
      }
    }
    boards.push(b);
  }

  let [winning_number, winning_board] = run_sim(numbers, matchers, boards);
  
  let sum = 0;
  for (let i of winning_board) {
    if (!matchers[Number(i)]) sum += Number(i);
  }

  console.log(sum * winning_number);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n\r\n');
}

four();