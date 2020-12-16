var fs = require('fs');

const problem = 16;
const prod = true;
const file = prod ? 'input' + problem : 'sample' + problem;

function f() {
    let data = fs.readFileSync(file).toString();
    let sections = data.split('\r\n\r\n');

    let rules = sections[0].split('\r\n');
    let yours = sections[1].split('\r\n')[1];
    let nearby = sections[2].split('\r\n');

    let all_rules = {};

    for (let i of rules) {
        let [name, val] = i.split(':');
        let ranges = val.split('or');
        let r1 = ranges[0].trim().split('-');
        let r2 = ranges[1].trim().split('-');

        all_rules[name] = [ [Number(r1[0]), Number(r1[1])],
            [Number(r2[0]), Number(r2[1])]];

        //console.log(name, r1[0], r1[1], r2[0],r2[1])
    }

    let rule_positions = {

    }
    for (let i in all_rules) {
        rule_positions[i] = {};
    }

    //let invalid_values = [];
    let valid_tickets = [];
    let first = true;
    let valid = 0;
    for (let t of nearby) {
        if (first) { first = false; continue; }

        let complete_valid = true;

        let col = 0;
        for (let i of t.trim().split(',')) {
            let n = Number(i);
            let valid = false;
            for (let r in all_rules) {
                if (n >= all_rules[r][0][0] && n <= all_rules[r][0][1]) {
                    valid = true;
                }
                if (n >= all_rules[r][1][0] && n <= all_rules[r][1][1]) {
                    valid = true;
                }
            }
            if (!valid) {
                //invalid_values.push(n);
                complete_valid = false;
            }
            col++;
        }

        if (complete_valid) {
            valid_tickets.push(t);
        }
    }

    let cols;
    for (let t of valid_tickets) {
        let col = 0;
        for (let i of t.trim().split(',')) {
            let n = Number(i);
            for (let r in all_rules) {
                if (n >= all_rules[r][0][0] && n <= all_rules[r][0][1]) {
                    //console.log(r, n, all_rules[r][0][0], all_rules[r][0][1], col)
                    if (!rule_positions[r][col]) rule_positions[r][col] = 0;
                    rule_positions[r][col]++;
                }
                if (n >= all_rules[r][1][0] && n <= all_rules[r][1][1]) {
                    //console.log(r, n, all_rules[r][1][0], all_rules[r][1][1], col)
                    if (!rule_positions[r][col]) rule_positions[r][col] = 0;
                    rule_positions[r][col]++;
                    //console.log(col, r, 1, true);
                }
            }
            col++;
        }
        cols = col;
    }

    console.log(rule_positions);

    let assigned_rules = {};
    let assigned_cols = {};
    let assigned_rule_count = 0;

    let t = valid_tickets.length;

    // for each column, find the rule that has only one match

    while (assigned_rule_count < rules.length) {
        for (let i = 0; i < cols; i++) {
            if (assigned_cols[i]) continue;
    
            let matches = 0;
            let last_match;
            for (let r in rule_positions) {
                if (assigned_rules[r]) continue;
                if (rule_positions[r][i] == t) {
                    matches++;
                    last_match = r;
                }
            }

            if (matches == 1) {
                console.log("Matching: ", i, last_match);
                assigned_rule_count++;
                assigned_rules[last_match] = {col: i};
                assigned_cols[i] = {match: last_match}
                delete rule_positions[last_match];
            }
        }
    }

    console.log(assigned_rules);

    let ticket = yours.split(',');

    let product = 1;
    for (let i in assigned_rules) {
        if (i.startsWith('departure')) {
            let col = assigned_rules[i].col;
            let n = Number(ticket[col])
            product *= n;
        }
    }

    console.log(product);

    /*let sum = 0;
    for (let i of invalid_values) {
        sum += i;
    }
    console.log(sum);*/
}

f();

/*
    while (assigned_rule_count < rules.length) {
        // find any column with only one possible rule and assign it
        for (let i = 0; i < cols; i++) {
            if (assigned_cols[i]) continue;
            let matches = 0;
            let last_match;
            for (let r in rule_positions) {
                if (assigned_rules[r]) continue;
                if (rule_positions[r][i] == t) {
                    matches++;
                    last_match = r;
                }
            }

            console.log(i, matches, last_match);

            if (matches == 1) {
                assigned_rule_count++;
                assigned_rules[matches] = {col: i};
                assigned_cols[i] = {match: last_match}
                console.log("Matching: ", i, last_match);
            }
        }
    }
    */