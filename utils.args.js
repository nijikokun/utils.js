(function (exports) {
  /**
   * Argument Type Correction / Shifter
   *
   * JSON methods simplified into a single function that determines what to do based on input data.
   *
   * @param {Array} args Argument array, could be `arguments` or custom array.
   * @param {Number} shift Amount to shift `args` parameter by. Defaults to zero.
   * @return Argument array, fixes invalid arguments data-type and shifts array if needed.
   */
  exports.args = function (args, shift) {
    return Array.prototype.splice.call(args || [], shift || 0);
  };
})(typeof(window) === 'undefined' ? module.exports : (window.utils = window.utils || {}));