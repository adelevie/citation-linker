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

var pagedown = require("pagedown");
var safeConverter = pagedown.getSanitizingConverter();

citationLinker.addCitationLinkerToPagedownConverter(safeConverter);

console.log(safeConverter.makeHtml(text));
```

Output:

```html
<ul>
<li>A simple</li>
<li>markdown</li>
<li>list of things</li>
</ul>

<h3>Example from US Code:</h3>

<p>pursuant to <a href="http://www.law.cornell.edu/uscode/text/5/552">5 U.S.C. 552(a)(1)(E)</a> and</p>

<h3>Example from CFR:</h3>

<p>also pursuant to <a href="http://www.law.cornell.edu/cfr/text/47/15">47 C.F.R. Part 15</a></p>

<h3>Example from DC Code:</h3>

<p>and something else from: <a href="http://dccode.org/browser/#/38/38-2602">D.C. Official Code §§ 38-2602(b)(11)</a></p>

<h3>Excerpt from <em>In re Application of U.S. for an Order Pursuant to <a href="http://www.law.cornell.edu/uscode/text/18/2705">18 U.S.C. § 2705</a></em></h3>

<p>The United States argues, however, that the explicit command of Rule 6(e)(2) is trumped by <a href="http://www.law.cornell.edu/uscode/text/18/2705">18 U.S.C. § 2705(b)</a>. The Court does not agree. Certainly section 2705 does not contain an explicit overruling of Rule 6(e)(2); it does not mention the rule at all. In the Court's view, the statute cannot properly be read as authorizing the Court to enjoin a provider from revealing that it has received a grand jury subpoena. Section 2705 is entitled “Delayed Notice,” and by its terms addresses only disclosures made under section 2703(b), which concern applications to obtain the contents of electronic communications, not applications for subscriber information under section 2703(c).</p>
```

And here's the same output nicely formatted:

<hr />

<ul>
<li>A simple</li>
<li>markdown</li>
<li>list of things</li>
</ul>

<h3>Example from US Code:</h3>

<p>pursuant to <a href="http://www.law.cornell.edu/uscode/text/5/552">5 U.S.C. 552(a)(1)(E)</a> and</p>

<h3>Example from CFR:</h3>

<p>also pursuant to <a href="http://www.law.cornell.edu/cfr/text/47/15">47 C.F.R. Part 15</a></p>

<h3>Example from DC Code:</h3>

<p>and something else from: <a href="http://dccode.org/browser/#/38/38-2602">D.C. Official Code §§ 38-2602(b)(11)</a></p>

<h3>Excerpt from <em>In re Application of U.S. for an Order Pursuant to <a href="http://www.law.cornell.edu/uscode/text/18/2705">18 U.S.C. § 2705</a></em></h3>

<p>The United States argues, however, that the explicit command of Rule 6(e)(2) is trumped by <a href="http://www.law.cornell.edu/uscode/text/18/2705">18 U.S.C. § 2705(b)</a>. The Court does not agree. Certainly section 2705 does not contain an explicit overruling of Rule 6(e)(2); it does not mention the rule at all. In the Court's view, the statute cannot properly be read as authorizing the Court to enjoin a provider from revealing that it has received a grand jury subpoena. Section 2705 is entitled “Delayed Notice,” and by its terms addresses only disclosures made under section 2703(b), which concern applications to obtain the contents of electronic communications, not applications for subscriber information under section 2703(c).</p>

<hr />

### Running separetely from Pagedown

```javascript
citationLinker = require("citation-linker");

var text = 
  [
    "The United States argues, however, that the explicit command of Rule 6(e)(2) is trumped by 18 U.S.C. § 2705(b). The Court does not agree. Certainly section 2705 does not contain an explicit overruling of Rule 6(e)(2); it does not mention the rule at all. In the Court's view, the statute cannot properly be read as authorizing the Court to enjoin a provider from revealing that it has received a grand jury subpoena. Section 2705 is entitled “Delayed Notice,” and by its terms addresses only disclosures made under section 2703(b), which concern applications to obtain the contents of electronic communications, not applications for subscriber information under section 2703(c)."
  ].join('\n');

var output = citationLinker.addCitationLinks(text);

console.log(output);
```

Output:

```markdown
The United States argues, however, that the explicit command of Rule 6(e)(2) is trumped by [18 U.S.C. § 2705(b)](http://www.law.cornell.edu/uscode/text/18/2705). The Court does not agree. Certainly section 2705 does not contain an explicit overruling of Rule 6(e)(2); it does not mention the rule at all. In the Court's view, the statute cannot properly be read as authorizing the Court to enjoin a provider from revealing that it has received a grand jury subpoena. Section 2705 is entitled “Delayed Notice,” and by its terms addresses only disclosures made under section 2703(b), which concern applications to obtain the contents of electronic communications, not applications for subscriber information under section 2703(c).
```

Nicely formatted:

<hr />

The United States argues, however, that the explicit command of Rule 6(e)(2) is trumped by [18 U.S.C. § 2705(b)](http://www.law.cornell.edu/uscode/text/18/2705). The Court does not agree. Certainly section 2705 does not contain an explicit overruling of Rule 6(e)(2); it does not mention the rule at all. In the Court's view, the statute cannot properly be read as authorizing the Court to enjoin a provider from revealing that it has received a grand jury subpoena. Section 2705 is entitled “Delayed Notice,” and by its terms addresses only disclosures made under section 2703(b), which concern applications to obtain the contents of electronic communications, not applications for subscriber information under section 2703(c).
