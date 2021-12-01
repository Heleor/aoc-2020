var fs = require('fs');

function readFile(file, callback) {
    let data = fs.readFileSync(file).toString();
    let lines = data.split('\r\n');
    for (let line of lines) {
        callback(line);
    }
}

function bsp(char, istart, ilast, min, max, max_char = 'F') {
    for (let i = istart; i <= ilast; i++) {
        //console.log([min, max, max_char, char[i]]);
        let w = Math.round((max - min) / 2);
        if (char[i] == max_char) {
            max = max - w;
        } else {
            min = min + w;
        }
    }
    return min;
}

/**
 * 
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL
 */

function five() {
    let max = 0;
    let all = {}
    readFile('./input5', (line) => {
        let row = bsp(line, 0, 6, 0, 127, 'F');
        let col = bsp(line, 7, 9, 0, 7, 'L');

        let seatID = row * 8 + col;
        if (seatID > max) max = seatID;

        all[seatID] = true;

        console.log([row,col,seatID]);
    })
    console.log(max);

    for (let i = 0; i < 1000; i++) {
        if (all[i-1] && all[i+1] && !all[i]) {
            console.log("My seat: " + i);
        }
    }
}

five();