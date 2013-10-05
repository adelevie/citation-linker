# citation-linker

Adds links to legal citations within Markdown text.

## Installation

```
$ npm install citation-linker
```

```javascript
citationLinker = require("citation-linker");

// dumb hack for multi-line string
var text = 
  [
    '- a list',
    '- of things',
    '- and stuff',
    '',
    'foo',
    'apples',
    'pursuant to 5 U.S.C. 552(a)(1)(E) and',
    'also pursuant to 47 C.F.R. Part 15',
    'and something else from: D.C. Official Code §§ 38-2602(b)(11)'
  ].join('\n');

var pagedown = require("pagedown");
var safeConverter = pagedown.getSanitizingConverter();

citationLinker.addCitationLinkerToPagedownConverter(safeConverter);

console.log(safeConverter.makeHtml(text));
```

Output:

```html
<ul>
<li>a list</li>
<li>of things</li>
<li>and stuff</li>
</ul>

<p>foo
apples
pursuant to <a href="http://www.law.cornell.edu/uscode/text/5/552">5 U.S.C. 552(a)(1)(E)</a> and
also pursuant to <a href="http://www.law.cornell.edu/cfr/text/47/15">47 C.F.R. Part 15</a>
and something else from: <a href="http://dccode.org/browser/#/38/38-2602">D.C. Official Code §§ 38-2602(b)(11)</a></p>
```