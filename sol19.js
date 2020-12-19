const { match } = require('assert');
var fs = require('fs');

const problem = 19;
const prod = true;
const file = prod ? 'input' + problem : 'sample' + problem;

function f() {
    let data = fs.readFileSync(file).toString();
    let sections = data.split('\r\n\r\n');

    let irules = sections[0].split('\r\n');
    let iinputs = sections[1].split('\r\n');

    let rules = {};
    for (let i of irules) {
        let [id, r] = i.split(':');
        let rr = r.trim();
        if (rr[0] == '"') {
            rules[id] = { type: 'char', char: rr[1] };
        } else if (rr.indexOf('|') >= 0) {
            let [a,b] = rr.split('|');

            rules[id] = { type: 'or', branches: [
                a.trim().split(' '),
                b.trim().split(' ')] };
        } else {
            rules[id] = { type: 'compose', rule: rr.split(' ')};
        }
    }

    /*let memo = {};

    let memoized_match = (string,rule_id) => {
        let res = memo[string + rule_id];
        if (res) return res;

        let val = match(string,rule_id);

        if (rule_id == '8') {
            console.log(string, rule_id, JSON.stringify(val));
        }

        memo[string + rule_id] = val;
        return val;
    }

    let match = (string, rule_id) => {
        let r = rules[rule_id];
        if (!r) console.log("Invalid rule: " + rule_id);

        if (rule_id == '8') {
            let res = memoized_match(string, '42');

            let options = [];

            if (res.match) options.push(res);

            if (res.match && res.remainder != '') {
                let current = res.remainder;

                while (true) {
                    let res2 = memoized_match(current, '8');
                    if (res2.match) {
                        options.push({match: true, remainder: res2.remainder})
                        current = res2.remainder;
                    } else {
                        break;
                    }
                }
            }

            if (options.length > 0) {
                let remainders = [];
                for (let r of options) {
                    remainders.push(r.remainder);
                }
                return {match: true, remainders: remainders};                
            } else {
                return {match: false};
            }

            //if (res.match && res.remainder == '') return res.match;

        } else if (rule_id == '11') {
            let res =  memoized_match(string, '42');
            if (!res.match) return [res];

            let resA = memoized_match(res.remainder, '11');
            if (resA.match) {
                matchA = memoized_match(resA.remainder, '31');
                if (matchA.match) return [matchA];
            }

            let res2 = memoized_match(res.remainder, '31');
            return res2;
        }

        if (r.type == 'char') {
            if (string[0] == r.char) {
                //console.log("TRUE: Matching " + string + " to " + JSON.stringify(r));
                return { match: true, remainder: string.substring(1)};
            } else {
                //console.log("FALSE: Matching " + string + " to " + JSON.stringify(r));
                return { match: false};
            }
        } else if (r.type == 'compose') {
            let remainder = string;
            for (let i of r.rule) {
                let res = memoized_match(remainder, i);
                if (res.match) {
                    remainder = res.remainder;
                } else {
                    //console.log("FALSE: Matching " + string + " to " + JSON.stringify(r));
                    return { match: false};
                }
            }
            //console.log("TRUE: Matching " + string + " to " + JSON.stringify(r));
            return {match:true, remainder: remainder};
        } else if (r.type =='or') {
            // branch a

            let matchA = true;
            let remainderA = string;
            for (let i of r.branches[0]) {
                let res = memoized_match(remainderA, i);
                if (res.match) {
                    remainderA = res.remainder;
                } else {
                    matchA = false;
                }
            }

            let matchB = true;
            let remainderB = string;
            for (let i of r.branches[1]) {
                let res = memoized_match(remainderB, i);
                if (res.match) {
                    remainderB = res.remainder;
                } else {
                    matchB = false;
                }
            }
            
            if (matchA && matchB) {
                console.log("FORK :(");
                return {match:true, remainder: remainderA};
            } else if (matchA) {
                return {match:true, remainder: remainderA};
            } else if (matchB) {
                return {match:true, remainder: remainderB};
            } else {
                return {match:false}
            }
        }

        return { match: false, remainder: '' };
    }*/

    let memos = {};
    let memo = (val) => {
        if (memos[val]) return memos[val];
        let r = to_regex(val);
        memos[val] = r;
        return r;
    }

    let to_regex = (rule) => {
        let r = rules[rule];

        if (rule == '8') {
            return '(' + memo('42') + ')+';
        } else if (rule == '11') {

            let options = [];

            let left = memo('42');
            let right = memo('31');

            for (let i = 1; i < 8; i++) {
                let opt = '';
                for (let j = 1; j <= i; j++) {
                    opt = left + opt + right;
                }
                options.push(opt);
            }

            return '(' + options.join('|') + ")";
        }

        if (r.type == 'char') {
            return r.char;
        } else if (r.type == 'compose') {
            let val = '';
            for (let i of r.rule) {
                val += memo(i);
            }
            return val;
        } else if (r.type == 'or') {
            let options = [];
            for (let i of r.branches) {
                let val = '';
                for (let j of i) {
                    val += memo(j);
                }   
                options.push(val);
            }
            return '(' + options.join('|') + ')';
        }
    }

    let REG_TEXT = '^' + memo(0) + '$';
    let r = new RegExp(REG_TEXT);

    let count = 0;
    for (let i of iinputs) {
        if (i.match(r)) {
            count++;
        }
    }
    console.log(count);
}

f();
