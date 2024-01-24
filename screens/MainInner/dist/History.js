"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var Stack = native_stack_1.createNativeStackNavigator();
function Top() {
    return (react_1["default"].createElement(react_native_1.View, { style: styles.content },
        react_1["default"].createElement(react_native_1.View, null,
            react_1["default"].createElement(react_native_1.Text, null, "\u3042\u3042\u3042"))));
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
