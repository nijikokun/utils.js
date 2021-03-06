(function (exports) {
  /**
   * JSON Parser / Stringifier
   *
   * JSON methods simplified into a single function that determines what to do based on input data.
   *
   * @param {Mixed} data JSON string / object to be manipulated.
   * @return Dependent on input but will return a JSON object if datas data-type is string, otherwise returns JSON object.
   */
  exports.json = function (data) {
    var args = Array.prototype.splice.call(arguments, 0); // var args = utils.args(arguments);
    return (data ? (
      typeof data === 'string' ? (
        JSON.parse.apply(this, args)
      ) : JSON.stringify.apply(this, args)
    ) : data);
  };
})(typeof(window) === 'undefined' ? module.exports : (window.utils = window.utils || {}));