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
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var react_native_1 = require("react-native");
var Stack = native_stack_1.createNativeStackNavigator();
function RegisterIndicator(_a) {
    var progress = _a.progress, onHeightChange = _a.onHeightChange;
    var _b = react_2.useState(0), height = _b[0], setHeight = _b[1]; // heightの状態を追加
    var onLayout = function (event) {
        var height = event.nativeEvent.layout.height;
        setHeight(height);
        onHeightChange(height); // 高さが変わったときに親コンポーネントに通知
    };
    var lastProgress = 5;
    var insets = react_native_safe_area_context_1.useSafeAreaInsets();
    var initialFade = progress === 0 || progress === lastProgress ? 0 : 1;
    var initialWidth = (100 / lastProgress) * progress;
    var widthAnim = react_2.useRef(new react_native_1.Animated.Value(initialWidth)).current;
    var fadeAnim = react_2.useRef(new react_native_1.Animated.Value(initialFade)).current;
    react_2.useEffect(function () {
        if (progress === 0 || progress === lastProgress) {
            react_native_1.Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start();
        }
        else {
            react_native_1.Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start();
        }
    }, [progress]);
    react_2.useEffect(function () {
        react_native_1.Animated.timing(widthAnim, {
            toValue: (100 / lastProgress) * progress,
            duration: 500,
            useNativeDriver: false
        }).start();
    }, [progress]);
    return (react_1["default"].createElement(react_native_1.Animated.View, { style: __assign(__assign({}, styles.registerIndicator), { paddingTop: insets.top, opacity: fadeAnim }) },
        react_1["default"].createElement(react_native_1.View, { onLayout: onLayout },
            react_1["default"].createElement(react_native_1.Text, { style: styles.progressText },
                "\u307E\u305A\u306F\u3042\u306A\u305F\u306E\u3053\u3068\u3092",
                "\n",
                "\u6559\u3048\u3066\u304F\u3060\u3055\u3044\uFF01"),
            react_1["default"].createElement(react_native_1.View, { style: styles.progressBar },
                react_1["default"].createElement(react_native_1.Animated.View, { style: __assign(__assign({}, styles.progressIndicator), { width: widthAnim.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['0%', '100%']
                        }) }) })))));
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
        backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        flex: 1,
        zIndex: 100
    }
});
