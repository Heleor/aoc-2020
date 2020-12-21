var fs = require('fs');

const problem = 20;
const prod = true;
const file = prod ? 'input' + problem : 'sample' + problem;
//const file = 'test' + problem;

//let W = 3;
let W = 10;

function col(b, c) {
    let r = [];
    for (let i = 0; i < W; i++) {
        r.push(b[i][c]);
    }
    return r;
}

const rotations = [
    {N: 'N',E: 'E',S: 'S',W: 'W'},
    {N: 'W',E: 'N',S: 'E',W: 'S'},
    {N: 'S',E: 'W',S: 'N',W: 'E'},
    {N: 'E',E: 'S',S: 'W',W: 'N'},

    {N: 'S',E: 'E',S: 'N',W: 'W'},
    {N: 'W',E: 'S',S: 'E',W: 'N'},
    {N: 'N',E: 'W',S: 'S',W: 'E'},
    {N: 'E',E: 'N',S: 'N',W: 'S'},
]

const flips = [
    { N: 'N', S: 'S', E: 'E', W: 'W' },
    { N: 'n', S: 's', E: 'E', W: 'W' },
    { N: 'n', S: 's', E: 'e', W: 'w' },
    { N: 'N', S: 'S', E: 'e', W: 'w' },
]

function rev(str) {
    return str.split('').reverse().join('');
}

function f() {
    let data = fs.readFileSync(file).toString();
    let sections = data.split('\r\n\r\n');
    //let lines = data.split('\r\n');

    let bitmaps = {};
    for (let i of sections) {
        let s = i.split('\r\n');
        let key = Number(s.shift().split(' ')[1].split(':')[0]);
        //console.log(key);
        
        let data = [];
        for (let j of s) {
            let row = [];
            for (let k = 0; k < W; k++) {
                row.push(j[k])
            }
            data.push(row);
        }

        bitmaps[key] = data;
    }

    let total = Object.keys(bitmaps).length;
    console.log("Tiles: ", total);

    let segments = {}
    for (let b in bitmaps) {
        let bb = bitmaps[b];
        let row0 = bb[0].join('');
        let row9 = bb[W-1].join('');
        let col0 = col(bb,0).join('');
        let col9 = col(bb,W-1).join('');

        segments[b] = {
            N: row0,
            S: row9,
            W: col0,
            E: col9,
            n: rev(row0),
            s: rev(row9),
            w: rev(col0),
            e: rev(col9),
        }
    }

    let edge_candidates = {};
    for (let b in segments) {
        let bb = segments[b];
        edge_candidates[bb.N] = [];
        edge_candidates[bb.S] = [];
        edge_candidates[bb.E] = [];
        edge_candidates[bb.W] = [];
        edge_candidates[bb.n] = [];
        edge_candidates[bb.s] = [];
        edge_candidates[bb.e] = [];
        edge_candidates[bb.w] = [];
    }

    for (let b in edge_candidates) {
        for (let s in segments) {
            for (let type in segments[s]) {
                if (segments[s][type] == b) edge_candidates[b].push([s, type]);
            }
        }
    }
    console.log("Precompute done");

    let start;
    for (let b in segments) {
        let unique = 0;
        let valid = {};
        for (let i in segments[b]) {
            let c = edge_candidates[segments[b][i]];
            if (c.length == 1) {
                unique++;
                valid[i] = true;
            }
        }
        if (unique == 4) {
            if (valid['S'] && valid['E']) {
                start = b;
            }
        }
    }
    
    let boardN = Math.sqrt(total);
    console.log(boardN);

    let board = [];
    for (let x = 0; x < boardN; x++) {
        board.push([]);
    }

    board[0][0] = { id: start, rotation: 0, flipX: false, flipY: false};

    let used_tiles = {};
    used_tiles[start] = true;

    for (let x = 0; x < boardN; x++) {
        for (let y = 0; y < boardN; y++) {
            if (board[x][y]) continue;

            //if (y > 0) 

        }
    }




}

f();


