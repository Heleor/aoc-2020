var fs = require('fs');

function readFile(file, callback) {
    let data = fs.readFileSync(file).toString();
    let lines = data.split('\r\n');
    for (let line of lines) {
        callback(line);
    }
}

function one() {
    let nums = {};
    readFile('./input1', (line) => {
        nums[line] = true;
    })

    let candidates = Object.keys(nums);
    for (let i = 0; i < candidates.length; i++)
    for (let j = 0; j < candidates.length; j++) {
        let remainder = 2020 - Number(candidates[i]) - Number(candidates[j]);
        if (nums[remainder]) {
            product = candidates[i] * candidates[j] * remainder;
            console.log(product);
        }
    }
}

one();