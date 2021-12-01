var fs = require('fs');

const problem = 21;

const prod = true;
const file = prod ? 'input' + problem : 'sample' + problem;

function f() {
    let data = fs.readFileSync(file).toString();
    //let sections = data.split('\r\n\r\n');
    let lines = data.split('\r\n');

    let parsed = [];
    let all_allergens = {};
    let all_ingredients = {};
    for (let food of lines) {
        let [text, a] = food.split(' (');
        let aa = a.split(' ');
        aa.shift(); // "contains"
        let aaa = aa.join(' ').split(')')[0].split(',');

        let allergens = {};

        for (let i of aaa) {
            allergens[i.trim()] = true;
            all_allergens[i.trim()] = true;
        }

        let ingredients = {};
        for (let i of text.split(' ')) {
            let ii = i.trim();
            ingredients[ii] = true;
            if (!all_ingredients[ii]) all_ingredients[ii] = 0;
            all_ingredients[ii]++;
        }

        parsed.push([ingredients, allergens]);
    }

    // each allergen is only one ingredient

    let matches = {};

    for (let i in all_allergens) {
        // mutual set intersection
    
        let candidates;

        for (let recipe of parsed) {
            if (!recipe[1][i]) continue;

            if (!candidates) {
                candidates = {};
                for (let i in recipe[0]) {
                    candidates[i] = true;
                }
            } else {
                for (let i in candidates) {
                    if (!recipe[0][i]) {
                        delete candidates[i];
                    }
                }
            }
        }

        matches[i] = candidates;
    }

    console.log(JSON.stringify(matches));

    let matched_ingredients = {};
    let fully_matched = {};
    let term = 0;
    let max = Object.keys(all_allergens).length;
    while (term < max) {
        for (let i in all_allergens) {
            let final;
            let count = 0;
            for (let j in matches[i]) {
                if (matched_ingredients[j]) continue;
                final = j;
                count++;
            }

            //console.log(i, count, final);

            if (count == 1) {
                term++;
                fully_matched[i] = final;
                matched_ingredients[final] = true;
            }
        }
    }

    console.log(JSON.stringify(fully_matched));

    let keys = Object.keys(fully_matched).sort();
    
    for (let i = 0; i < keys.length;i++) {
        keys[i] = fully_matched[keys[i]];
    }
    console.log(keys.join(','));

    // well this was unnecessary

    /*for (let r of matches) {
        
    }*/
    /*let count = 0;
    for (let i in all_ingredients) {
        let can_match = false;
        for (let j in matches) {
            for (let k in matches[j]) {
                if (k == i) can_match = true;
            }
        }
        if (!can_match) count += all_ingredients[i];
    }
    console.log(count);*/
    

    /*for (let recipe of parsed) {
        for (let a in recipe[1]) {
            if (!candidates[a]) candidates[a] = { count: 0, set: {} };

            for (let text of recipe[0]) {
                candidates[a].count++;
                if (!candidates[a].set[text]) candidates[a].set[text] = 0;
                candidates[a].set[text]++;
            }
        }
    }*/



    //console.log(JSON.stringify(candidates));
}

f();