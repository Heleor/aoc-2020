var fs = require('fs');

function readFile(file, callback) {
    let data = fs.readFileSync(file).toString();
    let lines = data.split('\r\n');
    for (let line of lines) {
        callback(line);
    }
}

const rqd = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid",
// "cid"
]

const valids = {
    "byr": (val) => { return val.length == 4 && Number(val) >= 1920 && Number(val) <= 2002 },
    "iyr": (val) => { return val.length == 4 && Number(val) >= 2010 && Number(val) <= 2020 },
    "eyr": (val) => { return val.length == 4 && Number(val) >= 2020 && Number(val) <= 2030 },
    
    "hgt": (val) => { 
        if (val.endsWith('cm')) {
            let num = Number(val.split('cm')[0]);
            if (num < 150 || num > 193) return false;
            return true;
        } else if (val.endsWith('in')) {
            let num = Number(val.split('in')[0]);
            if (num < 59 || num > 76) return false;
            return true;
        }
        return false;
     },
     'hcl': (val) => {
        return /^#[0-9A-F]{6}$/i.test(val.toUpperCase())
     },
     'ecl': (val) => {
        if (val == 'amb') return true;
        if (val == 'blu') return true;
        if (val == 'brn') return true;
        if (val == 'gry') return true;
        if (val == 'grn') return true;
        if (val == 'hzl') return true;
        if (val == 'oth') return true;
        return false;
     },
     pid: (val) => {
         let n = Number(val);
         if (n && val.length == 9) return true;
         return false;
     }
}

function four() {
    let all_objects = [];
    let object = {};
    readFile('./input4', (line) => {
        if (line == '') { 
            all_objects.push(object);
            //console.log(JSON.stringify(object));
            object = {};
        } else {
            let sections = line.split(' ');
            for (let i of sections) {
                let a = i.split(':')
                object[a[0]] = a[1];
            }
        }
    })
    all_objects.push(object);

    let valid = 0;
    let id = 0;
    for (let passport of all_objects) {
        let all_found = true;
        for (let key in valids) {
            if (!passport[key]) {
                all_found = false;
                break;
            }
            if (!valids[key](passport[key])) {
                all_found = false;
                break;
            }
        }

        console.log(id + ": " + all_found);

        if (all_found) valid++;
        id++;
    }

    console.log(valid);
}

four();