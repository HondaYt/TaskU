"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var Stack = native_stack_1.createNativeStackNavigator();
function Btn(props) {
    var prev = props.prev, style = props.style, onPress = props.onPress, title = props.title, disabled = props.disabled, textStyle = props.textStyle; // Added textStyle to destructuring
    return (react_1["default"].createElement(react_native_1.TouchableOpacity, { activeOpacity: 0.9, style: [
            prev ? styles.prevBtn : styles.btn,
            style,
            disabled && styles.disabledBtn
        ], onPress: disabled ? undefined : onPress, disabled: disabled },
        react_1["default"].createElement(react_native_1.Text, { style: [
                prev ? styles.prevText : styles.text,
                disabled && styles.disabledText,
                textStyle
            ] }, title)));
}
exports["default"] = Btn;
var styles = react_native_1.StyleSheet.create({
    btn: {
        height: 60,
        backgroundColor: "#333",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 20
    },
    prevText: {
        color: "#555",
        fontWeight: "600",
        fontSize: 20
    },
    prevBtn: {
        width: 60,
        borderWidth: 3,
        borderColor: "#555",
        backgroundColor: "#fff",
        borderRadius: 8,
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    disabledBtn: {
        backgroundColor: "#ccc"
    },
    disabledText: {
        color: "#999"
    }
});
