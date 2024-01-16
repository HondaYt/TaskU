"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var tempChild_1 = require("components/tempChild");
var Stack = native_stack_1.createNativeStackNavigator();
var width = react_native_1.Dimensions.get('window').width;
// ボタンの幅（または高さ）を計算
var buttonSize = width / 2 - 16 - 8; // 画面幅の半分から余白とマージンを引いた値
function registerInput1(_a) {
    var setIsButtonDisabled = _a.setIsButtonDisabled;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_native_1.ScrollView, { contentContainerStyle: styles.content },
            react_1["default"].createElement(tempChild_1["default"], null))));
}
exports["default"] = registerInput1;
var styles = react_native_1.StyleSheet.create({
    content: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        backgroundColor: "#fff",
        padding: 16,
        flexGrow: 1
    },
    wrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        // flex: 1,
        backgroundColor: "#fff",
        flexGrow: 1
    },
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
