var fs = require('fs');

const DEBUG = true;
const NUMBER = 23;

class PQueue {
  constructor() {
    this.items = [];
  }

  enqueue(k,v) {
    var contain = false;
 
    // iterating through the entire
    // item array to add element at the
    // correct location of the Queue
    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i][1] > v) {
            // Once the correct location is found it is
            // enqueued
            this.items.splice(i, 0, [k,v]);
            contain = true;
            break;
        }
    }
 
    // if the element have the highest priority
    // it is added at the end of the queue
    if (!contain) {
        this.items.push([k,v]);
    }
  }

  isEmpty() {
    return this.items.length == 0;
  }

  dequeue() {
    return this.items.shift()[0];
  }
}

var sample = ['.','.','.','.','.','.','.','.','.','.','.','B','A','C','D','B','C','D','A'].join('');
var input = ['.','.','.','.','.','.','.','.','.','.','.','C','B','D','A','D','B','A','C'].join('');

var solution = "...........AABBCCDD" + "AABBCCDD";

var allowed = {
  'A': {},
  'B': {},
  'C': {},
  'D': {},
}

var hallways = [0,1,2,3,4,5,6,7,8,9,10];
var hallways_allowed = [0,1,3,5,7,9,10]; // do not stand outside room
var room_list = [11,12,13,14,15,16,17,18, 19,20,21,22,23,24,25,26];

var rooms = {
  'A': [11,19,20,12],
  'B': [13,21,22,14],
  'C': [15,23,24,16],
  'D': [17,25,26,16],
}

for (let i of room_list) {
  allowed.A[i] = [...hallways_allowed, ...rooms.A];
  allowed.B[i] = [...hallways_allowed, ...rooms.B];
  allowed.C[i] = [...hallways_allowed, ...rooms.C];
  allowed.D[i] = [...hallways_allowed, ...rooms.D];
}

var room_lookups = {

}
for (let i of ["A", "B","C","D"]) {
  room_lookups[i] = {};
  for (let j of rooms[i]) {
    room_lookups[i][j] = true;
  }
}

for (let i of hallways) {
  allowed.A[i] = rooms.A;
  allowed.B[i] = rooms.B;
  allowed.C[i] = rooms.C;
  allowed.D[i] = rooms.D;
}

var all_costs = {
  /*0: [0,1,2,3,4,5,6,7,8,9,10,3,4,5,6,7,8,9,10],
  1: [1,0,1,2,3,4,5,6,7,8,9,2,3,4,5,6,7,8,9],
  2: [2,1,0,1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8],
  3: [3,2,1,0,1,2,3,4,5,6,7 ,2,3,2,3,4,5,6,7],
  4: [4,3,2,1,0,1,2,3,4,5,6 ,3,4,1,2,3,4,5,6],
  5: [5,4,3,2,1,0,1,2,3,4,5 ,4,5,2,3,2,3,4,5],
  6: [6,5,4,3,2,1,0,1,2,3,4 ,5,6,3,4,1,2,3,4],
  7: [7,6,5,4,3,2,1,0,1,2,3 ,6,7,4,5,2,3,2,3],
  8: [8,7,6,5,4,3,2,1,0,1,2 ,7,8,5,6,3,4,1,2],
  9: [9,8,7,6,5,4,3,2,1,0,1 ,8,9,6,7,4,5,2,3],
  10:[10,9,8,7,6,5,4,3,2,1,0 ,9,10,7,8,5,6,3,4],

  11: [3,2,1,2,3,4,5,6,7,8,9 ,0,1,4,5,6,7,8,9],
  12: [4,3,2,3,4,5,6,7,8,9,10 ,1,0,5,6,7,8,9,10],

  13: [5,4,3,2,1,2,3,4,5,6,7 ,4,5,0,1,4,5,6,7],
  14: [6,5,4,3,2,3,4,5,6,7,8 ,5,6,1,0,5,6,7,8],

  15: [7,6,5,4,3,2,1,2,3,4,5 ,6,7,4,5,0,1,4,5],
  16: [8,7,6,5,4,3,2,3,4,5,6 ,7,8,5,6,1,0,5,6],

  17: [9,8,7,6,5,4,3,2,1,2,3 ,8,9,6,7,4,5,0,1],
  18: [10,9,8,7,6,5,4,3,2,3,4 ,9,10,7,8,5,6,1,0],*/
}

