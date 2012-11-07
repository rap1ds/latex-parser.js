latex-parser.js
===============

Usage:

```
$ npm install -g pegjs
$ pegjs src/latex-parser.pegjs latex-parser-node.js
$ pegjs src/latex-parser.pegjs -e "window.LatexParser" latex-parser-browser.js
$ node tests/run_parser.js tests/dippa.tex
```
