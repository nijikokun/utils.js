if (typeof utils !== 'object' || !utils) 
  /**
   * @namespace Core Namespace
   */
  utils = {};

if (typeof utils.is !== 'object' || !utils.is) 
  /**
   * @namespace Sub-namespace for Type Checking
   */
  utils.is = {};

/**
 * Object that holds prototype references
 * @memberOf utils
 */
utils.proto = {
  Array: Array.prototype,
  Object: Object.prototype,
  String: String.prototype,
  Number: Number.prototype
};

/**
 * Array contain object types
 * 
 * Used to generate generic `isType` methods on `utils` parent namespace
 * 
 * @memberOf utils.is
 */
utils.is.types = 'Array Arguments Date Function Number Object RegExp String'.split(' ');

/**
 * Array containing object type string values
 * @memberOf utils.is
 */
utils.is.typeStrings = {
  Boolean: '[object Boolean]'
};

/**
 * Returns `Object` prototype `toString` call value
 * 
 * @param {Mixed} o Non-specific value
 * @return {String} toString call value
 * @return Function
 * @memberOf utils.is
 * @author Nijiko Yonskai <nijikokun@gmail.com>
 * @license AOL <http://aol.nexua.org>
 * @year 2012
 */
utils.is.type = function (o) {
  return Object.prototype.toString.call(o);
}

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
  var type, i;
  for (i = 0; i < ns.types.length; i++) {
    if (typeof ps['is' + ns.types[i]] !== 'undefined') continue;
    type = ns.types[i];
    ns.typeStrings[type] = "[object " + type + "]";
    ps['is' + type] = (function(str) { 
      /**
       * Generic isType method, non-specific
       * 
       * Checks `o` against `Object.prototype.toString` through calls against iterated type
       * 
       * @param {Mixed} o Non-specific, iterated method. 
       * @return Boolean
       * @memberOf utils
       * @author Nijiko Yonskai
       * @license AOL <http://aol.nexua.org>
       * @year 2012
       */
      return function (o) {
        return Object.prototype.toString.call(o) === str;
      } 
    })(ns.typeStrings[type]);
  }
}(utils.is, utils));

/**
 * Check to see if object is empty
 * 
 * - Strings and Arrays will be checked by length
 * - Objects will be checked for properties
 * 
 * @param {Mixed} o Non-specific checked value 
 * @return Boolean
 * @memberOf utils
 * @author Nijiko Yonskai
 * @license AOL <http://aol.nexua.org>
 * @year 2012
 */
utils.isEmpty = function (o) {
  if(utils.isArray(o) || utils.isString(o))
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
 * @param {Mixed} o Non-specific checked value 
 * @return Boolean
 * @memberOf utils
 * @author Nijiko Yonskai
 * @license AOL <http://aol.nexua.org>
 * @year 2012
 */
utils.isElement = function (o) {
  return !!(o && o.nodeType == 1);
};

/**
 * Check to see if given value is an Object
 * 
 * @param {Mixed} o Non-specific checked value 
 * @return Boolean
 * @memberOf utils
 * @author Nijiko Yonskai
 * @license AOL <http://aol.nexua.org>
 * @year 2012
 */
utils.isObject = function (o) {
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
utils.isBoolean = function (o) {
  return o === true || o === false || utils.is.type(o) == '[object Boolean]';
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
utils.isNaN = function (o) {
  return utils.isNumber(o) && o != +o;
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
utils.isFinite = function (o) {
  return isFinite(o) && !isNaN( parseFloat(o));
}

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
utils.isNull = function (o) {
  return o === null;
};

/**
 * Checks whether given value is `undefined`
 * 
 * @param {Mixed} o Non-specific checked value 
 * @return Boolean
 * @memberOf utils
 * @author Nijiko Yonskai
 * @license AOL <http://aol.nexua.org>
 * @year 2012
 */
utils.isUndefined = function (o) {
  return o === void 0;
};