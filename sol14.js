var fs = require('fs');

const problem = 14;
const prod = true;
const file = prod ? 'input' + problem : 'sample' + problem;

function toBin(dec) {
    let val = (dec >>> 0).toString(2);
    return val.padStart(36, "0");
}

function toDec(bin) {
    return parseInt(bin, 2);
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
    let floating_bits = [];
    let memory = {};

    for (let line of lines) {
        if (line.startsWith('mask ')) {
            mask = line.split(' ')[2].trim();
            floating_bits = [];
            for (let i = 0; i < bits; i++) {
                if (mask[i] == 'X') floating_bits.push(i);
            }
            continue;
        }

        let [mem, val] = line.split('=');
        let address = ''
        for (let i = 4; mem[i] != ']'; i++) address += mem[i];
        address = Number(address);

        let add_bin = toBin(address).split('');

        for (let i = 0; i < bits; i++) {
            if (mask[i] == '0') {
                
            } else if (mask[i] == '1') {
                add_bin[i] = '1';
            }
        }

        let max = 1 << (floating_bits.length + 1);
        for (let t = 0; t < max; t++) {
            for (let bit = 0; bit < floating_bits.length; bit++) {
                if ((t & (1 << bit))) {
                    add_bin[floating_bits[bit]] = '1';
                } else {
                    add_bin[floating_bits[bit]] = '0';
                }
            }
            let mem = toDec(add_bin.join(''));
            memory[mem] = Number(val);
        }
    }

    /*for (let line of lines) {
        if (line.startsWith('mask ')) {
            mask = line.split(' ')[2].trim();
            continue;
        }

        let [mem, val] = line.split('=');
        let address = ''
        for (let i = 4; mem[i] != ']'; i++) address += mem[i];
        address = Number(address);

        let value = Number(val);
        
        let bit = JSON.parse(JSON.stringify(toBin(value)));

        let array = bit.split('');

        for (let i = 0; i < bits; i++) {
            if (mask[i] == '0') {
                //let bit = ~(1 << i) & width; 
                //value = value & bit;
                array[i] = '0';
            } else if (mask[i] == '1') {
                //value = value | (1 << i);
                array[i] = '1';
            }
        }

        let final = array.join('');

        let result = toDec(final);

        //if (result < 0) {
          //  console.log("Negative " + val);
        //}
        console.log(mem, val);
        console.log("value:  ", toBin(value));
        console.log("mask:   ", mask);
        console.log("result: ", final);
        console.log(result);
        
        memory[mem] = result;
    }*/

    let sum = 0;
    for (let i in memory) {
        sum += memory[i];
    }

    console.log(sum);
}

f();