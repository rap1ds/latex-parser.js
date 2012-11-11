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
    file.result = {successful: false, value: e};
  }
  return file;
}

function printSuccess(verbose) {
  return function(file) {
    console.log('File: ' + file.filename);
    console.log('Successfully parsed'.green);
    console.log();
    if(verbose) {
      console.log(JSON.stringify(file.result.value, null, 2));
    }
  }
}

function printError(file) {
  console.log('File: ' + file.filename);
  console.log('Error in line ' + file.result.line + ':' + file.result.column + ''.red);
  console.log();
  console.log(e.message);
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

readDir('docs')
  .map(readFile)
  .map(parse)
  .forEach(function(file) {
    printResult(true, file);
    printSeparator();
    printResult(false, file);
  });
