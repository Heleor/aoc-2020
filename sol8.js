var fs = require('fs');

const prod = true;
const file = prod ? 'input8' : 'sample8';

function tryProgram(array, patch) {
    //console.log("trying to patch " + patch);
    let acc = 0;
    let line = 0;

    let visited = {};

    while(line < array.length) {
        //console.log('running ' + line);
        if (visited[line]) {
            //console.log("loop detected: acc=" + acc + ' line ' + line);
            return false;
        }
        visited[line] = true;

        let cur = array[line];
        let [c,o] = cur.split(' ');

        if (line == patch && c == 'nop') {
            c = 'jmp';
            //console.log("Patching nop->jmp")
        }
        else if (line == patch && c == 'jmp') {
            c = 'nop';
            //console.log("Patching jmp->nop")
        }

        if (c == 'nop') {
            line++;
        } else if (c == 'acc') {
            acc += Number(o);
            line++;
        } else if (c == 'jmp') {
            line += Number(o);
        }
    }
    return acc;
}

function f() {
    let data = fs.readFileSync(file).toString();
    let lines = data.split('\r\n');

    for (let i = 0; i < lines.length; i++) 
    {
        let result = tryProgram(lines, i);
        if (result) {
            console.log(result);
        }
    }

    console.log("Yey");
}

f();