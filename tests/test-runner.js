var parser = require("../lib/latex-parser.min");
var fs = require("fs");
var path = require("path");
var colors = require('colors'); 

console.log(parser);

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
  var start = Date.now();
  try {
    var result = parser.parse(file.data);
    file.result = {successful: true, value: result};
  } catch (e) {
    file.result = {successful: false, error: e};
  }
  file.result.time = Date.now() - start;
  return file;
}

function printFileAndTime(file) {
  console.log('File: ' + file.filename + ' (' + file.result.time + 'ms)');
}

function printSuccess(verbose) {
  return function(file) {
   printFileAndTime(file);
   console.log('Successfully parsed'.green);
    if(verbose) {
      console.log(JSON.stringify(file.result.value, null, 2));
    }
    console.log();
  }
}

function printError(file) {
  printFileAndTime(file);
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

module.exports = {
  run: function(testDocPath) {
    var parsed = readDir(testDocPath)
      .map(readFile)
      .map(parse)

    parsed.forEach(function(file) {
      printResult(true, file);
    });

    printSeparator();

    parsed.forEach(function(file) {
      printResult(false, file);
    });
  }
};
