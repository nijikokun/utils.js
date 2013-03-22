(function (exports) {
  exports = exports.object = {};

  exports.extend = function (original, context, key) {
    for (key in context)
      if (context.hasOwnProperty(key))
        if (Object.prototype.toString.call(context[key]) === '[object Object]')
          original[key] = exports.extend(original[key] || {}, context[key]);
        else
          original[key] = context[key];
    return original;
  };

  exports.serialExtend = function (original, context, prefix) {
    var output = original || {}, i, key, value;
    for (i in context) {
      if (!context.hasOwnProperty(i)) continue;
      else key = prefix ? prefix + "[" + i + "]" : i, value = context[i];
      if (Object.prototype.toString.call(value) === '[object Object]')
        output = exports.serialExtend(output, value, key);
      else
        output[key] = value;
    }

    return output;
  };

  exports.serialize = function (original, context) {
    return exports.serialExtend(original, context).join("&");
  };
})(typeof(window) === 'undefined' ? module.exports : (window.utils = window.utils || {}));