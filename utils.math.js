if (!utils || typeof utils !== 'object') utils = {};
if (!utils.math || typeof utils.math !== 'object') utils.math = {};

/** 
 * Returns the absolute value.
 *
 * @param  {Number} x Some value
 * @return {Number}   Absolute Value
 * @package utils.math
 * @author Nijiko Yonskai
 * @year 2012
 * @license AOL <aol.nexua.org>
 */
utils.math.abs = function (x) {
  return x < 0 ? -x : x;
};

/**
 * Normalize a value to exist between 0 and 1 (inclusive).
 *
 * Opposite of #utils.math.lerp
 *
 * @param  {Number} value Value checked by min / max.
 * @param  {Number} min   Minimum value
 * @param  {Number} max   Maximum value
 * @return {Number} Check value compared to min and max.
 * @package utils.math
 * @author Nijiko Yonskai
 * @year 2012
 * @license AOL <aol.nexua.org>
 */
utils.math.normalize = utils.math.norm = function (value, min, max) {
  return (min < max) ? (value - min) / (max - min) : (value - min) / (min - max);
};

/**
 * Figures out what proportion a particular value is relative to min (start) and max (stop) coordinates.
 *
 * Linear Interpolation based on the following equation:
 *
 *     min + (max - min) * value
 *
 * @param  {Number} value Incoming value to be converted.
 * @param  {Number} min   Minimum value
 * @param  {Number} max   Maximum value
 * @package utils.math
 * @author Nijiko Yonskai
 * @year 2012
 * @license AOL <aol.nexua.org>
 */
utils.math.lerp = function (value, min, max) {
  return min + (max - min) * value;
};

/**
 * Re-maps a number from one range to another.
 *
 * @param  {Number} value Incoming value to be converted.
 * @param  {Number} min lower bound of value's current range
 * @param  {Number} max upper bound of value's current range
 * @param  {Number} omin lower bound of value's target range
 * @param  {Number} omax upper bound of value's target range
 * @return {Number} Re-mapped value from current range to given range
 * @package utils.math
 * @author Nijiko Yonskai
 * @year 2012
 * @license AOL <aol.nexua.org>
 */
utils.math.remap = function (value, min, max, omin, omax) {
  return omin + (omax - omin) * (value - min) / (max - min);
};

/**
 * Clamp a value within an inclusive range.
 *
 * @param  {Number} value Incoming value to be converted.
 * @param  {Number} min   Minimum value
 * @param  {Number} max   Maximum value
 * @return {Number} Clamped value
 * @package utils.math
 * @author Nijiko Yonskai
 * @year 2012
 * @license AOL <aol.nexua.org>
 */
utils.math.clamp = function (value, min, max) {
  return Math.max(min, Math.min(max, value));
};

/**
 * Converts specified angle in radians to degrees.
 *
 * @return {Number} angle in degrees (not normalized to 0 ... 360)
 * @package utils.math
 * @author Nijiko Yonskai
 * @year 2012
 * @license AOL <aol.nexua.org>
 */
utils.math.radToDeg = function (radian){
  return 180 / Math.PI * radian;
};

/**
 * Converts specified angle in degrees to radians.
 *
 * @return {Number} angle in radians (not normalized to 0 ... Math.PI*2)
 * @package utils.math
 * @author Nijiko Yonskai
 * @year 2012
 * @license AOL <aol.nexua.org>
 */
utils.math.degToRad = function(degree) {
  return Math.PI / 180 * degree;
};

/**
 * Generates a random integer / float relative to given min and max value.
 *
 * @param  {Number} min   Minimum value
 * @param  {Number} max   Maximum value
 * @param  {Boolean} flt  Determines whether returned value is a float or a (rounded) integer.
 * @package utils.math
 * @author Nijiko Yonskai
 * @year 2012
 * @license AOL <aol.nexua.org>
 */
utils.math.randomBetween = function (min, max, flt) {
  var result = Math.exp(Math.random() * Math.log(max - min)) + min;
  return flt ? result : Math.round(result);
};