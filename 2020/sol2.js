var fs = require('fs');

function readFile(file, callback) {
    let data = fs.readFileSync(file).toString();
    let lines = data.split('\r\n');
    for (let line of lines) {
        callback(line);
    }
}

function two() {
    let valid = 0;
    readFile('./input2', (line) => {
        let [counts, dirty_letter, password] = line.split(' ');
        let [min,max] = counts.split('-');
        let letter = dirty_letter.split(':')[0]

        // part 1
        /*
        let letters = {};
        for (let i = 0; i < password.length; i++) {
            if (!letters[paIO cssword[i]]) letters[password[i]] = 0;
            letters[password[i]]++;
        }

        if (letters[letter] >= Number(min) && letters[letter] <= Number(max)) {
            valid++;
        }*/
        
        // part 2
        let matches = 0;
        if (password[min - 1] == letter) matches++;
        if (password[max - 1] == letter) matches++;
        if (matches == 1) valid++;
    })
    console.log("Valid: " + valid);
}

two();