var fs = require('fs');

const problem = 13;
const prod = true;
const file = prod ? 'input' + problem : 'sample' + problem;

function f() {
    let data = fs.readFileSync(file).toString();
    let lines = data.split('\r\n');

    //let start = lines[0];

    let remaining = lines[1].trim().split(',');

    let rules = [];

    for (let i = 0; i < remaining.length; i++) {
        let n = Number(remaining[i]);
        if (!n) continue;

        rules.push([n, i]);
    }

    /*let t = 0;
    while(true) {
        let all_rules = true;
        for (let i of rules) {

            let base = i[0];
            let off = i[1];
            let mod = t % base;
            let sum = mod + off;

            if (t == 1068781) {
                console.log(t, base, off, mod, sum % base == 0);
            }

            if (sum % base != 0) {
                all_rules = false;
                break;
            }
        }
        if (all_rules) {console.log(t); break;}
        t++;
    }*/
    for (let i of rules) {
        let base = i[0];
        let off = i[1];
        //let mod = t % base;
        //let sum = mod + off;
        //console.log("(t mod " + base + " +  "+off+") mod " + base + "= 0");
        console.log("(t + " + off + ") mod " + base + " = 0,");
    }

    /*let min, minbus;

    for (let i of remaining) {
        let n = Number(i);
        if (!n) continue;
        let c = 0;
        while (c < start) {
            c+=n;
        }
        let diff = c - start;
        console.log([start, n, c])
        if (!min || diff < min) { min = diff; minbus = n;}
    }

    console.log(min, minbus, minbus * min);*/
}

f();