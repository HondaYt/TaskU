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
var react_2 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var Stack = native_stack_1.createNativeStackNavigator();
function RegisterIndicator(_a) {
    var progress = _a.progress, maxProgress = _a.maxProgress;
    var widthAnim = react_2.useRef(new react_native_1.Animated.Value(0)).current;
    react_2.useEffect(function () {
        react_native_1.Animated.timing(widthAnim, {
            toValue: (100 / maxProgress) * progress,
            duration: 500,
            useNativeDriver: false
        }).start();
    }, [progress, maxProgress, widthAnim]);
    return (react_1["default"].createElement(react_native_1.Animated.View, { style: styles.registerIndicator },
        react_1["default"].createElement(react_native_1.Text, { style: styles.progressText },
            "\u307E\u305A\u306F\u3042\u306A\u305F\u306E\u3053\u3068\u3092",
            "\n",
            "\u6559\u3048\u3066\u304F\u3060\u3055\u3044\uFF01"),
        react_1["default"].createElement(react_native_1.View, { style: styles.progressBar },
            react_1["default"].createElement(react_native_1.Animated.View, { style: __assign(__assign({}, styles.progressIndicator), { width: widthAnim.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%']
                    }) }) }))));
}
exports["default"] = RegisterIndicator;
var styles = react_native_1.StyleSheet.create({
    progressText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center'
    },
    progressBar: {
        height: 8,
        backgroundColor: '#EAEAEA'
    },
    progressIndicator: {
        height: 8,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: '#FFB6B6'
    },
    registerIndicator: {
        backgroundColor: '#fff'
    }
});
