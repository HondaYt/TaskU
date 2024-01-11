"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var Stack = native_stack_1.createNativeStackNavigator();
function registerInput1(_a) {
    var navigation = _a.navigation;
    return (react_1["default"].createElement(react_native_1.View, { style: styles.content },
        react_1["default"].createElement(react_native_1.View, null,
            react_1["default"].createElement(react_native_1.Text, { style: styles.ttl }, "Input1")),
        react_1["default"].createElement(react_native_1.View, { style: styles.WelcomeBtnContainer })));
}
exports["default"] = registerInput1;
var styles = react_native_1.StyleSheet.create({
    content: {
        justifyContent: "space-between",
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16
    },
    ttl: {
        fontSize: 66,
        fontWeight: "600"
    },
    subTtl: {
        fontWeight: "500",
        fontSize: 26,
        lineHeight: 35
    },
    WelcomeBtnContainer: {
        flex: 1,
        gap: 8,
        padding: 8,
        justifyContent: "flex-end"
    },
    tosText: {
        paddingTop: 4,
        height: 60,
        fontSize: 12,
        textAlign: "center",
        lineHeight: 18
    },
    link: {
        textDecorationLine: "underline",
        color: "#555"
    }
});
