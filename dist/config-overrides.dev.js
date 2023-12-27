"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var path = require('path');

var _require = require('customize-cra'),
    override = _require.override,
    addBabelPlugins = _require.addBabelPlugins,
    babelInclude = _require.babelInclude;

module.exports = override.apply(void 0, _toConsumableArray(addBabelPlugins('@babel/plugin-proposal-class-properties')).concat([babelInclude([path.resolve(__dirname, 'node_modules/@rneui/base'), path.resolve(__dirname, 'node_modules/@rneui/themed'), path.resolve(__dirname, 'node_modules/react-native-vector-icons'), path.resolve(__dirname, 'node_modules/react-native-ratings'), path.resolve(__dirname, 'src')])]));