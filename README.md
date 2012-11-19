# latex-parser.js

## Use:

### In node.js

Add `latex-parser` dependency to package.json

```
// package.json

  "dependencies": {
    ...

    "latex-parser": "git://github.com/rap1ds/latex-parser.js.git"
  }

```

In your code:

```javascript

var parser = require('latex-parser');
var result = parser.parse(/* LaTeX document */);

```

See `examples/node`

### In browser, with RequireJs

```javascript

var parser = require('latex-parser');
var result = parser.parse(/* LaTeX document */);

```

### In browser, without RequireJs

```javascript

var parser = window.LatexParser;
var result = parser.parse(/* LaTeX document */);

```

## Build:

```
$ npm install
$ grunt build
```

## Test:

```
$ grunt test
```
