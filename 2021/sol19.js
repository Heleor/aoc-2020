import * as fs from 'fs';
import * as THREE from 'three';

const DEBUG = false;
const NUMBER = 19;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

let all_matrices = [];

for (let x_rot of [0,90,180,270])
for (let y_rot of [0,90,180,270])
for (let z_rot of [0,90,180,270]) {
  let euler = new THREE.Euler(deg2rad(x_rot), deg2rad(y_rot), deg2rad(z_rot), 'XYZ');
  let matrix = new THREE.Matrix4().makeRotationFromEuler(euler);
  all_matrices.push(matrix);
}

function find_bounds(id, points) {
  let x_min = points[0][0];
  let y_min = points[0][1];
  let z_min = points[0][1];
  let x_max = points[0][0];
  let y_max = points[0][1];
  let z_max = points[0][1];
  for (let [x,y,z] of points) {
    if (x < x_min) x_min = x;
    if (x > x_max) x_max = x;
    if (y < y_min) y_min = y;
    if (y > y_max) y_max = y;
    if (z < z_min) z_min = z;
    if (z > z_max) z_max = z;
  }

  return [x_min, x_max, y_min, y_max, z_min, z_max];
}

function analyze(points) {
  let distances = {};
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (i == j) continue;

      let distance = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]) + Math.abs(points[i][2] - points[j][2]);
      if (!distances[distance]) distances[distance] = [];
      distances[distance].push([i,j]);
    }
  }
  return distances;
}

// Known points
let SOLUTION = {
  known_points: {}, // 0,0,0 => true
}

function add_to_solution(points) {
  for (let [x,y,z] of points) {
    SOLUTION.known_points[ x + ',' + y + ',' + z ] = true;

    if (!SOLUTION.bounds) {
      SOLUTION.bounds = {
        x: [x,x],
        y: [y,y],
        z: [z,z],
      }
    }

    if (SOLUTION.bounds.x[0] > x) SOLUTION.bounds.x[0] = x;
    if (SOLUTION.bounds.x[1] < x) SOLUTION.bounds.x[1] = x;
    if (SOLUTION.bounds.y[0] > y) SOLUTION.bounds.y[0] = y;
    if (SOLUTION.bounds.y[1] < y) SOLUTION.bounds.y[1] = y;
    if (SOLUTION.bounds.z[0] > z) SOLUTION.bounds.z[0] = z;
    if (SOLUTION.bounds.z[1] < z) SOLUTION.bounds.z[1] = z;
  }

  SOLUTION.all_points = Object.keys(SOLUTION.known_points).map(k => k.split(',').map(Number));
}

function find_location(points) {

  console.log(SOLUTION.bounds);

  let tried = 0;
  for (let matrix of all_matrices) {

    let rotated_points = [];
    for (let i of points) {
      let new_point = new THREE.Vector3(i[0], i[1], i[2]).applyMatrix4(matrix);
      let int_point = [Math.round(new_point.x), Math.round(new_point.y), Math.round(new_point.z)];
      rotated_points.push(int_point);
    }

    for (let xt = -500; xt <= 500; xt++) {
      for (let yt = -500; yt <= 500; yt++) {
        for (let zt = -500; zt <= 500; zt++) {
          tried++;

          if (tried % 100000 == 0) {
            console.log(tried);
          }

          let find_matches = () => {
            let matched_points = 0;
            for (let i of rotated_points) {
              let int_point = [i[0] + xt, i[1] + yt, i[2] + zt];
              if (SOLUTION.known_points[int_point[0] + ',' + int_point[1] + ',' + int_point[2]]) {
                matched_points++;
              } else if (int_point[0] >= SOLUTION.bounds.x[0] && int_point[0] <= SOLUTION.bounds.x[1] &&
                  int_point[1] >= SOLUTION.bounds.y[0] && int_point[1] <= SOLUTION.bounds.y[1] &&
                  int_point[2] >= SOLUTION.bounds.z[0] && int_point[2] <= SOLUTION.bounds.z[1]) {
                return 'failure';
              }
            }
            return matched_points;
          }

          let matched_points = find_matches();
          if (matched_points == 'failure') {
            continue;
          }
          
          if (matched_points > 0) {
            console.log("at least one");
          }
          if (matched_points > 8) {
            console.log("found", xt, yt, zt, matrix);
          }
        }
      }
    }
  }
}

