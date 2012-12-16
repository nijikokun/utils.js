if (typeof utils !== 'object' || !utils) utils = {};
if (typeof utils.codeClean !== 'object' || !utils.codeClean) utils.codeClean = {};

/**
 * Find Replace Regex commonly used in SublimeText to clean up other coders bad habits.
 * This also fixes code for syntax highlighting, such as inner params and such.
 * Seriously. Stop coding bad. :(
 * 
 * For usage in ST2:
 *   - Copy `find:` regex without starting and ending definitions: `//xx`
 *   - Replace `$` in `replace:` tags to `\`
 *   - Uncheck selection if you wish to do the whole file, `""` icon.
 *
 * Todo in future
 *
 *   - Spacing checks
 *   - Statement blocks for optimisations such as single line statements having brackets.
 *   - Multi-line statement blocks that align for no reason with disregard to spacing.
 *   - Ternerary checks
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
    find: /\}(\n|\r|\r\n)[\s]+?(else|else if|finally)\s\{/gim,
    replace: "} $2 {"
  },
  
  {
    filter: 'bfs-statements',
    description: [
      'Finds and fixes badly full-spaced statements.'
    ],
    find: /(if|for|while|switch|foreach|function)\s?\(\s([^\{\(]+)\s\)\s?\{/g,
    replace: "$1 ($2) {"
  },

  {
    filter: 'brs-statements',
    description: [
      'Finds and fixes badly right-spaced statements.'
    ],
    find: /(if|for|while|switch|foreach|function)\s?\(\s?([^\{\(]+)\s\)\s?\{/g,
    replace: "$1 ($2) {"
  },

  {
    filter: 'bls-statements',
    description: [
      'Finds and fixes badly left-spaced statements.'
    ],
    find: /(if|for|while|switch|foreach|function)\s?\(\s([^\{\(]+)\s?\)\s?\{/g,
    replace: "$1 ($2) {"
  },

  {
    filter: 'bps-statements',
    description: [
      'Finds and fixes badly pre-spaced statements.'
    ],
    find: /(if|for|while|switch|foreach|function)\s?\(\s/g,
    replace: "$1 ("
  },

  { // This can affect comments, arrays, methods, and more as well, beware.
    filter: 'bes-statements',
    description: [
      'Finds and fixes badly end-spaced statements.'
    ],
    find: /([^\s])\s(?!\s)(\]|\))(\n|\s|\;|\,)(\{)?/g,
    replace: "$1$2$3"
    replace: function (matches, one) { // "$1$2$3"
      var regex = /([\w\d\[\]\(\)])\s(?!\s)(\]|\))(\n|\s|\;|\,)(\{)?/g;

      var nest = function (text) { 
        text = text.replace(regex, "$1$2$3$4");
        return (text.match(regex).length > 0) nest(text) : text;
      }

      return text(one);
    }
  },

  {
    filter: 'bps-functions',
    description: [
      'Finds and fixes incorrectly spaced function beginnings.'
    ],
    find: /function\s?([\w\d]+)\s?\(\s?/g,
    replace: "function $1 ("
  },

  {
    filter: 'bps-instances',
    description: [
      'Finds and fixes incorrectly spaced instances beginnings.'
    ],
    find: /new\s([\d\w]+)\s?\(\s?/g,
    replace: "new $1 ("
  },

  {
    filter: 'bps-scoped',
    description: [
      'Finds and fixes incorrectly spaced scoped methods beginnings.'
    ],
    find: /([\d\w]+)\.([\d\w\.]+)\s?\(\s/g,
    replace: "$1.$2("
  },

  {
    filter: 'bsn-array-sel',
    description: [
      'Finds one and fixes incorrectly spaced array selectors'
    ],
    find: /\[\s([\d\w\"\'\[\]]+)\s\]/g,
    replace: function (matches, one) { // "[\1]"
      var regex = /\[\s([\d\w\"\'\[\]]+)\s\]/g;

      var nest = function (text) { 
        text = text.replace(regex, "[$1]");
        return (text.match(regex).length > 0) nest(text) : text;
      }

      return text(one);
    }
  },

  {
    filter: 'bps-ternarray',
    description: [
      'Finds and fixes incorrectly spaced terneraries or arrays beginnings for variables and returns.'
    ],
    find: /(\=|return)\s(\(|\[)\s/g,
    replace: "$1 $2"
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
