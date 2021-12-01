var fs = require('fs');

const problem = 15;
const prod = true;
const file = prod ? 'input' + problem : 'sample' + problem;

function f() {
    let data = fs.readFileSync(file).toString();
    let lines = data.split('\r\n');

    let pieces = lines[0].split(',');

    //let pre_last_seen = {} // turn before last seen
    let pre_last_seen = new Map();
    let last_seen = new Map(); // turn last seen
    let prev;
    let turn = 1;
    for (let i = 0; i < pieces.length; i++) {
        let n = Number(pieces[i]);
        pre_last_seen.set(n, last_seen.get(n));
        last_seen.set(n, turn);
        prev = n;
        turn++;
    }

    while (turn <= 30000000) {
        /*console.log("Starting turn " + turn);
        console.log(" Last number: " + prev);
        console.log(" last seen", last_seen.get(prev), pre_last_seen.get(prev));*/

        if (turn % 5000000 == 0) {
            console.log(turn);
        }

        let cur;
        if (!pre_last_seen.get(prev)) {
            cur = 0;
        } else {
            cur = last_seen.get(prev) - pre_last_seen.get(prev);
        }

        //console.log(" Current value is " + cur);

        pre_last_seen.set(cur, last_seen.get(cur));
        last_seen.set(cur, turn);
        prev = cur;

        turn++;

        /*if (!pre_last_seen[prev]) {
            console.log(turn, prev, " only seen once");
            pre_last_seen[0] = last_seen[0];
            last_seen[0] = turn;

            console.log("0 is ", last_seen[0], pre_last_seen[0]);
            prev = 0;
        } else {
            let val = last_seen[prev] - pre_last_seen[prev];
            console.log(turn, prev, " seen twice", val);
            pre_last_seen[val] = last_seen[val];
            last_seen[val] = turn;
            prev = val;
        }*/
    }

    console.log(prev);
}

f();

/*
shame box

    let i = 0;
    let last_number;
    let last_seen = {

    };

    for (i = 0; i < pieces.length; i++) {
        let n = Number(pieces[i]);
        last_number = n;

        if (!last_seen[n]) last_seen[n] = [];
        last_seen[n].push(i);
    }

    let target = 2021;
    while (i <= 10) {
        let n = last_number;

        console.log("Turn ", i, n, last_seen[n]);

        if (!last_seen[n]) {
            last_seen[n] = [];
            last_seen[n].push(i);
            last_number = 0;
        } else {
            let end = last_seen[n].length;
            let a = last_seen[n][end - 1];
            let b = last_seen[n][end - 0];
            let next = b - a;

            if (!last_seen[next]) last_seen[next] = [];
            last_seen[next].push(i);

            last_number = next;
        }

        i++;
        console.log(i, last_number);
    }

    */