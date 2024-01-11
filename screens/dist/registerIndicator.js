"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var Stack = native_stack_1.createNativeStackNavigator();
function RegisterIndicator(props) {
    return (react_1["default"].createElement(react_native_1.TouchableOpacity, { activeOpacity: 0.8, style: styles.btn, onPress: function () {
            props.onPress();
        } },
        react_1["default"].createElement(react_native_1.Text, { style: styles.btnText }, props.title)));
}
exports["default"] = RegisterIndicator;
var styles = react_native_1.StyleSheet.create({
    btn: {
        backgroundColor: "#333",
        borderRadius: 8,
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    btnText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 20
    }
});
