var fs = require('fs');

const problem = 10;
const prod = true;
const file = prod ? 'input' + problem : 'sample' + problem;

function f() {
    let data = fs.readFileSync(file).toString();
    let lines = data.split('\r\n');

    let min, max;
    let all = {};
    for (let i = 0; i < lines.length; i++) {
        let n = Number(lines[i]);
        if (!max || n > max) max = n;
        if (!min || n < min) min = n;

        all[n] = true;
    }    

    let adapter = max + 3;
    all[adapter] = true;

    let memoized = {};

    let faster = (c) => {
        if (memoized[c]) return memoized[c];

        if (c == adapter) return 1;

        let paths = 0;
        if (all[c + 1]) {
            paths += faster(c + 1);
        }
        if (all[c + 2]) {
            paths += faster(c + 2);
        }
        if (all[c + 3]) {
            paths += faster(c + 3);
        }

        console.log(`${c}: ${paths}`);

        memoized[c] = paths;
        return paths;
    }

    let result = faster(0);
    console.log(result);
}

f();

/** brute force
 * 
 * 
    let dp = (source) => {
        //console.log([prev, source]);
        if (source == adapter) {
            let prev = chain[0];
            let diffs = { 1: 0, 2: 0, 3: 0 }
            for (let i = 1; i < chain.length; i++) {
                let diff = chain[i] - prev;
                diffs[diff]++;
                prev = chain[i];
            }
            diffs[source - prev]++;

            //console.log(diffs)
            //console.log(chain);
            combos++;

            if (combos % 1000000 == 0) console.log(combos);
        }

        

        if (all[source + 1]) {
            //dp([...chain, source], source, source + 1);
            dp(source + 1);
        }
        if (all[source + 2]) {
            //dp([...chain, source], source, source + 2);
            dp(source + 2);
        }
        if (all[source + 3]) {
            //dp([...chain, source], source, source + 3);
            dp(source + 3);
        }
    }

    dp(0);
 */