if (!utils || typeof utils !== 'object') utils = {};
if (!utils.spaces || typeof utils.spaces !== 'object') utils.spaces = {};

/**
 * Counts spaces before any characters aside from space based text start.
 *
 * @param {String} data
 * @return Length of spaces before characters aside from space based characters.
 * @package utils.spaces
 * @author Nijiko Yonskai
 * @year 2012
 */
utils.spaces.countBefore = function (data) {
  return (data.replace(/[^\s](.*)/g, '')).length;
}

/**
 * Trims spaces from the beginning or end
 *
 * @param {String} data String that requires trimming.
 * @param {Boolean} skipBeginning If set, spaces at the start of the string will be ignored.
 * @param {Boolean} skipEnding If set, spaces at the end of the string will be ignored.
 * @return Trims spaces from both sides or either side depending on set parameters.
 * @package utils.spaces
 * @author Nijiko Yonskai
 * @year 2012
 */
utils.spaces.trim = function (data, skipBeginning, skipEnding) {
  if (!skipBeginning) data.replace(/^\s\s*/, '');
  if (!skipEnding) data.replace(/\s\s*$/, '');
  return data;
}