(function (exports) {
  var key = exports.key = {};

  keys = function (code) {
    var type = {
      object: function (i) {
        if (Object.prototype.toString.call(code) !== "[object Array]" || code.length < 1) return false;
        var results = []; for (i = 0; i < code.length; i++) results.push(key.map[code]);
        return results;
      },

      number: function () {
        return key.map[code];
      },

      string: function (results) {
        function check (item, keycode) {
          for (keycode in key.map)
            if (key.map.hasOwnProperty(keycode))
              if (key.map[keycode].indexOf(item) > -1)
                return key.map[keycode];
          return false;
        }

        if (code.indexOf('+') !== -1) {
          results = [];
          code.split('+').forEach(function (i) {
            i = i.replace(/^\s+|\s+$/g, '');
            results.push(check(i));
          });
        } else results = check(code);

        return results;
      }
    };

    return type[typeof code]();
  };

  /**
   * Keyboard keyChar Dictionary with keyChar as keys and value is an array-list with possible names.
   */
  key.map = {
    8:    [ 'backspace' ],
    9:    [ 'tab' ],
    13:   [ 'enter', 'return' ],
    16:   [ 'shift' ],
    17:   [ 'ctrl', 'control' ],
    18:   [ 'alt', 'option', 'menu' ],
    19:   [ 'pause', 'break' ],
    20:   [ 'caps', 'capslock', 'caps lock' ],
    27:   [ 'escape' ],
    32:   [ 'space', 'spacebar', 'space bar' ],
    33:   [ 'page up', 'pup' ],
    34:   [ 'page down', 'pdown' ],
    35:   [ 'end' ],
    36:   [ 'home' ],
    37:   [ 'left', 'left arrow', 'west' ],
    38:   [ 'up',  'up arrow', 'north' ],
    39:   [ 'right', 'right arrow', 'east' ],
    40:   [ 'down', 'down arrow', 'south' ],
    45:   [ 'insert', 'ins' ],
    46:   [ 'delete', 'del' ],
    48:   [ '0', 'zero' ],
    49:   [ '1', 'one' ],
    50:   [ '2', 'two' ],
    51:   [ '3', 'three' ],
    52:   [ '4', 'four' ],
    53:   [ '5', 'five' ],
    54:   [ '6', 'six' ],
    55:   [ '7', 'seven' ],
    56:   [ '8', 'eight' ],
    57:   [ '9', 'nine' ],
    65:   [ 'a' ],
    66:   [ 'b' ],
    67:   [ 'c' ],
    68:   [ 'd' ],
    69:   [ 'e' ],
    70:   [ 'f' ],
    71:   [ 'g' ],
    72:   [ 'h' ],
    73:   [ 'i' ],
    74:   [ 'j' ],
    75:   [ 'k' ],
    76:   [ 'l' ],
    77:   [ 'm' ],
    78:   [ 'n' ],
    79:   [ 'o' ],
    80:   [ 'p' ],
    81:   [ 'q' ],
    82:   [ 'r' ],
    83:   [ 's' ],
    84:   [ 't' ],
    85:   [ 'u' ],
    86:   [ 'v' ],
    87:   [ 'w' ],
    88:   [ 'x' ],
    89:   [ 'y' ],
    90:   [ 'z' ],
    91:   [ 'command', 'meta', 'leftsuper', 'super', 'windows', 'win', 'left command', 'lc', 'left meta', 'lm', 'left window key', 'lwk' ],
    92:   [ 'command', 'meta', 'rightsuper', 'super', 'windows', 'win', 'right command', 'rc', 'right meta', 'rm', 'right window key', 'rwk' ],
    93:   [ 'select' ],
    96:   [ 'numpad 0', 'numzero', 'num 0', 'num0', 'n0' ],
    97:   [ 'numpad 1', 'numone', 'num 1', 'num1', 'n1' ],
    98:   [ 'numpad 2', 'numtwo', 'num 2', 'num2', 'n2' ],
    99:   [ 'numpad 3', 'numthree', 'num 3', 'num3', 'n3' ],
    100:  [ 'numpad 4', 'numfour', 'num 4', 'num4', 'n4' ],
    101:  [ 'numpad 5', 'numfive', 'num 5', 'num5', 'n5' ],
    102:  [ 'numpad 6', 'numsix', 'num 6', 'num6', 'n6' ],
    103:  [ 'numpad 7', 'numseven', 'num 7', 'num7', 'n7' ],
    104:  [ 'numpad 8', 'numeight', 'num 8', 'num8', 'n8' ],
    105:  [ 'numpad 9', 'numnine', 'num 9', 'num9', 'n9' ],
    106:  [ 'multiply', 'star', 'asterisk', '*' ],
    107:  [ 'add', 'plus' ],
    109:  [ 'subtract', 'minus' ],
    110:  [ 'decimal', 'point' ],
    111:  [ 'divide' ],
    112:  [ 'f1' ],
    113:  [ 'f2' ],
    114:  [ 'f3' ],
    115:  [ 'f4' ],
    116:  [ 'f5' ],
    117:  [ 'f6' ],
    118:  [ 'f7' ],
    119:  [ 'f8' ],
    120:  [ 'f9' ],
    121:  [ 'f10' ],
    122:  [ 'f11' ],
    123:  [ 'f12' ],
    144:  [ 'num lock', 'num' ],
    145:  [ 'scroll lock', 'scroll' ],
    186:  [ 'semicolon', 'semi-colon', ';' ],
    187:  [ 'equal', 'equal sign', '=' ],
    188:  [ 'comma', ',' ],
    189:  [ 'dash', '-' ],
    190:  [ 'period', '.' ],
    191:  [ 'slash', 'forwardslash', 'forward slash', '/' ],
    192:  [ 'graveaccent', 'grave accent', 'grave', '`' ],
    219:  [ 'openbracket', 'open bracket', 'start bracket', 'starting bracket', '[' ],
    220:  [ 'backslash', 'back slash', '\\' ],
    221:  [ 'closebracket', 'close bracket', 'end bracket', 'ending bracket', ']' ]
  };
})(typeof(window) === 'undefined' ? module.exports : (window.utils = window.utils || {}));