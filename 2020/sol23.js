var fs = require('fs');

const problem = 23;

const prod = true;
const file = prod ? 'input' + problem : 'sample' + problem;

function f() {
    //    let data = fs.readFileSync(file).toString();
    //let lines = data.split('\r\n');
    //let sections = data.split('\r\n\r\n');

    //let prod = [1,5,6,7,9,4,8,2,3];
    //let sample = [3,8,9,1,2,5,4,6,7];

    let input = '156794823'.split(''); // prod
    //let sample = '389125467'.split(''); // sample
    //let N = 9;

    let N = 1000 * 1000; // 1m

    let prev;
    let first;

    let current_i = 0;

    let sentinel = 9;

    let move = () => {
        let r1_i = (current_i + 1) % N;
        let r2_i = (current_i + 2) % N;
        let r3_i = (current_i + 3) % N;

        let next_i = (current_i + 4) % N;

        if (current_i + 4 >= sentinel) sentinel = current_i + 4;

        let r1_v = input[r1_i] || r1_i;
        let r2_v = input[r2_i] || r2_i;
        let r3_v = input[r3_i] || r3_i;

        let next_v = input[next_i] || next_i;

        let current_value = input[current_i] || current_i;
        let dest = current_value - 1;
        if (dest <= 0) dest += N;
        while (dest == r1_v || dest == r2_v || dest == r3_v) {
            dest--;
            while (dest <= 0) dest += N;
        }

        let pp = ''
        for (let i = 0; i < sentinel; i++) {
            if (i == current_i) pp += '(';
            if (input[i] == next_v) pp += '[';
            pp += input[i];
            if (i == current_i) pp += ')';
            if (input[i] == next_v) pp += ']';
            pp+= ' ';
        }
        console.log("cups: ", pp);
        console.log("current", current_value);
        console.log("next", next_v);
        console.log("pickup", input[r1_i], input[r2_i], input[r3_i])
        console.log("dest", dest);
        console.log('--');

        let next = [];

        if (dest == N) {
            next.push(r1_v);
            next.push(r2_v);
            next.push(r3_v);
        }

        for (let i = 0; i < sentinel; i++) {
            if (i != r1_i && i != r2_i && i != r3_i) {
                next.push(input[i]);
            }
            if (input[i] == dest) {
                next.push(r1_v);
                next.push(r2_v);
                next.push(r3_v);
            }
        }
        // current is the cup with input[(current + 1) % N]
        if (next_v > sentinel) {
            for (let j = input.length; j < sentinel; j++) {
                next.push(j);
            }
            sentinel = next_v.length;

            current_i = next_v;
        } else {
            for (let i = 0; i < sentinel; i++) {
                if (next[i] == next_v) {
                    current_i = i;
                }
            }
        }

        input = next;

        //console.log('next_val', next_val, current_i);
    }

    //for (let i = 0; i < 100; i++)
    //for (let i = 0; i < 10; i++)
    for (let i = 0; i < 3; i++) {
        move();
        /*if (i % 1000 == 0) {
            let row = [];
            for (let j = 0; j < sentinel; j++) {
                row.push(input[j]);
            }
            console.log(row);
            console.log(i);
        }*/
    }

    // find the 1
    for (let j = 0; j < N ;j ++) {
        if (input[j] == 1) {
            console.log(input[j+1]);
            console.log(input[j+2]);
            console.log(input[j+1] * input[j+2]);
            return;
        }
    }

    //console.log(input.join(''));
}

f();