var fs = require('fs');

const DEBUG = false;
const NUMBER = 8;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

function set_diff(letters, removed) {
  //console.log("set diff", letters, removed);
  let result = [];
  for (let l of letters.split('')) {
    if (removed.indexOf(l) == -1) {
      result.push(l);
    }
  }
  //console.log("=", result.join(''));
  return result.join('');
}

function solve_fives(candidates, solved) {
  // solve 5s
  let count_fives = {};
  for (let c of candidates[5]) {
    for (let letter of c.split('')) {
      count_fives[letter] = (count_fives[letter] || 0) + 1;
    }
  }

  let common_fives = [];
  for (let i in count_fives) {
    if (count_fives[i] == 3) {
      common_fives.push(i);
    }
  }

  // find the "3" -- it's the one with the two non-common symbols in 1
  let three_pieces = candidates[1].split('');
  let three_letters = [...common_fives, ...three_pieces].sort().join('');
  solved[three_letters] = 3;

  // the "2" is the one with 8 - 7 - 4 
  let two_piece = set_diff(set_diff(candidates[8], candidates[4]), [...common_fives].sort().join(''));
  for (let i of candidates[5]) {
    if (i.indexOf(two_piece) != -1) {
      solved[i] = 2;
    } else if (i != three_letters) {
      solved[i] = 5;
    }
  }

  for (let i in solved) {
    candidates[solved[i]] = i;
  }
}

function solve_sixes(candidates, solved) {
  let count_sixes = {};
  for (let c of candidates[6]) {
    for (let letter of c.split('')) {
      count_sixes[letter] = (count_sixes[letter] || 0) + 1;
    }
  }

  let common_sixes = [];
  for (let i in count_sixes) {
    if (count_sixes[i] == 3) {
      common_sixes.push(i);
    }
  }

  // each of the three sixes (0, 6, 9) shares two pieces in common
  let zero = set_diff(set_diff(set_diff(candidates[8], [...common_sixes].sort().join('')), candidates[1]), candidates[4]);
  let six = [...candidates[5].split(''), ...zero.split('')].sort().join('');
  solved[six] = 6;

  for (let i of candidates[6]) {
    if (i == six) continue;
    if (i.indexOf(zero) != -1) {
      solved[i] = 0;
    } else {
      solved[i] = 9;
    }
  }
}

function run() {
  let data = readFileFlat(FILE);

  let found = 0;

  for (let line of data) {
    let [left, right] = line.split("|");
    left = left.trim();
    right = right.trim();

    let patterns = left.split(' '); // 10
    let outputs = right.split(' '); // 4

    let solved = {}; // "ace" -> 1

    let candidates = {5: [], 6: []}; // 5: ["ace", "bdf"]
    
    for (let pattern of patterns) {
      if (pattern.length == 2) {
        solved[pattern.split('').sort().join('')] = 1;
        candidates[1] = pattern.split('').sort().join('');
      } else if (pattern.length == 4) {
        solved[pattern.split('').sort().join('')] = 4;
        candidates[4] = pattern.split('').sort().join('');
      } else if (pattern.length == 3) {
        solved[pattern.split('').sort().join('')] = 7;
        candidates[7] = pattern.split('').sort().join('');
      } else if (pattern.length == 7) {
        solved[pattern.split('').sort().join('')] = 8;
        candidates[8] = pattern.split('').sort().join('');
      } 

      if (pattern.length == 5) {
        candidates[5].push(pattern.split('').sort().join(''));
      } else if (pattern.length == 6) {
        candidates[6].push(pattern.split('').sort().join(''));
      }
    }

    solve_fives(candidates, solved);
    solve_sixes(candidates, solved);

    let multiplier = 1000;
    let four_digit = 0;
    for (let output of outputs) {
      let key = output.split('').sort().join('');

      let number = solved[key];

      four_digit += multiplier * number;
      multiplier = multiplier / 10;
    }
    found += four_digit;
  }

  console.log(found);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

run();