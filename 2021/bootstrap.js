var fs = require('fs');

const args = process.argv.slice(2);

let number = Number(args[0]);
if (fs.existsSync(`./sol${number}.js`)) {
  throw "Already exists.";
}

let code = fs.readFileSync('./template.js').toString();
code = code.replace('$NUMBER', "" + number);
fs.writeFileSync(`./sol${number}.js`, code);

fs.writeFileSync(`./input${number}`, '');
fs.writeFileSync(`./sample${number}`, '');