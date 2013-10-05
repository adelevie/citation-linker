var pagedown = require("pagedown");
require("citation");
var converter = new pagedown.Converter();
var safeConverter = pagedown.getSanitizingConverter();

/*  supported types. from: https://github.com/unitedstates/citation/blob/master/citation.js#L220-L229

    Citation.types.usc = require("./citations/usc");                  // yes
    Citation.types.law = require("./citations/law");                  // todo
    Citation.types.cfr = require("./citations/cfr");                  // yes
    Citation.types.va_code = require("./citations/va_code");          // todo
    Citation.types.dc_code = require("./citations/dc_code");          // yes
    Citation.types.dc_register = require("./citations/dc_register");  // todo
    Citation.types.dc_law = require("./citations/dc_law");            // todo
    Citation.types.stat = require("./citations/stat");                // todo

*/

function makeUsCodeUrl(citation) {
  var usc = citation.usc;
  var title = usc.title;
  var section = usc.section;
  return "http://www.law.cornell.edu/uscode/text/" + title + "/" + section;
}

function makeCfrUrl(citation) {
  var cfr = citation.cfr;
  var title = cfr.title;
  var section = cfr.part;
  return "http://www.law.cornell.edu/cfr/text/" + title + "/" + section;
}

function makeDcCodeUrl(citation) {
  var dc_code = citation.dc_code;
  var title = dc_code.title;
  var section = dc_code.section;
  return "http://dccode.org/browser/#/" + title + "/" + title + "-" + section;
}

function makeUrl(citation) {
  if (citation.type === "usc") { return makeUsCodeUrl(citation); }
  if (citation.type === "cfr") { return makeCfrUrl(citation); }
  if (citation.type === "dc_code") { return makeDcCodeUrl(citation); }

  // if no match, silently default to the plain text
  return citation.match;
}

safeConverter.hooks.chain("preConversion", function (text) {
  var citations = Citation.find(text).citations;

  // exit if no citations are found
  if (citations.length === 0) {
    return text;
  }

  // loop through citations, match text, and replace with markdown links
  for (var i=0,len=citations.length; i<len; i++) { 
    var match = citations[i].match;
    text = text.replace(match, "[" + match + "]" + "(" + makeUrl(citations[i]) + ")");
  }

  return text;
});

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

