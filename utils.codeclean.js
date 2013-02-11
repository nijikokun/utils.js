/**
 * Utils namespace check
 *
 * @type Object
 */
var utils = (typeof utils === 'undefined' || typeof utils !== 'object') ? {} : utils;

if (typeof utils.codeClean !== 'object' || !utils.codeClean)
  /**
   * @namespace Sub-namespace for cleaning codesource
   */
  utils.codeClean = {};

/**
 * Takes above regex blocks, finds and replaces inefficient code / unstylish code
 *
 * @return String
 * @memberOf utils
 * @author Nijiko Yonskai <nijikokun@gmail.com>
 * @license AOL <http://aol.nexua.org>
 * @year 2012
 */
utils.codeClean = function (text) {
  for (var i = 0; i < this.codeClean.regex.length; i++)
    if (typeof this.codeClean.regex[i].replace === 'function')
      text = this.codeClean.regex[i].replace(text, this.codeClean.regex[i].find);
    else text = text.replace(this.codeClean.regex[i].find, this.codeClean.regex[i].replace);
  return text;
}

/**
 * Takes above regex blocks, finds and replaces inefficient code / unstylish code
 *
 * @return String
 * @memberOf utils
 * @author Nijiko Yonskai <nijikokun@gmail.com>
 * @license AOL <http://aol.nexua.org>
 * @year 2012
 */
utils.codeClean = function (text) {
  for (var i = 0; i < this.codeClean.regex.length; i++)
    if (typeof this.codeClean.regex[i].replace === 'function')
      text = this.codeClean.regex[i].replace(text, this.codeClean.regex[i].find);
    else text = text.replace(this.codeClean.regex[i].find, this.codeClean.regex[i].replace);
  return text;
}

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
 *   - Statement blocks for optimisations such as single line statements having brackets.
 *   - Multi-line statement blocks that align for no reason with disregard to spacing.
 *   - Ternerary checks
 *
 * @memberOf utils.codeClean
 * @author Nijiko Yonskai <nijikokun@gmail.com>
 * @license AOL <http://aol.nexua.org>
 * @year 2012
 */
utils.codeClean.regex = [
  {
    filter: 'diffline-bracket',
    description: [
      'Find and replace broken function brackets.',
    ],
    find: /\)\n\s+\{/gim,
    replace: ") {"
  },

  {
    filter: 'broken-statements',
    description: [
      'Find and replace broken statements.',
      'Javascript spec says that newlines after `}` and before statements is bad due to semicolon insertion.'
    ],
    find: /\}(\n|\r|\r\n)[\s]+?(else|else if|finally)(\s\{)?/gim,
    replace: "} $2$3"
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
    filter: 'bps-statements-start',
    description: [
      'Finds and fixes badly pre-spaced statement beginnings.'
    ],
    find: /(if|for|while|switch|foreach|function)\s?\(\s/g,
    replace: "$1 ("
  },

  {
    filter: 'bps-statements-end',
    description: [
      'Finds and fixes badly pre-spaced statement endings.'
    ],
    find: /\s\)\s?\{/g,
    replace: ") {"
  },

  { // This can affect comments, arrays, methods, and more as well, beware.
    filter: 'bes-statements',
    description: [
      'Finds and fixes badly end-spaced statements.'
    ],
    find: /([^\s])\s(?!\s)(\]|\))(\n|\s|\;|\,|\.|\[)(\{)?/g,
    replace: function (text, regex) { // "[\1]"
      var replacement = "$1$2$3$4";
      var nest = function (t) {
        t = t.replace(regex, replacement);
        return (t.match(regex) !== null) ? nest(t) : t;
      }

      return nest(text);
    }
  },

  {
    filter: 'bps-functions',
    description: [
      'Function declarations of all types with incorrect spacing.'
    ],
    find: /(\(|\!|\;|\=\s)?\s?function\s?([\w\d]+\s?)?\(\s?/g,
    replace: "$1function $2("
  },

  {
    filter: 'bps-functions',
    description: [
      'Function definitions with optional names (works but should not happen).'
    ],
    find: /\s?\=\s?function\s?([\w\d]+\s?)?\(\s?/g,
    replace: " = function $1("
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
    filter: 'bps-jquery',
    description: [
      'Fixes incorrect jQuery paren statements.'
    ],
    find: /\$\s?\(\s?/g,
    replace: "$("
  },

  {
    filter: 'bps-scoped',
    description: [
      'Fixes incorrectly spaced method scopes.'
    ],
    find: /((\)|\]|\$|[\d\w]+)\.)?([\d\w\.]+)\s?\((?:\ |\t)/g,
    replace: "$1$3("
  },

  {
    filter: 'bsn-array-sel-start',
    description: [
      'Fixes array statements beginnings with optional ending traces.'
    ],
    find: /\[\s([\d\w\"\'\[\]]+)\s?\]/g,
    replace: function (text, regex) { // "[\1]"
      var replacement = "[$1]";
      var nest = function (t) {
        t = t.replace(regex, replacement);
        return (t.match(regex) !== null) ? nest(t) : t;
      }

      return nest(text);
    }
  },

  {
    filter: 'bsn-array-sel-ending',
    description: [
      'Fixes array statement endings with optional beginning traces.'
    ],
    find: /\[\s?([\d\w\"\'\[\]]+)\s\]/g,
    replace: function (text, regex) { // "[\1]"
      var replacement = "[$1]";
      var nest = function (t) {
        t = t.replace(regex, replacement);
        return (t.match(regex) !== null) ? nest(t) : t;
      }

      return nest(text);
    }
  },

  {
    filter: 'bps-ternarray',
    description: [
      'Finds and fixes incorrectly spaced terneraries or arrays beginnings for variables and returns.'
    ],
    find: /(\=|return)\s(\(|\[)\s/g,
    replace: "$1 $2"
  },

  {
    filter: 'whitespace-methods',
    description: [
      'Adds whitespace between methods that are touching brackets.'
    ],
    find: /(\}\;|\})(\n|\r\n){1}([ \t]+)(\$|if|for|while|switch|foreach|function|[\d\w]+)/g,
    replace: "$1$2$2$3$4"
  },
];
