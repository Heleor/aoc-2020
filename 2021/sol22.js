import * as fs from 'fs';
import * as THREE from 'three';

const DEBUG = true;
const NUMBER = 22;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

function run() {
  let data = readFileFlat(FILE);

  let cubes = {};

  let set = (x, y, z, val) => {
    /*if (x < -50 || x > 50) return;
    if (y < -50 || y > 50) return;
    if (z < -50 || z > 50) return;*/

    if (val == false) {
      delete cubes[x + ',' + y + ',' + z];
    } else if (val == true) {
      cubes[x + ',' + y + ',' + z] = true;
    }
  }

  for (let i of data) {
    let [val, range] = i.split(' ');
    let [x, y, z] = range.split(',');

    x = x.split('=')[1];
    y = y.split('=')[1];
    z = z.split('=')[1];

    let [x1, x2] = x.split('..');
    let [y1, y2] = y.split('..');
    let [z1, z2] = z.split('..');

    x1 = Number(x1); x2 = Number(x2);
    y1 = Number(y1); y2 = Number(y2);
    z1 = Number(z1); z2 = Number(z2);

    //console.log(val, x1, y1, z1, x2, y2, z2);

    /*if (x1 < -50) x1 = -50;
    if (y1 < -50) y1 = -50;
    if (z1 < -50) z1 = -50;
    if (x2 > 50) x2 = 50;
    if (y2 > 50) y2 = 50;
    if (z2 > 50) z2 = 50;*/

    for (let xx = x1; xx <= x2; xx++) {
      for (let yy = y1; yy <= y2; yy++) {
        for (let zz = z1; zz <= z2; zz++) {
          set(xx, yy, zz, val == 'on');
        }
      }
    }
  }

  console.log(Object.keys(cubes).length);
}

function run2() {
  let data = readFileFlat(FILE);

  let subdivisions = {
    x: [],
    y: [],
    z: []
  }

  let sections = [];

  for (let i of data) {
    let [val, range] = i.split(' ');
    let [x, y, z] = range.split(',');

    x = x.split('=')[1];
    y = y.split('=')[1];
    z = z.split('=')[1];

    let [x1, x2] = x.split('..');
    let [y1, y2] = y.split('..');
    let [z1, z2] = z.split('..');

    x1 = Number(x1); x2 = Number(x2);
    y1 = Number(y1); y2 = Number(y2);
    z1 = Number(z1); z2 = Number(z2);

    sections.push([val, x1, x2, y1, y2, z1, z2]);

    subdivisions.x.push(x1);
    subdivisions.x.push(x2);
    subdivisions.y.push(y1);
    subdivisions.y.push(y2);
    subdivisions.z.push(z1);
    subdivisions.z.push(z2);
  }

  subdivisions.x.sort((a, b) => a - b);
  subdivisions.y.sort((a, b) => a - b);
  subdivisions.z.sort((a, b) => a - b);

  let i = 0;
  let toggles = {}; //index,index,index
  for (let [val, x1, x2, y1, y2, z1, z2] of sections) {
    let xi1 = subdivisions.x.indexOf(x1);
    let xi2 = subdivisions.x.indexOf(x2);
    let yi1 = subdivisions.y.indexOf(y1);
    let yi2 = subdivisions.y.indexOf(y2);
    let zi1 = subdivisions.z.indexOf(z1);
    let zi2 = subdivisions.z.indexOf(z2);

    for (let xi = xi1; xi <= xi2; xi++) {
      for (let yi = yi1; yi <= yi2; yi++) {
        for (let zi = zi1; zi <= zi2; zi++) {
          if (val == 'on') {
            toggles[xi + ',' + yi + ',' + zi] = true;
          } else {
            delete toggles[xi + ',' + yi + ',' + zi];
          }
        }
      }
    }

    console.log(i++);
  }

  fs.writeFileSync('./output' + NUMBER, JSON.stringify(toggles));
  console.log("Done counting.");
}

function parse_data() {
  let data = readFileFlat(FILE);

  let parsed_data = [];

  for (let i of data) {
    let [val, range] = i.split(' ');
    let [x, y, z] = range.split(',');

    x = x.split('=')[1];
    y = y.split('=')[1];
    z = z.split('=')[1];

    let [x1, x2] = x.split('..');
    let [y1, y2] = y.split('..');
    let [z1, z2] = z.split('..');

    x1 = Number(x1); x2 = Number(x2);
    y1 = Number(y1); y2 = Number(y2);
    z1 = Number(z1); z2 = Number(z2);

    parsed_data.push([val, x1, x2, y1, y2, z1, z2]);
  }
  return parsed_data;
}

