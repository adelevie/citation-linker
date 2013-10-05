var pagedown = require("pagedown");
require("citation");
var converter = new pagedown.Converter();
var safeConverter = pagedown.getSanitizingConverter();

/*  supported types. from: https://github.com/unitedstates/citation/blob/master/citation.js#L220-L229

    Citation.types.usc = require("./citations/usc");
    Citation.types.law = require("./citations/law");
    Citation.types.cfr = require("./citations/cfr");
    Citation.types.va_code = require("./citations/va_code");
    Citation.types.dc_code = require("./citations/dc_code");
    Citation.types.dc_register = require("./citations/dc_register");
    Citation.types.dc_law = require("./citations/dc_law");
    Citation.types.stat = require("./citations/stat");

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

function makeUrl(citation) {
  if (citation.type === "usc") { return makeUsCodeUrl(citation); }
  if (citation.type === "cfr") { return makeCfrUrl(citation); }

  return citation.match;
}

safeConverter.hooks.chain("preConversion", function (text) {

  var citations = Citation.find(text).citations;

  if (citations.length === 0) {
    console.log("no citations found");
  } else {
    console.log("found a cite!");
  }

  var newText = ""
  for (var i=0,len=citations.length; i<len; i++) { 
    console.log("replacing...");
    var match = citations[i].match;
    text = text.replace(match, "[" + match + "]" + "(" + makeUrl(citations[i]) + ")");
    //console.log(bar);
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
    'also pursuant to 47 C.F.R. Part 15'
  ].join('\n');


console.log(safeConverter.makeHtml(text));

