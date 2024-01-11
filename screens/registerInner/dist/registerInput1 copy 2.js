"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var btn_1 = require("components/btn");
var Stack = native_stack_1.createNativeStackNavigator();
function App(_a) {
    var navigation = _a.navigation;
    return (react_1["default"].createElement(react_native_1.View, { style: styles.content },
        react_1["default"].createElement(react_native_1.View, null,
            react_1["default"].createElement(react_native_1.Text, { style: styles.subTtl },
                "\u5927\u5207\u306A\u3042\u306A\u305F\u306E\u6642\u9593\u3092\u5B88\u308B\u3001",
                "\n",
                "\u30BF\u30B9\u30AF\u7BA1\u7406\u30A2\u30D7\u30EA\u3002"),
            react_1["default"].createElement(react_native_1.Text, { style: styles.ttl }, "TaskU")),
        react_1["default"].createElement(react_native_1.View, { style: styles.WelcomeBtnContainer },
            react_1["default"].createElement(btn_1["default"], { title: '\u4ECA\u3059\u3050\u59CB\u3081\u3088\u3046', onPress: function () { return navigation.navigate('register'); } }),
            react_1["default"].createElement(react_native_1.Text, { style: styles.tosText },
                "\u672C\u30B5\u30FC\u30D3\u30B9\u306E\u5229\u7528\u958B\u59CB\u3092\u3082\u3063\u3066\u3001",
                "\n",
                react_1["default"].createElement(react_native_1.Text, { style: styles.link }, "\u5229\u7528\u898F\u7D04"),
                "\u3068",
                react_1["default"].createElement(react_native_1.Text, { style: styles.link }, "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC"),
                "\u306B\u540C\u610F\u3057\u305F\u3053\u3068\u3068\u306A\u308A\u307E\u3059\u3002"))));
}
exports["default"] = App;
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
