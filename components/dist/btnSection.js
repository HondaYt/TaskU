"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var Stack = native_stack_1.createNativeStackNavigator();
function BtnSection(_a) {
    var prevBtn = _a.prevBtn, nextBtn = _a.nextBtn, navigation = _a.navigation, setProgress = _a.setProgress;
    return (react_1["default"].createElement(react_native_1.View, { style: styles.btnWrap },
        react_1["default"].createElement(react_native_1.TouchableOpacity, { activeOpacity: 0.8, style: styles.btn, onPress: function () {
                navigation.navigate(nextBtn);
                setProgress(function (prevProgress) { return prevProgress + 1; });
            } },
            react_1["default"].createElement(react_native_1.Text, { style: styles.btnText }, "\u6B21\u306B\u9032\u3080")),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { activeOpacity: 0.8, style: [styles.btn, styles.prevBtn], onPress: function () {
                navigation.navigate(prevBtn);
                setProgress(function (prevProgress) { return prevProgress > 0 ? prevProgress - 1 : 0; });
            } },
            react_1["default"].createElement(react_native_1.Text, { style: [styles.btnText, styles.prevBtnText] }, "\u623B\u308B"))));
}
exports["default"] = BtnSection;
var styles = react_native_1.StyleSheet.create({
    btnWrap: {
        // backgroundColor: "tomato",
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 8,
        gap: 8
    },
    btnContainer: {},
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
