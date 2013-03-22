(function (exports) {
  var is = exports.is = {};

  /**
   * Object that holds prototype references
   * @memberOf utils
   */
  exports.proto = {
    Array: Array.prototype,
    Object: Object.prototype,
    String: String.prototype,
    Number: Number.prototype
  };

  /**
   * Parent method, with a sort of jQuery chain for our isType methods.
   * @param  {Object}  o Value to check
   * @return {Boolean}   Results of check on value
   */
  is = function (o) {
    var $self = {
      item: o
    };

    var callable = (function (type, parent) {
      return function () {
        return parent[type]($self.item);
      };
    });

    "class type".split(' ').forEach(function (i) {
      $self[i] = callable(i, is);
    });

    "empty null nan type array number args date function object regexp string boolean undefined finite".split(' ').forEach(
      function (i) { $self[i] = callable(i, exports); }
    );

    return $self;
  };

  /**
   * Array contain object types
   *
   * Used to generate generic `isType` methods on `utils` parent namespace
   *
   * @memberOf utils.is
   */
  is.types = 'Array Arguments Date Function Number Object RegExp String'.split(' ');

  /**
   * Array containing object type string values
   * @memberOf utils.is
   */
  is.classes = {
    Boolean: '[object Boolean]'
  };

  /**
   * Returns `Object` prototype `toString` call value
   *
   * @param {Object} o Non-specific value
   * @return {String} toString call value
   * @return Function
   * @memberOf utils.is
   * @author Nijiko Yonskai <nijikokun@gmail.com>
   * @license AOL <http://aol.nexua.org>
   * @year 2012
   */
  is.class = function (o) {
    return Object.prototype.toString.call(o);
  };

  /**
   * Returns type of object
   * @param  {Object} o Item to be checked on
   * @return {String}   Typeof o
   */
  is.type = function (o) {
    return typeof o;
  };

  /**
   * Generate and compile generic toString checks
   *
   * Checks are compiled from the `utils.is.types` list, Type strings are generated and placed
   * on `utils.is.typeStrings` object with methods generated on `utils.is[Type]`
   *
   * Example Usage
   *
   *    if(utils.isArray([])) console.log("It's an array!");
   *
   * @return Function
   * @author Nijiko Yonskai <nijikokun@gmail.com>
   * @license AOL <http://aol.nexua.org>
   * @year 2012
   */
  (function(ns, ps){
    var type, i, callable = (function (obj) {
        /**
         * Generic isType method, non-specific
         *
         * Checks `o` against `Object.prototype.toString` through calls against iterated type
         *
         * @param {Object} o Non-specific, iterated method.
         * @return Boolean
         * @memberOf utils
         * @author Nijiko Yonskai
         * @license AOL <http://aol.nexua.org>
         * @year 2012
         */
        return function (o) {
          return Object.prototype.toString.call(o) === obj;
        };
    });

    for (i = 0; i < ns.types.length; i++) {
      if (typeof ps['is' + ns.types[i]] !== 'undefined') continue;
      type = ns.types[i];
      ns.classes[type] = "[object " + type + "]";
      ps['is' + type] = callable(ns.classes[type]);
    }
  }(exports.is, exports));

  /**
   * Check to see if object is empty
   *
   * - Strings and Arrays will be checked by length
   * - Objects will be checked for properties
   *
   * @param {Object} o Non-specific checked value
   * @return Boolean
   * @memberOf utils
   * @author Nijiko Yonskai
   * @license AOL <http://aol.nexua.org>
   * @year 2012
   */
  exports.isEmpty = function (o) {
    if(exports.isArray(o) || exports.isString(o))
      return o.length === 0;

    for(var i in o)
      if(o.hasOwnProperty(i))
        return false;

    return true;
  };

  /**
   * Check to see if object is a DOM element. DOM Elements have a
   * very specific object property `nodeType` so this is checked
   *
   * @param {Object} o Non-specific checked value
   * @return Boolean
   * @memberOf utils
   * @author Nijiko Yonskai
   * @license AOL <http://aol.nexua.org>
   * @year 2012
   */
  exports.isElement = function (o) {
    return !!(o && o.nodeType == 1);
  };

  /**
   * Check to see if given value is an Object
   *
   * @param {Object} o Non-specific checked value
   * @return Boolean
   * @memberOf utils
   * @author Nijiko Yonskai
   * @license AOL <http://aol.nexua.org>
   * @year 2012
   */
  exports.isObject = function (o) {
    return o == Object(o);
  };

  /**
   * Checks to see if given value is a valid Boolean Object
   *
   * - Computes generic check against toString call
   * - Tests absolute equality
   *
   * @param {Mixed} o Non-specific checked value
   * @return Boolean
   * @memberOf utils
   * @author Nijiko Yonskai
   * @license AOL <http://aol.nexua.org>
   * @year 2012
   */
  exports.isBoolean = function (o) {
    return o === true || o === false || exports.is.type(o) == '[object Boolean]';
  };

  /**
   * Checks to see if value is NaN
   *
   * - Checks against `utils.isNumber`
   * - Validates if value is same after addition.
   *
   * @param {Mixed} o Non-specific checked value
   * @return Boolean
   * @memberOf utils
   * @author Nijiko Yonskai
   * @license AOL <http://aol.nexua.org>
   * @year 2012
   */
  exports.isNaN = function (o) {
    return exports.isNumber(o) && o != +o;
  };

  /**
   * Checks to see if value given is Finite
   *
   * - Checks against native `isFinite` and `isNaN` methods
   *
   * `isNaN` method uses native `parseFloat` for numerics
   *
   * @param {Mixed} o Non-specific checked value
   * @return Boolean
   * @memberOf utils
   * @author Nijiko Yonskai
   * @license AOL <http://aol.nexua.org>
   * @year 2012
   */
  exports.isFinite = function (o) {
    return isFinite(o) && !exports.isNaN(parseFloat(o));
  };

  /**
   * Checks whether value given is `null`
   *
   * @param {Mixed} o Non-specific checked value
   * @return Boolean
   * @memberOf utils
   * @author Nijiko Yonskai
   * @license AOL <http://aol.nexua.org>
   * @year 2012
   */
  exports.isNull = function (o) {
    return o === null;
  };

  /**
   * Checks whether given value is `undefined`
   *
   * @param {Object} o Non-specific checked value
   * @return Boolean
   * @memberOf utils
   * @author Nijiko Yonskai
   * @license AOL <http://aol.nexua.org>
   * @year 2012
   */
  exports.isUndefined = function (o) {
    return o === void 0;
  };
})(typeof(window) === 'undefined' ? module.exports : (window.utils = window.utils || {}));