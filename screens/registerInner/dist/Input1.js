"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var width = react_native_1.Dimensions.get('window').width;
// ボタンの幅（または高さ）を計算
var buttonSize = width / 2 - 16 - 8; // 画面幅の半分から余白とマージンを引いた値
function registerInput1() {
    return (react_1["default"].createElement(react_1["default"].Fragment, null));
}
exports["default"] = registerInput1;
var styles = react_native_1.StyleSheet.create({});