function rotate(i, matrix) {
  let new_point = new THREE.Vector3(i[0], i[1], i[2]).applyMatrix4(matrix);
  return [Math.round(new_point.x), Math.round(new_point.y), Math.round(new_point.z)];
}

// Finds the translation and rotation that candidate into old.
// false if it can't find one
function find_mods(old_p0, old_p1, candidate_p0, candidate_p1) {
  for (let matrix of all_matrices) {
    let new_p0 = rotate(candidate_p0, matrix);
    let new_p1 = rotate(candidate_p1, matrix);

    let xt = new_p0[0] - old_p0[0];
    let yt = new_p0[1] - old_p0[1];
    let zt = new_p0[2] - old_p0[2];

    if (old_p1[0] + xt == new_p1[0] && old_p1[1] + yt == new_p1[1] && old_p1[2] + zt == new_p1[2]) {
      return [xt, yt, zt, matrix];
    }
  }
  return false;
}

function map_transforms(scanner_1, scanner_2) {
  let distances_1 = analyze(scanner_1);
  let distances_2 = analyze(scanner_2);

  let best_mods;
  let best_match = 0;
  let best_transformed;

  let lookup_one = {}
  for (let i of scanner_1) {
    lookup_one[i[0] + ',' + i[1] + ',' + i[2]] = true;
  }

  for (let i in distances_1) {
    if (!distances_2[i]) continue;

    for (let match_1 of distances_1[i]) {
      for (let match_2 of distances_2[i]) {
        let old_p0 = scanner_1[match_1[0]];
        let old_p1 = scanner_1[match_1[1]];
        let new_p0 = scanner_2[match_2[0]];
        let new_p1 = scanner_2[match_2[1]];

        let mods = find_mods(old_p0, old_p1, new_p0, new_p1);
        if (mods) {
          // attempt the rest of the points
          let transformed_points = [];
          for (let i of scanner_2) {
            let rotated_point = rotate(i, mods[3]);
            let translated_point = [rotated_point[0] - mods[0], rotated_point[1] - mods[1], rotated_point[2] - mods[2]];
            transformed_points.push(translated_point);
          }

          let matched_points = 0;
          for (let i of transformed_points) {
            if (lookup_one[i[0] + ',' + i[1] + ',' + i[2]]) {
              matched_points++;
            }
          }
          if (matched_points >= 12) {
            best_mods = mods;
            best_match = matched_points;
            best_transformed = transformed_points;
          }
        }
      }
    }
  }

  //console.log(best_match);
  if (best_match < 12) return false;
  return [best_mods, best_transformed];
}

function run() {
  let data = readFileFlat(FILE);

  let scanners = {};
  let id = 0;
  for (let scanner of data) {
    let rows = scanner.split('\r\n');
    rows.shift();

    let points = [];
    for (let row of rows) {

      let [x, y, z] = row.split(',').map(Number);
      points.push([x,y,z]);
    }

    scanners[id++] = points;
  }

  add_to_solution(scanners[0]);
  delete scanners[0];

  let scanner_locations = {
    0: [0,0,0]
  };

  while (Object.keys(scanners).length > 1) {
    console.log(Object.keys(scanners).length);
    let deleted = undefined;
    for (let i in scanners) {
      for (let j in scanners) {
        if (i == j) continue;
        let result = map_transforms(SOLUTION.all_points, scanners[j]);
        if (result) {
          deleted = j;
          scanner_locations[j] = [result[0][0], result[0][1], result[0][2]];
          add_to_solution(result[1]);
          break;
        }
      }
    }
    
    if (deleted !== undefined) {
      delete scanners[deleted];
    }
  }

  console.log(Object.keys(SOLUTION.known_points).length);

  let max_distance = 0;
  for (let i in scanner_locations) {
    for (let j in scanner_locations) {
      let distance = Math.abs(scanner_locations[i][0] - scanner_locations[j][0]) + Math.abs(scanner_locations[i][1] - scanner_locations[j][1]) + Math.abs(scanner_locations[i][2] - scanner_locations[j][2]); 
      if (distance > max_distance) max_distance = distance;
    }
  }

  console.log(max_distance);
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n\r\n');
}

function deg2rad(deg) {
  return deg * Math.PI / 180;
}

run();