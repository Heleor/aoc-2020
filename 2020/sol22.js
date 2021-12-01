var fs = require('fs');

const problem = 22;

const prod = true;
const file = prod ? 'input' + problem : 'sample' + problem;

function key(p1, p2) {
    return JSON.stringify(p1,p2);
}

function f() {
    let data = fs.readFileSync(file).toString();
    //let lines = data.split('\r\n');

    let [p1, p2] = data.split('\r\n\r\n');

    let p1moves = p1.split('\r\n');
    let p2moves = p2.split('\r\n');
    p1moves.shift();
    p2moves.shift();

    let game = (p1, p2) => {
        //console.log("Playing a game");
        //console.log(p1);
        //console.log(p2);

        let found = {};
        let round = 0;
        while (p1.length > 0 && p2.length > 0) {
            round++;
            let k = key(p1, p2);
            if (found[k]) return 'p1';
            found[k] = true;

            let t1 = p1.shift();
            let t2 = p2.shift();

            //console.log(t1);
            //console.log(t2);

            let winner;
            if (p1.length >= Number(t1) && p2.length >= Number(t2)) {
                //console.log("Round " + round + " recursive");

                let c1 = [];
                for (let i = 0; i < Number(t1); i++) {
                    c1.push(p1[i]);
                }

                let c2 = [];
                for (let i = 0; i < Number(t2); i++) {
                    c2.push(p2[i]);
                }

                winner = game(c1, c2);
                //console.log("winner: " + winner);
            } else if (Number(t1) > Number(t2)) {
                winner = 'p1';
            } else {
                winner = 'p2';
            }

            if (winner == 'p1') {
                p1.push(t1);
                p1.push(t2);
            } else {
                p2.push(t2);
                p2.push(t1);
            }

            //console.log(p1.length, p2.length);
        }

        if (p1.length > 0) return 'p1';
        else return 'p2';
    }

    game(p1moves, p2moves);

    //game([9,8,5,2],[10,1,7]);

    let winner = p1moves.length > 0 ? p1moves : p2moves;
    let sum = 0;
    for (let i = 0; i < winner.length; i++) {
        let value = (i + 1) * winner[winner.length - i - 1];
        sum += value;
    }

    console.log("Sum: ", sum);
}

f()