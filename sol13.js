var fs = require('fs');
const { start } = require('repl');

const problem = 13;
const prod = true;
const file = prod ? 'input' + problem : 'sample' + problem;

function f() {
    let data = fs.readFileSync(file).toString();
    let lines = data.split('\r\n');

    let start = lines[0];
    let remaining = lines[1].trim().split(',');

    let min, minbus;

    for (let i of remaining) {
        let n = Number(i);
        if (!n) continue;
        let c = 0;
        while (c < start) {
            c+=n;
        }
        let diff = c - start;
        console.log([start, n, c])
        if (!min || diff < min) { min = diff; minbus = n;}
    }


    console.log(min, minbus, minbus * min);
}

f();