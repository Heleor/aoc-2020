var fs = require('fs');

const problem = 24;

const prod = false;
const file = prod ? 'input' + problem : 'sample' + problem;

let dirs = {
    "e": { x : 2, y: 0 },
    "w": { x : -2, y: 0 },
    "ne": { x : 1, y: -1 },
    "nw": { x : 1, y: 1 },
    "se": { x : -1, y: -1 },
    "sw": { x : -1, y: 1 },
}

function f() {
    let data = fs.readFileSync(file).toString();
    let lines = data.split('\r\n');
    //let sections = data.split('\r\n\r\n');

    let colors = {

    };

    for (let line of lines) {

        let cx = 0, cy = 0;
        let prev = '';
        for (let i = 0; i < line.length; i++) {
            let c = prev + line[i];
            if (dirs[c]) {
                cx += dirs[c].x;
                cy += dirs[c].y;
                prev = '';
            } else {
                prev = line[i];
            }
        }

        let k = cx + "," + cy;

        if (!colors[k]) colors[k] = 0;
        colors[k]++;
    }

    console.log(JSON.stringify(colors, null, 2));

    let sum = 0;
    for (let c in colors) {
        if (colors[c] % 2 == 1) sum++;
    }
    console.log(sum);
}

f();