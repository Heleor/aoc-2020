var fs = require('fs');

const problem = 14;
const prod = true;
const file = prod ? 'input' + problem : 'sample' + problem;

function toBin(dec) {
    let val = (dec >>> 0).toString(2);
    return str.padStart(36, "0");
}

function f() {
    let data = fs.readFileSync(file).toString();
    let lines = data.split('\r\n');

    const bits = 36;

    let width = 0;
    for (let i = 0; i < bits; i++) {
        width = width | (1 << i);
    }

    let mask;
    let memory = {};
    for (let line of lines) {
        if (line.startsWith('mask ')) {
            mask = line.split(' ')[2].trim();
            continue;
        }

        let [mem, val] = line.split('=');
        //let address = ''
        //for (let i = 4; mem[i] != ']'; i++) address += mem[i];
        //address = Number(address);

        let value = Number(val);

        for (let i = 0; i < bits; i++) {
            let index = bits - i - 1;
            if (mask[index] == '0') {
                let bit = ~(1 << i) & width; 
                value = value & bit;
            } else if (mask[index] == '1') {
                value = value | (1 << i);
            }

            if (value < 0) {
                console.log(mem, val, value);
                console.log(dec2bin(width));
                console.log(dec2bin(mask));
            }
        }
        
        memory[mem] = value;
    }

    let sum = 0;
    for (let i in memory) {
        sum += memory[i];
    }

    console.log(sum);
}

f();