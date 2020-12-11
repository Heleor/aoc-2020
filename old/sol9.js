var fs = require('fs');

const prod = true;
const file = prod ? 'input9' : 'sample9';

let PRE = 25;

function f() {
    let data = fs.readFileSync(file).toString();
    let lines = data.split('\r\n');

    /*for (let i = 0; i < lines.length; i++) 
    {
    }*/
    /*let preamble = [];
    for (let i = 0; i < PRE; i++) {
        preamble.push(Number(lines[i]));
    }

    for (let i = PRE; i < lines.length; i++) {
        let n = Number(lines[i]);

        let v = false;
        valid:
        for (let x = 0; x < preamble.length; x++)
        for (let y = 0; y < preamble.length; y++) {
            if (x != y && preamble[x] + preamble[y] == n) {
                v = true;
                break valid;
            }
        }

        if (!v) {
            console.log(n);
            return;
        }

        preamble.shift();
        preamble.push(n);
    }*/

    let target = 776203571;
    //let target = 127;
    for (let i = 0; i < lines.length; i++) {
        // does a set start at i that sums to target
        let sum = Number(lines[i]);
        let j = 1;
        let min = sum, max = sum;
        for (; sum < target ; j++) {
            let n = Number(lines[i+j]);
            sum += n;
            if (min > n) min = n;
            if (max < n) max = n;
        }

        if (sum == target) {
            console.log([i, j, min, max, sum, target])
            console.log(min + max);
        }
    }

    console.log("Yey");
}

f();