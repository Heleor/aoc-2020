var fs = require('fs');

const problem = 11;
const prod = true;
const file = prod ? 'input' + problem : 'sample' + problem;

function print(arr) {
    for (let x = 0; x < arr.length; x++) {
        let s = "";
    for (let y = 0; y < arr[x].length; y++) {
        s += arr[x][y];
    }
    console.log(s);
    }
}

function f() {
    let data = fs.readFileSync(file).toString();
    let lines = data.split('\r\n');

    let square = [];
    for (let i = 0; i < lines.length; i++) {
        square[i] = [];
        for (let c = 0; c < lines[i].length; c++) {
            square[i][c] = lines[i][c];
        }
    }

    let prev = square;

    let project = (a, x,y, dx, dy) => {
        let n = 1;
        while(true) {
            let xx = x + dx * n, yy = y + dy * n;
            if (xx >= 0 && yy >= 0 && xx < a.length && yy < a[xx].length) {
                if (a[xx][yy] == '#') {
                    return true;
                }
                if (a[xx][yy] == 'L') {
                    return false;
                }
            } else {
                return false;
            }
            n++;
        }
        return false;
    }

    let iter = (cycle) => {
        let next = JSON.parse(JSON.stringify(prev));

        for (let x = 0; x < prev.length; x++)
        for (let y = 0; y < prev[x].length; y++) {
            let cur = prev[x][y];

            if (!cur) {
                console.log([cycle, x, y]);
                throw ":(";
            }

            let neighbors = 0;
            if (project(prev, x,y, -1,-1)) neighbors++;
            if (project(prev, x,y, 0,-1)) neighbors++;
            if (project(prev, x,y, 1,-1)) neighbors++;

            if (project(prev, x,y, -1,0)) neighbors++;
            if (project(prev, x,y, 1,0)) neighbors++;

            if (project(prev, x,y, -1,1)) neighbors++;
            if (project(prev, x,y, 0,1)) neighbors++;
            if (project(prev, x,y, 1,1)) neighbors++;

            if (cur == 'L' && neighbors == 0) {
                next[x][y] = '#';
            } else if (cur =='#' && neighbors >= 5) {
                next[x][y] = 'L';
            }
        }

        return next;
    }

    let cycles = 0;
    while(true) {
        let next = iter(cycles);
        cycles++;

        /*console.log("After " + cycles + " cycles");
        print(next);
        console.log('-----');*/

        if (JSON.stringify(next) == JSON.stringify(prev)) {
            prev = next;
            break;
        }
        prev = next;
    }

    let count = 0;
    for (let x = 0; x < prev.length; x++)
    for (let y = 0; y < prev[x].length; y++) {
        if (prev[x][y] == '#') count++;
    }

    console.log(count);
}

f();