"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var Stack = native_stack_1.createNativeStackNavigator();
var width = react_native_1.Dimensions.get('window').width;
// ボタンの幅（または高さ）を計算
var buttonSize = width / 2 - 16 - 8; // 画面幅の半分から余白とマージンを引いた値
function AttributeBtn() {
    return (react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.attributeBtn },
        react_1["default"].createElement(react_native_1.Text, null, "\u5B66\u751F")));
}
exports["default"] = AttributeBtn;
var styles = react_native_1.StyleSheet.create({
    attributeBtn: {
        backgroundColor: "#fff",
        borderColor: "#333",
        borderWidth: 3,
        width: buttonSize,
        height: buttonSize,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
