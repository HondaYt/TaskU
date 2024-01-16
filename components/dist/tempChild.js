"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var btn_1 = require("components/btn");
function TempChild() {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_native_1.View, { style: styles.tempInfo },
            react_1["default"].createElement(react_native_1.Text, { style: styles.tempInfoText },
                "\u9031\u306B",
                react_1["default"].createElement(react_native_1.Text, { style: styles.tempInfoCount }, "2"),
                "\u56DE\u3001\u6D17\u6FEF\u3092\u3059\u308B\u3002"),
            react_1["default"].createElement(btn_1["default"], { title: '\u7DE8\u96C6', onPress: function () { return console.log('pressed'); }, style: { width: 60, height: 50 } }))));
}
exports["default"] = TempChild;
var styles = react_native_1.StyleSheet.create({
    tempInfo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: "#fff"
    },
    tempInfoText: {
        fontSize: 18,
        fontWeight: "500"
    },
    tempInfoCount: {
        fontSize: 36,
        fontWeight: "600"
    }
});
