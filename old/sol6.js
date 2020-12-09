var fs = require('fs');

function six() {
    let data = fs.readFileSync('input6').toString();
    let lines = data.split('\r\n\r\n');

    let sum = 0;
    for (let group of lines) {
        let questions = {};
        let people = group.split('\r\n');
        for (let person of people) {
            for (let i = 0; i < person.length; i++) {
                if (!questions[person[i]]) questions[person[i]] = 0;
                questions[person[i]]++;
            }
        }

        for (let i in questions) {
            if (questions[i] == people.length) {
                sum ++;
            }
        }
    }

    console.log(sum);
}

six();