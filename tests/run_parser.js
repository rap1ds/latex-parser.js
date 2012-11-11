var parser = require("../latex-parser-node");
var fs = require("fs");
var path = require("path");
var colors = require('colors'); 

function readDir(dir) {
  return fs.readdirSync(path.resolve(dir))
    .map(function(filename) {
      return path.join(dir, filename);
    });
}

function readFile(filename) {
  console.log('Reading file', filename);
  return {
    filename: filename,
    data: fs.readFileSync(path.resolve(filename), 'utf8')
  };
}

function parse(file) {
  try {
    var result = parser.parse(file.data);
    file.result = {successful: true, value: result};
  } catch (e) {
    file.result = {successful: false, error: e};
  }
  return file;
}

function printSuccess(verbose) {
  return function(file) {
    console.log('File: ' + file.filename);
    console.log('Successfully parsed'.green);
    if(verbose) {
      console.log(JSON.stringify(file.result.value, null, 2));
    }
    console.log();
  }
}

function printError(file) {
  console.log('File: ' + file.filename);
  console.log(('Error in line ' + file.result.error.line + ':' + file.result.error.column + '').red);
  console.log(file.result.error.message);
  console.log();
}

function printSeparator() {
  console.log();
  console.log('==================================================');
  console.log();
}

function printResult(verbose, file) {
  var printer = file.result.successful ? printSuccess(verbose) : printError;
  printer(file);
}

var parsed = readDir('docs')
  .map(readFile)
  .map(parse)
  
parsed.forEach(function(file) {
  printResult(true, file);
});

printSeparator();

parsed.forEach(function(file) {
  printResult(false, file);
});
