var fs = require('fs');

const DEBUG = false;
const NUMBER = 15;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

function print(arr) {
  for (let i of arr) {
    console.log(i.join(''));
  }
}

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

function run() {
  let data = readFileFlat(FILE);
  
  let arr = [];
  for (let i of data) {
    arr.push(i.split(''));
  }

  let w = arr[0].length;
  let tw = w * 5;

  let get_risk = (x,y) => {
    let mx = Math.floor(x / w);
    let lx = x % w;
    let my = Math.floor(y / w);
    let ly = y % w;

    let base_risk = Number(arr[lx][ly]);

    base_risk += mx;
    base_risk += my;
    
    while (base_risk > 9) base_risk -= 9;

    return base_risk;
  }

  /*for (let x = 0; x < tw; x++) {
    let risks = [];
    for (let y = 0; y < tw; y++) {
      risks.push(get_risk(x,y));
    }
    console.log(risks.join(''));
  }*/

  let neighbors = (x,y) => {
    let list = [];
    if (x > 0) list.push([x-1,y]);
    if (x + 1 < tw) list.push([x+1,y]);
    if (y > 0) list.push([x,y-1]);
    if (y + 1 < tw) list.push([x,y+1]);

    list.sort((a,b) => {
      return get_risk(b[0],b[1]) - get_risk(a[0],a[1]);
    })

    return list;
  }

  /*let shortest = [];
  for (let x = 0; x < tw; x++) {
    shortest[x] = [];
    for (let y = 0; y < tw; y++) {
      shortest[x][y] = undefined;
    }
  }

  let queue = [[0,0]]; 
  shortest[0][0] = 0;

  let visited = 0;

  while(queue.length > 0) {
    let [x,y] = queue.pop();

    let c_risk = shortest[x][y];

    //console.log(x,y,c_risk);
    visited++;
    if (visited % (100 * 100 * 100) == 0) {
      console.log(visited);
    }

    for (let i of neighbors(x,y)) {
      let [nx,ny] = i;

      let next_risk = c_risk + get_risk(nx,ny);

      //console.log([nx,ny, arr[nx][ny], c_risk, next_risk]);

      if (shortest[nx][ny] === undefined) {
        shortest[nx][ny] = next_risk;
        queue.push(i);
      } else if (shortest[nx][ny] > next_risk) {
        shortest[nx][ny] = next_risk;
        queue.push(i);
      }
    }
  }

  console.log('...');

  console.log(shortest[tw-1][tw-1]);

  fs.writeFileSync('./output15', JSON.stringify(shortest));*/

  let node_dist = {};
  let Q = {};

  for (let x = 0; x < tw; x++) {
    for (let y = 0; y < tw; y++) {
      let key = x + ',' + y;
      Q[key] = true;
    }
  }

  node_dist["0,0"] = 0;

  let remaining = Object.keys(Q).length;

  let shortest = new PQueue();
  shortest.enqueue('0,0', 0);

  while(remaining > 0) {

    if (remaining % 1000 == 0) console.log(remaining);

    // find minimal distnace
    //let min_dist = 10000000000000;
    //let min_key = undefined;
    /*for (let i in Q) {
      if (node_dist[i] < min_dist) {
        min_dist = node_dist[i];
        min_key = i;
      }
    }*/
    /*for (let i in node_dist) {
      if (!Q[i]) continue;
      if (node_dist[i] < min_dist) {
        min_key = i;
        min_dist = node_dist[i];
      }
    }*/

    let min_key;
    while (min_key === undefined || !Q[min_key]) {
      min_key = shortest.dequeue();
    }

    delete Q[min_key];
    remaining--;

    let [x,y] = min_key.split(',').map(Number);
    for (let i of neighbors(x,y)) {
      let [nx,ny] = i;
      let alt = node_dist[min_key] + get_risk(nx,ny);
      if (alt < (node_dist[nx + ',' + ny] || Infinity)) {
        node_dist[ nx + ',' + ny ] = alt;
        shortest.enqueue(nx + ',' + ny, alt);
      }
    }
  }

  console.log(node_dist["" + (tw-1) + ',' + (tw-1)]);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

run();