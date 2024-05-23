"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseQuery = exports["default"] = exports.createQuery = void 0;
var _base = require("@locustjs/base");
var parseQuery = exports.parseQuery = function parseQuery(url) {
  var convert = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var smart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  url = (url || '').toString().trim();
  var result = {};
  var iq = url.indexOf('?');
  var ih = url.indexOf('#');
  var hasHttp = url.substr(0, 7).toLowerCase() == 'http://';
  var hasHttps = url.substr(0, 8).toLowerCase() == 'https://';
  var arr = '';
  if (iq >= 0) {
    if (ih > 0) {
      if (iq < ih) {
        if (ih - iq - 1 > 0) {
          arr = url.substr(iq + 1, ih - iq - 1);
        }
      } else {
        if (!hasHttp && !hasHttps) {
          arr = url.substr(0, ih);
          if (arr.indexOf('=') < 0) {
            arr = '';
          }
        }
      }
    } else {
      arr = url.substr(iq + 1);
    }
  } else {
    if (ih >= 0) {
      if (!hasHttp && !hasHttps) {
        arr = url.substr(0, ih);
      }
    } else {
      if (!hasHttp && !hasHttps) {
        arr = url;
      }
    }
    if (arr.indexOf('=') < 0) {
      arr = '';
    }
  }
  if (arr) {
    arr.split('&').forEach(function (key_value_pair) {
      key_value_pair = (key_value_pair || '').trim();
      if (key_value_pair.length > 0) {
        var ei = key_value_pair.indexOf('=');
        if (ei < 0) {
          result[key_value_pair] = null;
        } else {
          var key = decodeURIComponent(key_value_pair.substr(0, ei).trim());
          var value = decodeURIComponent(key_value_pair.substr(ei + 1));
          if (value && convert) {
            if ((0, _base.isNumeric)(value)) {
              var convertedValue = Number(value);
              if (isNaN(convertedValue)) {
                convertedValue = parseFloat(value);
              }
              if (isNaN(convertedValue)) {
                convertedValue = 0;
              }
              result[key] = convertedValue;
            } else if ((0, _base.hasBool)(value)) {
              result[key] = value.toLowerCase() == 'true' ? true : false;
            } else if ((0, _base.hasDate)(value)) {
              result[key] = Date.parse(value);
            } else {
              if (value[0] == '{' && value[value.length - 1] == '}' || value[0] == '[' && value[value.length - 1] == ']') {
                try {
                  result[key] = JSON.parse(value);
                } catch (_unused) {
                  result[key] = value;
                }
              } else {
                if (smart) {
                  if (value == 'null') {
                    result[key] = null;
                  } else if (value == 'undefined') {
                    result[key] = undefined;
                  } else {
                    result[key] = value;
                  }
                } else {
                  result[key] = value;
                }
              }
            }
          } else {
            result[key] = value;
          }
        }
      }
    });
  }
  return result;
};
var createQuery = exports.createQuery = function createQuery(obj, ignoreKeys) {
  return Object.keys(obj).filter(function (key) {
    return ignoreKeys == null || typeof ignoreKeys.indexOf !== 'function' || ignoreKeys.indexOf(key) < 0;
  }).reduce(function (arr, key) {
    var item = obj[key];
    if (Array.isArray(item)) {
      item.forEach(function (value) {
        return arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
      });
    } else if (item !== undefined) {
      arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(item));
    }
    return arr;
  }, []).join("&");
};
var QueryHelper = {
  parse: parseQuery,
  stringify: createQuery
};
var _default = exports["default"] = QueryHelper;
