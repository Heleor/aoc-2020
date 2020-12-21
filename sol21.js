var fs = require('fs');

const problem = 21;

const prod = true;
const file = prod ? 'input' + problem : 'sample' + problem;

function f() {
    let data = fs.readFileSync(file).toString();
    //let sections = data.split('\r\n\r\n');
    //let lines = data.split('\r\n');
}

f();