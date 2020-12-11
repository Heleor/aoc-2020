var fs = require('fs');

const problem = 11;
const prod = false;
const file = prod ? 'input' + problem : 'sample' + problem;

function f() {
    let data = fs.readFileSync(file).toString();
    let lines = data.split('\r\n');

    console.log(result);
}

f();