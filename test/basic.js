citationLinker = require('../lib/citation-linker')

var pagedown = require("pagedown");
//require("citation");
var safeConverter = pagedown.getSanitizingConverter();

citationLinker.addCitationLinkerToPagedownConverter(safeConverter);

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


console.log(safeConverter.makeHtml(text));