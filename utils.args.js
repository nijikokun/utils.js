if (typeof utils !== 'object' || !utils) 
  /**
   * @namespace Core Namespace
   */
  utils = {};

/**
 * Argument Type Correction / Shifter
 *
 * JSON methods simplified into a single function that determines what to do based on input data.
 *
 * @param {Array} args Argument array, could be `arguments` or custom array.
 * @param {Number} shift Amount to shift `args` parameter by. Defaults to zero.
 * @return Argument array, fixes invalid arguments data-type and shifts array if needed.
 * @memberOf utils
 * @author Nijiko Yonskai <nijikokun@gmail.com>
 * @year 2012
 * @license AOL <http://aol.nexua.org>
 */
utils.args = function (args, shift) {
  return Array.prototype.splice.call(args || [], shift || 0);
};