function partition_cubes(new_cube,intersctions) {
  let results = [];

  let xs = [new_cube.min.x, new_cube.max.x];
  let ys = [new_cube.min.y, new_cube.max.y];
  let zs = [new_cube.min.z, new_cube.max.z];

  for (let i = 0; i < intersctions.length; i++) {
    xs.push(intersctions[i].min.x);
    xs.push(intersctions[i].max.x);
    ys.push(intersctions[i].min.y);
    ys.push(intersctions[i].max.y);
    zs.push(intersctions[i].min.z);
    zs.push(intersctions[i].max.z);
  }

  xs.sort((a, b) => a - b);
  ys.sort((a, b) => a - b);
  zs.sort((a, b) => a - b);

  for (let x = 0; x < xs.length - 1; x++) {
    for (let y = 0; y < ys.length - 1; y++) {
      for (let z = 0; z < zs.length - 1; z++) {
        let sub_cube = new THREE.Box3(new THREE.Vector3(xs[x], ys[y], zs[z]), new THREE.Vector3(xs[x+1], ys[y+1], zs[z+1]));

        let state = undefined;
        for (let i of intersctions) {
          if (i.intersectsBox(new_cube)) {
            state = i.STATE;
          }
        }
        if (sub_cube.intersectsBox(new_cube)) {
          state = new_cube.STATE;
          sub_cube.FROM = 'new';
        }
        sub_cube.STATE = state;
        results.push(sub_cube);
      }
    }
  }
  return results;
}

function volume(cube) {
  return (cube.max.x - cube.min.x) * (cube.max.y - cube.min.y) * (cube.max.z - cube.min.z);
}

function incl_volume(cube) {
  return (1 + cube.max.x - cube.min.x) * (1 + cube.max.y - cube.min.y) * (1 + cube.max.z - cube.min.z);
}

function str(cube) {
  return `x=${cube.min.x}..${cube.max.x}, y=${cube.min.y}..${cube.max.y}, z=${cube.min.z}..${cube.max.z}`;
}

function overlap(cube, old_cube) {
  return cube.min.x < old_cube.max.x && cube.max.x > old_cube.min.x &&
    cube.min.y < old_cube.max.y && cube.max.y > old_cube.min.y &&
    cube.min.z < old_cube.max.z && cube.max.z > old_cube.min.z;
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function count_partitions(new_cube,intersctions) {
  let results = 0;

  let xs = [new_cube.min.x, new_cube.max.x];
  let ys = [new_cube.min.y, new_cube.max.y];
  let zs = [new_cube.min.z, new_cube.max.z];

  for (let i = 0; i < intersctions.length; i++) {
    xs.push(intersctions[i].min.x);
    xs.push(intersctions[i].max.x);
    ys.push(intersctions[i].min.y);
    ys.push(intersctions[i].max.y);
    zs.push(intersctions[i].min.z);
    zs.push(intersctions[i].max.z);
  }

  xs = xs.filter(onlyUnique);
  ys = ys.filter(onlyUnique);
  zs = zs.filter(onlyUnique);

  xs.sort((a, b) => a - b);
  ys.sort((a, b) => a - b);
  zs.sort((a, b) => a - b);

  for (let x = 0; x < xs.length - 1; x++) {
    for (let y = 0; y < ys.length - 1; y++) {
      for (let z = 0; z < zs.length - 1; z++) {
        let sub_cube = new THREE.Box3(new THREE.Vector3(xs[x], ys[y], zs[z]), new THREE.Vector3(xs[x+1], ys[y+1], zs[z+1]));

        if (!overlap(sub_cube, new_cube)) {
          continue;
        }

        let all_overlaps = [];
        for (let i of intersctions) {
          if (overlap(sub_cube, i)) {
            all_overlaps.push(i);
          }
        }
        all_overlaps.sort( (a,b) => a.ID - b.ID );

        let state = false;
        for (let i of all_overlaps) {
          state = i.STATE;
        }

        //console.log(str(sub_cube), state, new_cube.STATE);

        if (new_cube.STATE == true) {
          if (state == true) {
            // nothing
          } else if (state == false) {
            //console.log("Lighting", str(sub_cube));
            results += volume(sub_cube);
          }
        } else {
          if (state == true) {
            //console.log("Dimming", str(sub_cube));
            results -= volume(sub_cube);
          } else if (state == false) {
            // nothing
          }
        }
      }
    }
  }
  console.log("Sum changed", results);
  return results;
}

function run4() {
  let data = parse_data();

  let cubes = [];
  
  let lit = 0;

  let id = 0;
  for (let [val, x1, x2, y1, y2, z1, z2] of data) {
    let new_cube = new THREE.Box3(new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x2, y2, z2));
    new_cube.STATE = val == 'on';
    new_cube.ID = id++;

    console.log("Runnign cube", id, "======")

    let intersections = [];

    for (let i of cubes) {
      if (i.intersectsBox(new_cube)) {
        intersections.push(i);
      }
    }

    if (intersections.length == 0) {
      if (new_cube.STATE == true) {
        lit = lit + incl_volume(new_cube);
      } else {
        lit = lit - incl_volume(new_cube);
      }
    } else {
      let result = count_partitions(new_cube, intersections);
      lit = lit + result;
    }
    console.log("after ", id, lit);

    cubes.push(new_cube);
  }

  console.log(lit);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

//run();

//run2();

//run3();

run4();