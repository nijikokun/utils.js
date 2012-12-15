if (!utils || typeof utils !== 'object') utils = {};
if (!utils.codeClean || typeof utils.codeClean !== 'object') utils.codeClean = {};

/**
 * Find Replace Regex commonly used in SublimeText to clean up other coders bad habits.
 * 
 * For usage in ST2:
 *   - Copy `find:` regex without starting and ending definitions: `//xx`
 *   - Replace `$` in `replace:` tags to `\`
 *   - Uncheck selection if you wish to do the whole file, `""` icon.
 *
 * @package utils.codeClean
 * @author Nijiko Yonskai <nijikokun@gmail.com>
 * @year 2012
 * @license AOL <http://aol.nexua.org>
 */
utils.codeClean.regex = [
  {
    filter: 'broken-statements',
    description: [
      'Find and replace broken statements.',
      'Javascript spec says that newlines after `}` and before statements is bad due to semicolon insertion.'
    ],
    find: /\}(\n|\r|\r\n)([\s]+)(else|else if|finally)\s\{/gim,
    replace: "} $3 {"
  }
];

/**
 * Takes above regex blocks, finds and replaces inefficient code / unstylish code
 * 
 * @return String
 * @package utils.codeClean
 * @author Nijiko Yonskai <nijikokun@gmail.com>
 * @year 2012
 * @license AOL <http://aol.nexua.org>
 */
utils.codeClean = function (text) {
  for (var i = 0; i < this.regex.length; i++)
    text = text.replace(this.regex[i].find, this.regex[i].replace);
  return text;
}
