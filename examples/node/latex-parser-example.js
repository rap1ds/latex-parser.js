var parser = require('latex-parser');
var fs = require('fs');

var parsed =
  parser.parse(fs.readFileSync('dippa.tex', 'utf8'));

console.log(JSON.stringify(parsed, null, 2));
