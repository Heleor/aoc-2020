var fs = require('fs');

const problem = 12;
const prod = false;
const file = prod ? 'input' + problem : 'sample' + problem;

let dirs = {
    'N': [0,1],
    "W": [-1,0],
    'S': [0,-1],
    "E": [1,0],
}
/*let rotate = {
    'L': {
        N: "W",
        W: "S",
        S: "E",
        E: "N"
    },
    'R': {
        N: "E",
        W: "N",
        S: "W",
        E: "S"
    }
}*/

function rotate(point, dir) {
    if (dir == 'L') {
        return [-point[1], point[0]];
    } else {
        return [point[1], -point[0]];
    }
}

function f() {
    let data = fs.readFileSync(file).toString();
    let lines = data.split('\r\n');

    let ship = [0,0];
    let point = [10,1];

    let dir = 'E';

    for (let i = 0; i < lines.length;i++) {
        let s = lines[i].split('');
        let letter = s.shift();
        let number = Number(s.join(''));
        console.log(letter, number);

        if (letter == 'F') {
            //pos[0] += number * dirs[dir][0];
            //pos[1] += number * dirs[dir][1];
            ship[0] += number * point[0];
            ship[1] += number * point[1];
        } else if (letter == 'L' || letter == 'R') {
            let count = number / 90;
            for (let n = 0; n < count; n++) {
                //dir = rotate[letter][dir];
                point = rotate(point, letter);
            }
        } else if (dirs[letter]) {
            point[0] += number * dirs[letter][0];
            point[1] += number * dirs[letter][1];
        }

        console.log(ship, point);
    }

    console.log(Math.abs(ship[0]) + Math.abs(ship[1]));
}

f();