var moves = {
  0: [1],
  1: [0,2],
  2: [1,3,11],
  3: [2,4],
  4: [3,5,13],
  5: [4,6],
  6: [5,7,15],
  7: [6,8],
  8: [7,9,17],
  9: [8,10],
  10: [9],
  
  11: [2,19],
  19: [11,20],
  20: [19,12],
  12: [20],

  13: [4,21],
  21: [13,22],
  22: [14,21],
  14: [22],
  
  15: [6,23],
  23: [24,15],
  24: [16,23],
  16: [24],

  17: [8, 25],
  25: [17, 26],
  26: [25, 18],
  18: [26],
}

function compute_all_costs() {
  for (let i = 0; i <= 26; i++) {

    let costs = {};
    costs[i] = 0;
    let Q = {};
    let q = new PQueue();
    q.enqueue(i, 0);
    while (!q.isEmpty()) {
      let min_key = q.dequeue();
      Q[min_key] = true;
      let cost = costs[min_key];
      for (let i of moves[min_key]) {
        if (costs[i] === undefined) {
          costs[i] = cost + 1;
          q.enqueue(i, cost + 1);
        }
      }
    }

    all_costs[i] = [];
    for (let j = 0; j <= 26; j++) {
      all_costs[i].push(costs[j]);
    }
  }
}

compute_all_costs();

var costs = {
  'A': 1,
  'B': 10,
  'C': 100,
  'D': 1000,
}

function print(state) {
  console.log(
`${state[0]}${state[1]}${state[2]}${state[3]}${state[4]}${state[5]}${state[6]}${state[7]}${state[8]}${state[9]}${state[10]}\n`+
`  ${state[11]} ${state[13]} ${state[15]} ${state[17]}\n`+
`  ${state[19]} ${state[21]} ${state[23]} ${state[25]}\n`+
`  ${state[20]} ${state[22]} ${state[24]} ${state[26]}\n`+
`  ${state[12]} ${state[14]} ${state[16]} ${state[18]}\n`);
}

//const DEBUG_STATE = 'AA.....B.BDBACD.C.ADDCB...C';
const DEBUG_STATE = false;

function can_reach(state, from, to) {

  let debug = false;
  /*if (state == DEBUG_STATE && from == 24 && to == 1) {
    print(state);
    debug = true;

    console.log(state[from], state[to], from, to);
  }*/

  let queue = [from];
  let visited = {};
  while (queue.length > 0) {
    let cur = queue.pop();
    visited[cur] = true;
    if (debug) console.log(cur);

    for (let i of moves[cur]) {
      if (debug) console.log(i, state[i]);
      if (state[i] == '.') {
        if (i == to) {
          if (debug) console.log("SUCCESS");
          return true;
        }
        if (visited[i]) continue;
        queue.push(i);
      }
    }
  }
  if (debug) console.log("FAILURE");
  return false;
}

function swap_chars(state, x,y) {
  let n = state.split('');
  let tmp = n[x];
  n[x] = n[y];
  n[y] = tmp;
  return n.join('');
}

