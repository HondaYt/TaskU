"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var Stack = native_stack_1.createNativeStackNavigator();
function btnSection(_a) {
    var prevBtn = _a.prevBtn, nextBtn = _a.nextBtn, navigation = _a.navigation;
    return (react_1["default"].createElement(react_native_1.View, { style: styles.btnContainer },
        react_1["default"].createElement(react_native_1.TouchableOpacity, { activeOpacity: 0.8, style: styles.btn, onPress: function () { return navigation.navigate(nextBtn); } },
            react_1["default"].createElement(react_native_1.Text, { style: styles.btnText }, "\u6B21\u306B\u9032\u3080")),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { activeOpacity: 0.8, style: [styles.btn, styles.prevBtn], onPress: function () { return navigation.navigate(prevBtn); } },
            react_1["default"].createElement(react_native_1.Text, { style: [styles.btnText, styles.prevBtnText] }, "\u623B\u308B"))));
}
exports["default"] = btnSection;
var styles = react_native_1.StyleSheet.create({
    btnContainer: {
        // height: 200,
        gap: 8,
        padding: 8
    },
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
    },
    prevBtn: {
        backgroundColor: "#fff",
        borderColor: "#555",
        borderWidth: 3
    },
    prevBtnText: {
        color: "#555",
        fontSize: 18
    }
});
