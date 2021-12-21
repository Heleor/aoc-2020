var fs = require('fs');

const DEBUG = true;
const NUMBER = 21;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

function run() {
  let data = readFileFlat(FILE);
  console.log(":)");
}

const END = 21;

let count = 1;
let die_rolls = 0;
function roll() {
  die_rolls++;

  let r = count;
  count++;
  if (count > 100) count = 1;
  return r;
}

function play_game(p1, p2) {
  let cur_p1 = p1, cur_p2 = p2;

  let scores = {
    p1: 0,
    p2: 0
  }

  let step = () => {
    // p1 turn
    let p1_rolls = roll() + roll() + roll();
    cur_p1 = cur_p1 + p1_rolls;
    while (cur_p1 > 10) cur_p1 -= 10;

    scores.p1 += cur_p1;

    console.log("p1", p1_rolls, cur_p1, scores.p1);

    if (scores.p1 >= END) {
      return 'p1';
    }

    let p2_rolls = roll() + roll() + roll();
    cur_p2 = cur_p2 + p2_rolls;
    while (cur_p2 > 10) cur_p2 -= 10;

    scores.p2 += cur_p2;

    console.log("p2", p2_rolls, cur_p2, scores.p2);

    if (scores.p2 >= END) {
      return 'p2';
    }

    return 'neither';
  }
  
  winner = 'neither';
  while (winner == 'neither') {
    winner = step();
    //break;
  }

  console.log(winner == 'p1' ? scores.p2 * die_rolls : scores.p1 * die_rolls);
}

function dirac_turn(active, inactive) {
}

function play_dirac(p1, p2) {
  let all_games = {};
  all_games[p1 + "," + 0 + "," + p2 + "," + 0] = 1;

  let current_games = 1;

  let p1_wins = 0;
  let p2_wins = 0;

  let step = () => {
    // p1 turn
    let p1_state = {};
    for (let state in all_games) {
      let games = all_games[state];

      current_games -= games;
  
      let [pos, val, enemy_pos, enemy_val] = state.split(",").map(Number);
  
      for (let roll_1 of [1,2,3])
      for (let roll_2 of [1,2,3])
      for (let roll_3 of [1,2,3]) {
        let sum = roll_1 + roll_2 + roll_3;
        let new_pos = pos + sum;
        while (new_pos > 10) new_pos -= 10;
  
        let new_val = val + new_pos;
        if (new_val >= 21) {
          p1_wins += games;
        } else {
          p1_state[new_pos + "," + new_val + "," + enemy_pos + "," + enemy_val] = (p1_state[new_pos + "," + new_val + "," + enemy_pos + "," + enemy_val] || 0) + games;

          current_games += games;
        }
      }
    }
    all_games = p1_state;
    
    // p2 turn
    let p2_state = {};
    for (let state in all_games) {
      let games = all_games[state];

      current_games -= games;
  
      let [enemy_pos, enemy_val, pos, val] = state.split(",").map(Number);
  
      for (let roll_1 of [1,2,3])
      for (let roll_2 of [1,2,3])
      for (let roll_3 of [1,2,3]) {
        let sum = roll_1 + roll_2 + roll_3;
        let new_pos = pos + sum;
        while (new_pos > 10) new_pos -= 10;
        let new_val = val + new_pos;

        if (new_val >= 21) {
          p2_wins += games;
        } else {
          p2_state[enemy_pos + "," + enemy_val + "," + new_pos + "," + new_val ] = (p2_state[enemy_pos + "," + enemy_val + "," + new_pos + "," + new_val ] || 0) + games;
          current_games += games;
        }
      }
    }
    all_games = p2_state;
  }
 
  while (current_games > 0) {
    step();
  }

  console.log("p1 wins", p1_wins);
  console.log("p2 wins", p2_wins);
}

//play_game(4,8);
//play_dirac(4,8);
//play_game(7,3);
play_dirac(7,3);

/*function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}*/

//run();