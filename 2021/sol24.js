var fs = require('fs');

const DEBUG = false;
const NUMBER = 24;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

function run_program(program, input) {
  let vars = {
    w: 0,
    x: 0,
    y: 0,
    z: 0
  }

  let inputs = ("" + input).split('');

  for (let i of program) {
    let [instr, x, y] = i.split(' ');
    if (instr == 'inp') {
      vars[x] = Number(inputs.shift());
    }
    if (instr == 'add') {
      vars[x] = vars[x] + vars[y];
    }
    if (instr == 'mul') {
      vars[x] = vars[x] * vars[y];
    }
    if (instr == 'div') {
      vars[x] = Math.floor(vars[x] / vars[y]);
    }
    if (instr == 'mod') {
      vars[x] = vars[x] % vars[y];
    }
    if (instr == 'eql') {
      vars[x] = vars[x] == vars[y] ? 1 : 0;
    }
  }

  return vars.z == 0;
}

function s(n) {
  return typeof n === 'string';
}

function n(n) {
  return typeof n === 'number';
}

function compile(data) {
  let program = "function f(digits) {\n";

  program+= "let vars={x:0,y:0,z:0,w:0};\n";

  let cur_digit = 0;
  let line = 0;
  for (let i of data) {
    console.log(line++);
    let [instr, x, y] = i.split(' ');

    let second;
    if (y == 'w' || y == 'x' || y == 'y' || y == 'z') {
      second = "vars." + y;
    } else {
      second = Number(y);
    }

    if (instr == 'inp') {
      program+=`vars.${x} = d[${cur_digit++}];\n`;
    }
    if (instr == 'add') {
      if (n(second) && second == 0) {
        continue;
      }
      program+=`vars.${x} = vars.${x} + ${second}\n`;
    }
    if (instr == 'mul') {
      if (n(second) && second == 1) {
        continue;
      }
      if (n(second) && second == 0) {
        program+=`vars.${x} = 0\n`;
        continue;
      }
      program+=`vars.${x} = vars.${x} * ${second}\n`;
    }
    if (instr == 'div') {
      if (n(second) && second == 1) {
        continue;
      }
      program+=`vars.${x} = Math.floor(vars.${x} / ${second})\n`;
    }
    if (instr == 'mod') {
      program+=`vars.${x} = vars.${x} % ${second}\n`;
    }
    if (instr == 'eql') {
      program+=`vars.${x} = vars.${x} == ${second} ? 1 : 0\n`;
    }
  }

  program += "return vars.z == 0;\n}\n";
  return program;
}

function compile2(data) {

  let sections = [];

  let buffer = undefined;
  for (let i of data) {
    let [instr, x, y] = i.split(' ');
    if (instr == 'inp') {
      if (buffer) sections.push(buffer);
      buffer = [];
      buffer.push(i);
    } else {
      buffer.push(i);
    }
  }
  sections.push(buffer);

  let code = "";
  let id = 0;
  for (let i of sections) {

    let vars = {
      x: "vars.x",
      y: "vars.y",
      z: "vars.z",
      w: "digit" + ++id,
    }

    code += "// -- section " + id + "\n";
    for (let j of i) {

      let [instr, x, y] = j.split(' ');

      let second;
      if (y == 'w' || y == 'x' || y == 'y' || y == 'z') {
        second = vars[y];
      } else {
        second = Number(y);
      }

      code += "// " + j + "\n";
      if (instr == 'inp') {
        continue;
      }
      if (instr == 'add') {
        if (vars[x] == "0") {
          vars[x] = second;
          continue;
        }
        vars[x] = "(" + vars[x] + "+" + second + ")";
      }
      if (instr == 'mul') {
        if (n(second) && second == 0) {
          vars[x] = "0";
          continue;
        }
        if (n(second) && second == 1) {
          continue;
        }
        code += `vars.${x} = ${vars.x} * ${second}\n`;
      }
      if (instr == 'div') {
        if (n(second) && second == 1) {
          continue;
        }
        vars[x] = "Math.floor(" + vars[x] + "/" + second + ")";
      }
      if (instr == 'mod') {
        code += `vars.${x} = ${vars.x} % ${second}\n`;
        vars[x] = 'vars.x';
      }
      if (instr == 'eql') {
        code += `vars.${x} = (${vars.x} == ${second}) ? 1 : 0\n`;
        vars[x] = 'vars.x';
      }
    }

    code += `vars.z = ${vars.z}\n`;
    code += '\n';
  }

  return code;
}

function run2() {
  let data = readFileFlat(FILE);
  let comp = compile2(data);
  console.log(comp);
  fs.writeFileSync('./compiled24.js', comp);
}

function run() {
  let data = readFileFlat(FILE);

  let start_number = 99999999999999;
  while (!run_program(data, start_number)) {
    start_number--;

    if (start_number % 100000 == 0) {
      console.log(start_number);
    }
  }

  console.log(start_number);

  /*

  let cur_digit = 0;

  let line = 0;
  for (let i of data) {
    console.log(line++);
    let [instr, x, y] = i.split(' ');
    //console.log(instr, x, y);
    if (instr == 'inp') {
      //vars[x] = "digit" + cur_digit++;
    }
    if (instr == 'add') {
      vars[x] = "{" + vars[x] + ") + (" + vars[y] + ")";
    }
    if (instr == 'mul') {
      vars[x] = "(" + vars[x] + ") * (" + vars[y] + ")";
    }
    if (instr == 'div') {
      vars[x] = "(" + vars[x] + ") / (" + vars[y] + ")";
    }
    if (instr == 'mod') {
      vars[x] = "(" + vars[x] + ") mod (" + vars[y] + ")";
    }
    if (instr == 'eql') {
      vars[x] = "(" + vars[x] + ") == (" + vars[y] + ")";
    }
  }

  // find largest number such that z = 0

  console.log(vars);*/
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

//run();
run2();