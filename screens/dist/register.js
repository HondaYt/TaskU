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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("react");
var native_1 = require("@react-navigation/native");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var Stack = native_stack_1.createNativeStackNavigator();
var btnSection_1 = require("components/btnSection");
function Register(_a) {
    var navigation = _a.navigation, setProgress = _a.setProgress, paddingTop = _a.paddingTop, props = __rest(_a, ["navigation", "setProgress", "paddingTop"]);
    var nav = native_1.useNavigation();
    react_2.useEffect(function () {
        return nav.addListener('beforeRemove', function (e) {
            // スワイプバックが開始されたときに呼び出されます
            setProgress(function (prevProgress) { return prevProgress > 0 ? prevProgress - 1 : 0; });
        });
    }, [nav, setProgress]);
    return (react_1["default"].createElement(react_native_1.View, { style: styles.main },
        react_1["default"].createElement(react_native_1.View, { style: __assign({ paddingTop: paddingTop }, styles.container) },
            react_1["default"].createElement(react_native_1.View, { style: __assign(__assign({}, styles.contents), { paddingTop: 0 }) },
                react_1["default"].createElement(react_native_1.Text, null)),
            react_1["default"].createElement(btnSection_1["default"], { prevBtn: 'Welcome', nextBtn: '', navigation: navigation, setProgress: setProgress }))));
}
exports["default"] = Register;
var styles = react_native_1.StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#fff"
    },
    contents: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    screen: {
        flex: 1,
        backgroundColor: "#fff"
    }
});
