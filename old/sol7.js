var fs = require('fs');

function f() {
    let data = fs.readFileSync('input7').toString();
    let lines = data.split('\r\n');

    let rules = {};
    for (let line of lines) {
        let [a,b] = line.split('contain');
        let base = a.split(' bags')[0];
        
        if (b.indexOf('no other') >= 0) {
            rules[base] = false;
        } else {
            let contains = b.split(',');
            for (let child of contains) {
                let words = child.trim().split(' ');
                let number = Number(words[0]);
                let type = words[1] + ' ' + words[2];
                if (!rules[base]) rules[base] = {};
                rules[base][type] = number;
            }
        }
    }

    // how many can hold 'shiny gold'?
    /*let target = 'shiny gold';
    let sum = 0;
    for (let color in rules) {
        if (color == target) continue;
        let stack = [color];
        let found = false;
        while (stack.length > 0) {
            let c = stack.pop();
            if (c == target) { found = true; break; }
            
            for (let key in rules[c]) {
                stack.push(key);
            }
        }

        if (found) {
            console.log(color + " can contain?");
            sum++;
        }
    }

    console.log(sum);*/
    let compute = 0;
    let target = 'shiny gold';
    let stack = [[target, 1]];
    while (stack.length > 0) {
        let [color, num] = stack.pop();
        compute += num;
        for (let key in rules[color]) {
            stack.push([key, num * rules[color][key]]);
        }
    }
    console.log(compute - 1);
}

f();