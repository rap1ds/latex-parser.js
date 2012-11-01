var parser = require("./dippa");
var fs = require("fs");
var path = require("path");

var src = process.argv[2];

if(!src) {
  throw new Error("No source defined");
}

fs.readFile(path.resolve(src), 'utf8', function (err, data) {
  try {
    parser.parse(data);
  } catch (e) {
    console.log("[" + e.line + ":" + e.column + "] " + e.message);
  }
});


