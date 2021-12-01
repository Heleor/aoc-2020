var fs = require('fs');

const problem = 17;
const prod = true;
const file = prod ? 'input' + problem : 'sample' + problem;

function neighbors(x,y,z,w) {
    let n = [];
    for (let xx = -1; xx < 2; xx++)
    for (let yy = -1; yy < 2; yy++)
    for (let zz = -1; zz < 2; zz++)
    for (let ww = -1; ww < 2; ww++) {
        if (xx != 0 || yy != 0 || zz != 0 || ww != 0) {
            n.push([x + xx, y + yy, z + zz, w + ww]);
        }
    }
    return n;
}

function key(x,y,z,w) {
    return x +',' + y +',' + z + ',' + w;
}

function print(old) {
    //console.log(JSON.stringify(old));
    for (let z = old.minZ; z <= old.maxZ; z++) {
        console.log('z='+ z);
        for (let x = old.minX; x <= old.maxX ; x++) {
            let row = '';
            for (let y = old.minY; y <= old.maxY ; y++) {
                if (old.map.has(key(x,y,z))) {
                    row = row + '#';
                } else {
                    row = row + '.';
                }
            }
            console.log(row);
        }
    }
}

function setTrue(step, x,y,z,w) {
    step.count++;
    step.map.set(key(x,y,z,w), true);
    if (step.minX > x) step.minX = x;
    if (step.maxX < x) step.maxX = x;
    if (step.minY > y) step.minY = y;
    if (step.maxY < y) step.maxY = y;
    if (step.minZ > z) step.minZ = z;
    if (step.maxZ < z) step.maxZ = z;
    if (step.minW > w) step.minW = w;
    if (step.maxW < w) step.maxW = w;
}

function f() {
    let data = fs.readFileSync(file).toString();
    //let sections = data.split('\r\n\r\n');
    let lines = data.split('\r\n');

    let square = [];

    let step = { map: new Map(), count: 0, 
        minX: 10000, maxX: -100000,
        minY: 10000, maxY: -100000,
        minZ: 10000, maxZ: -100000,
        minW: 10000, maxW: -100000,
    };
    for (let x = 0; x < lines.length; x++) {
        let l = lines[x];
        for (let y = 0; y < l.length; y++) {
            if (l[y] == '#') setTrue(step, x, y, 0, 0);
        }
    }

    //print(step);

    performStep = (old) => {
        console.log("Performing step: " + JSON.stringify(step));
        let next = { map: new Map(), count: 0,
            minX: 10000, maxX: -100000,
            minY: 10000, maxY: -100000,
            minZ: 10000, maxZ: -100000,
            minW: 10000, maxW: -100000,
         };
        for (let x = old.minX - 1; x <= old.maxX + 1; x++) {
            for (let y = old.minY - 1; y <= old.maxY + 1; y++) {
                for (let z = old.minZ - 1; z <= old.maxZ + 1; z++) {
                    for (let w = old.minW - 1; w <= old.maxW + 1; w++) {
                    let n = neighbors(x,y,z,w);
                    let count = 0;
                    for (let N of n) {
                        if (old.map.has(key(...N))) {
                            count++;
                        }
                    }
                    if (old.map.has(key(x,y,z,w))) {
                        if (count >= 2 && count <= 3)
                            setTrue(next, x,y,z,w);
                    } else {
                        if (count == 3) 
                            setTrue(next, x,y,z,w);
                    }
                }
            }
            }
        }
        return next;
    }

    let cur = step;
    for (let n = 0; n < 6; n++) {
        cur =  performStep(cur);
    }

    console.log(cur.count);
}

f();