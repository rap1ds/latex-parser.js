latex-parser.js
===============

Usage:

```
$ npm install -g pegjs
$ pegjs --track-line-and-column src/latex-parser.pegjs latex-parser-node.js
$ pegjs --track-line-and-column -e "window.LatexParser" src/latex-parser.pegjs latex-parser-browser.js
$ node tests/run_parser.js tests/dippa.tex
```
