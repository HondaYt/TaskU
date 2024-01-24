"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var Timer_1 = require("components/Timer");
var Stack = native_stack_1.createNativeStackNavigator();
function Top() {
    return (react_1["default"].createElement(react_native_1.View, { style: styles.content },
        react_1["default"].createElement(react_native_1.View, null,
            react_1["default"].createElement(react_native_1.Text, null, "\u304A\u306F\u3088\u3046\u3054\u3056\u3044\u307E\u3059"),
            react_1["default"].createElement(react_native_1.Text, null, "\u4ECA\u65E5\u306F2024/01/22")),
        react_1["default"].createElement(Timer_1["default"], null)));
}
exports["default"] = Top;
var styles = react_native_1.StyleSheet.create({
    content: {
        // justifyContent: "space-between",
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16
    }
});
