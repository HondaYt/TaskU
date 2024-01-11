"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var Stack = native_stack_1.createNativeStackNavigator();
function Btn(props) {
    return (react_1["default"].createElement(react_native_1.TouchableOpacity, { activeOpacity: 0.9, style: __assign(__assign({}, props.prev ? styles.prevBtn : styles.btn), props.style), 
        // style={[styles.btn, props.style]}
        onPress: props.onPress },
        react_1["default"].createElement(react_native_1.Text, { style: __assign({}, props.prev ? styles.prevText : styles.text) }, props.title)));
}
exports["default"] = Btn;
var styles = react_native_1.StyleSheet.create({
    btn: {
        // width: '100%',
        // flex: 1,
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
    }
});
