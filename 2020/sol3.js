var fs = require('fs');

function readFile(file, callback) {
    let data = fs.readFileSync(file).toString();
    let lines = data.split('\r\n');
    for (let line of lines) {
        callback(line);
    }
}

function three() {
    let matrix = [];
    let id = 0;
    let width;
    readFile('./input3', (line) => {
        width = line.length;
        matrix[id] = [];
        for (let i = 0; i < line.length; i++) {
            matrix[id][i] = line[i];
        }
        id++;
    })


    let vals = [
        { x: 1, y: 1},
        { x: 3, y: 1},
        { x: 5, y: 1},
        { x: 7, y: 1},
        { x: 1, y: 2},
    ]

    let starts = [[0,0],[0,0],[0,0],[0,0],[0,0]];

    let counts = [0,0,0,0,0];
    let b = false;
    for (let row = 0; row < matrix.length; row++) {
        for (let i = 0; i < 5; i++) {
            let v = vals[i];
            let x = v.x, y = v.y;
            starts[i][0] += x;
            starts[i][1] += y;

            let xx = starts[i][0] % width;
            let yy = starts[i][1];
            if (!matrix[yy]) {
                break;
            }

            let val = matrix[yy][xx];
            if (val == '#') counts[i]++;
        }
    }

    console.log(counts);
    console.log(counts[0] * counts[1] * counts[2] * counts[3] * counts[4])
}

three();