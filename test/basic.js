citationLinker = require('../lib/citation-linker')

var pagedown = require("pagedown");
var safeConverter = pagedown.getSanitizingConverter();

citationLinker.addCitationLinkerToPagedownConverter(safeConverter);

var text = 
  [
    "- A simple",
    "- markdown",
    "- list of things",
    "",
    "### Example from US Code:",
    "pursuant to 5 U.S.C. 552(a)(1)(E) and",
    "### Example from CFR:",
    "also pursuant to 47 C.F.R. Part 15",
    "### Example from DC Code:",
    "and something else from: D.C. Official Code §§ 38-2602(b)(11)",
    "### Excerpt from *In re Application of U.S. for an Order Pursuant to 18 U.S.C. § 2705*",
    "The United States argues, however, that the explicit command of Rule 6(e)(2) is trumped by 18 U.S.C. § 2705(b). The Court does not agree. Certainly section 2705 does not contain an explicit overruling of Rule 6(e)(2); it does not mention the rule at all. In the Court's view, the statute cannot properly be read as authorizing the Court to enjoin a provider from revealing that it has received a grand jury subpoena. Section 2705 is entitled “Delayed Notice,” and by its terms addresses only disclosures made under section 2703(b), which concern applications to obtain the contents of electronic communications, not applications for subscriber information under section 2703(c)."
  ].join('\n');



console.log(safeConverter.makeHtml(text));

console.log("----------");

var text = 
  [
    "The United States argues, however, that the explicit command of Rule 6(e)(2) is trumped by 18 U.S.C. § 2705(b). The Court does not agree. Certainly section 2705 does not contain an explicit overruling of Rule 6(e)(2); it does not mention the rule at all. In the Court's view, the statute cannot properly be read as authorizing the Court to enjoin a provider from revealing that it has received a grand jury subpoena. Section 2705 is entitled “Delayed Notice,” and by its terms addresses only disclosures made under section 2703(b), which concern applications to obtain the contents of electronic communications, not applications for subscriber information under section 2703(c)."
  ].join('\n');

var output = citationLinker.addCitationLinks(text);

console.log(output);