function generate_valid_moves(state) {
  let valid_moves = [];

  for (let letter of ['A','B','C','D']) {
    let first = state.indexOf(letter);
    let second = state.indexOf(letter, first + 1);
    let third = state.indexOf(letter, second + 1);
    let fourth = state.indexOf(letter, third + 1);

    /*let room_list = rooms[letter];
    let correct = {};
    for (let i of room_list) {
      if (state[i] == letter) correct[i] = true;
    }*/

    for (let index of [first, second, third, fourth]) {

      /*if (room_list[3] == index && correct[index]) continue;
      if (room_list[2] == index && correct[index] && correct[room_list[3]]) continue;
      if (room_list[1] == index && correct[index] && correct[room_list[3]] && correct[room_list[2]]) continue;
      if (room_list[0] == index && correct[index] && correct[room_list[3]] && correct[room_list[2]] && correct[room_list[1]]) continue;*/

      let candidates = allowed[letter][index];

      let debug = false;
      if (state == DEBUG_STATE && letter == 'C' && index == first) {
        debug = true;
      }

      for (let i of candidates) {
        if (can_reach(state, index, i)) {

          if (debug == true) {
            console.log("can reach", i);
          }
          
          // rooms can only be entered if they're empty or only have the same one
          let bad_condition = false;
          let best_condition = false;
          if (room_lookups[letter][i]) {
            for (let room of rooms[letter]) {
              if (i == room) continue;
              if (state[room] != '.' && state[room] != letter) { 
                if (debug == true) {
                  console.log("Failing ", i, " due to ", room, state[room])
                }
                bad_condition = true;
              }
            }
          }
          if (bad_condition) {
            if (debug == true) {
              console.log("bad condition!", i);
            }
            continue;
          }
          if (debug == true) {
            console.log("this seems to work?", i, swap_chars(state,index,i));
          }
          valid_moves.push([swap_chars(state, index, i),all_costs[index][i] * costs[letter]]);
        }
      }
    }
  }

  if (state == DEBUG_STATE) {
    print(state);
    console.log(state);
    for (let i of valid_moves) {
      console.log(" ==== Cost ", i[1], " ===== ");
      print(i[0]);
      console.log(i[0]);
    }
    process.exit();
  }

  valid_moves.sort( (a,b) => a[1] - b[1] );
  return valid_moves;
}

const START = input + "DDCBBAAC";
//const START = "...B.......BACD.CDA";

function run() {
  let moves = {};

  moves[START] = 0;

  let queue = new PQueue();
  queue.enqueue(START, 0);

  let Q = {};

  let completed = 0;
  let solutions = 0;

  while (!queue.isEmpty()) {
    let min_key;
    while (min_key === undefined || Q[min_key]) {
      min_key = queue.dequeue();
    }

    if (solutions++ % 2000 == 0) {
      console.log("Solutions: ", solutions, " queue:", queue.items.length);
    }

    let position = min_key;
    let current_cost = moves[position];

    //console.log(position);

    //Q[position] = true;

    let new_moves = generate_valid_moves(position);

    /*if (position == DEBUG_STATE) {
      console.log(new_moves);
      process.exit();
    }*/

    /*for (let [state,cost] of new_moves) {
      if (state == "...B.......BACD.CDA") {
        console.log(state, cost);
      }
    }*/

    //console.log(new_moves);

    for (let [state, cost] of new_moves) { 
      if (current_cost + cost < (moves[state] || Infinity)) {
        moves[state] = current_cost + cost;
        queue.enqueue(state, current_cost + cost);
      }
    }
  }

  /*let solved_path = [];
  let cur = solution;
  let last_cost = moves[solution].cost;
  while (cur) {
    solved_path.push([cur,last_cost - moves[cur].cost]);
    last_cost = moves[cur].cost;
    cur = moves[cur].prev;
  }*/

  /*for (let i of solved_path) {
    console.log(i);
  }*/

  //console.log(moves["..........DBACDBC.ADDCBBAAC"]);
  //console.log(moves["...B.......BA.DCCDA"]);

  fs.writeFileSync('./output23.json', JSON.stringify(moves, null, 2));
  console.log("Solution found in " + moves[solution].cost + " energy");
}

run();