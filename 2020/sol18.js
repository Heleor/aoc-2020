var fs = require('fs');

const problem = 18;
const prod = true;
const file = prod ? 'input' + problem : 'sample' + problem;

function extractFirstParen(string) {
    let start = string.indexOf('(');
    if (start == -1) {
        return string;
    }
    let level = 1;
    for (let i = start+1; i < string.length; i++) {
        if (string[i] == '(') {
            level++;
        }
        if (string[i] == ')') {
            level--;
            if (level == 0) {
                let expr = string.substring(0, start);
                expr += eval(string.substring(start + 1, i));
                expr += string.substring(i + 1);
                return expr;
            }
        }
    }
}

function extractFirstAdd(string) {
    if (Number.isInteger(string)) return string;
    let start = string.indexOf('+');
    if (start == -1) return string;

    let left = eval(string.substring(0, start));
    let right = eval(string.substring(start + 1));

    //console.log("Evaluating " + string + " as " + (left + right));

    return left + right;
}

function extractFirstMultiply(string) {
    if (Number.isInteger(string)) return string;
    let start = string.indexOf('*');
    if (start == -1) return string;

    let left = eval(string.substring(0, start));
    let right = eval(string.substring(start + 1));

    //console.log("Evaluating " + string + " as " + left * right);

    return left * right;
}

function eval(s) {
    if (Number.isInteger(s)) return s;
    if (s.trim().split(' ').length == 1) {
        return Number(s);
    }

    let last = s;
    while (true) {
        let next = extractFirstParen(last);
        if (next == last) {
            break;
        }
        last = next;
    }
    
    while (true) {
        let next = extractFirstMultiply(last);
        if (next == last) break;
        last = next;
    }

    while (true) {
        let next = extractFirstAdd(last);
        if (next == last) break;
        last = next;
    }

    return eval(last);


    /*let n = Number(split.shift());
    let op;
    let expected = 'op';
    for (let term of split) {
        if (expected == 'op') {
            op = term;
            expected = 'num'
        } else {
            if (op == '+') {
                n = Number(term) + n;
            } else if (op == '*') {
                n = Number(term) * n;
            }
            expected = 'op';
        }
    }*/

    // solve all +s first
    

    console.log("Evaluating " + s + " as " + n);

    return n;
}

function test() {
    console.log(eval("1 + 2 * 3 + 4 * 5 + 6"));
    console.log(eval("1 + (2 * 3) + (4 * (5 + 6))"));
    console.log(eval("2 * 3 + (4 * 5)"));
    console.log(eval("5 + (8 * 3 + 9 + 3 * 4 * 3)"));
    console.log(eval("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"));
    console.log(eval("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"));
}

function f() {
    let data = fs.readFileSync(file).toString();
    //let sections = data.split('\r\n\r\n');
    let lines = data.split('\r\n');

    let sum = 0;
    for (let i of lines) {
        sum += eval(i);
    }

    console.log(sum);
}

//test();
f();