/**
 * //    let product = 1;
let edges = 0;
let corners = 0;
    for (let b in segments) {
        let uniques = 0;
        for (let i in segments[b]) {
            let c = edge_candidates[segments[b][i]];
            if (c.length == 1) {
                uniques++;
            }
        }
        if (uniques == 4) {
            console.log("corner: " + b);
            corners++;
            //product *= Number(b);
        } else if (uniques == 2) {
            console.log("edge: " + b);
            edges++;
        }
    }
    console.log(corners, edges);

    let boardN = Math.sqrt(total);
    console.log(boardN);

    let rules = [];

    let id = (x,y) => y * boardN + x;

    for (let x = 0; x < boardN; x++) {
        for (let y = 0; y < boardN; y++) {
            if (x > 0) {
                rules.push([id(x,y), 'E', id(x-1,y), 'W' ]);
            }
            if (y > 0) {
                rules.push([id(x,y), 'S', id(x,y-1), 'N' ]);
            }
        }
    }

    console.log("Rules: ", rules.length);

    let validate = (board, next) => {
        let next_index = board.length;
        for (let i of rules) {
            if (i[0] != next_index && i[2] != next_index) {
                continue;
            }

            let a = i[0] == next_index ? next : board[i[0]];
            let b = i[2] == next_index ? next : board[i[2]];
            if (a && b) {
                let a_rotation = rotations[a.r];
                let b_rotation = rotations[b.r];

                let a_check = flips[a.f][a_rotation[i[1]]];
                let b_check = flips[b.f][b_rotation[i[3]]];

                let aa = segments[a.id];
                let bb = segments[b.id];

                if (aa[a_check] != bb[b_check]) {
                    return false;
                }
                if (a.edge(i[1]) != b.edge(i[3])) {
                    return false;
                }
            }
        }
        return true;
    }

    // board: [{id: 0, edges: {N:}, rotation: 3}]

    /*let create_tile = (t) => {
        return new Tile(t, segments[t].N, segments[t].S, segments[t].E, segments[t].W)
    }

    let n = 0;

    let search_faster = (board, unused, solution) => {
        n++;
        if (n % 1000000 == 0) console.log("passed " + n); 

        // non-brute force: use the precomputed table...
        let last = board[board.length - 1];

        if (board.length % boardN == 0) {
            // row ended
            search(board, unused, solution);
        } else {
            // add a new column
            let edge = 
                segments
                    [last.id]
                    [flips
                        [last.f]
                        [rotations[last.r]['W']]];
            for (let c of edge_candidates[edge]) {
                if (unused[c[0]]) {
                    for (let f in flips) {
                        for (let r in rotations) {
                            let next = {id: c[0], r: r, f: f};
if (validate(board, next)) {
    let newBoard = [...board, next];
    if (newBoard.length == total) {
        solution(newBoard);
    } else {
        let copy = {};
        for (let i in unused) {
            if (i != c[0]) copy[i] = true;
        }

        search_faster(newBoard, copy, solution);
    }
}
                        }
                    }
                }
            }
        }
    }

    let search = (board, unused, solution) => {
        // brute force: for each unused tile, attempt to rotate it into place
        for (let f in flips) {
            for (let r in rotations) {
                for (let t in unused) {
                    n++;
                    if (n % 1000000 == 0) console.log("passed " + n); 

                    let next = {id: t, r: r, f: f};
                    if (validate(board, next)) {
                        let newBoard = [...board, next];
                        if (newBoard.length == total) {
                            solution(newBoard);
                        } else {
                            let copy = {};
                            for (let i in unused) {
                                if (i != t) copy[i] = true;
                            }
    
                            search_faster(newBoard, copy, solution);
                        }
                    }
                }
            }
        }
    }

    let corners = [id(0,0), id(boardN - 1, 0), id(boardN - 1, boardN - 1), id(0, boardN - 1)]

    let unused = {};
    for (let i in segments) unused[i] = true;

    search([], unused, (board) => {
        console.log("Solution found");
        console.log(board);
        let product = 1;
        for (let j of corners) {
            product *= board[j].id;
        }
        console.log(product);
        process.exit();
    })*/