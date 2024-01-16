"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var input1_1 = require("screens/registerInner/input1");
var input2_1 = require("screens/registerInner/input2");
var input3_1 = require("screens/registerInner/input3");
var complete_1 = require("screens/registerInner/complete");
var btn_1 = require("components/btn");
var registerIndicator_1 = require("components/registerIndicator");
var Stack = native_stack_1.createNativeStackNavigator();
function Register(_a) {
    var navigation = _a.navigation;
    // コンテンツのリストを定義
    var _b = react_2.useState(true), isButtonDisabled = _b[0], setIsButtonDisabled = _b[1];
    var contents = [
        react_1["default"].createElement(input1_1["default"], { setIsButtonDisabled: setIsButtonDisabled }),
        react_1["default"].createElement(input2_1["default"], { setIsButtonDisabled: setIsButtonDisabled }),
        react_1["default"].createElement(input3_1["default"], null),
        react_1["default"].createElement(complete_1["default"], null),
    ];
    // 現在のコンテンツのインデックスを追跡するための状態
    var _c = react_2.useState(0), currentIndex = _c[0], setCurrentIndex = _c[1];
    var progressTexts = [
        "\u307E\u305A\u306F\u3042\u306A\u305F\u306E\u3053\u3068\u3092" + "\n" + "\u6559\u3048\u3066\u304F\u3060\u3055\u3044\uFF01",
        "\u3042\u306A\u305F\u306B\u6700\u9069\u306A" + "\n" + "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u306F\u3053\u3061\u3089\u3067\u3059\u3002",
        "ほぼ完了です！",
        "登録完了！"
    ];
    var _d = react_2.useState(progressTexts[0]), progressText = _d[0], setProgressText = _d[1];
    react_2.useEffect(function () {
        setProgressText(progressTexts[currentIndex]);
    }, [currentIndex]);
    // 次のコンテンツに切り替える関数
    var handleNext = function () {
        setCurrentIndex(function (prevIndex) {
            // 最後のコンテンツに達したらそれ以上インデックスを増やさない
            var nextIndex = prevIndex + 1;
            return nextIndex < contents.length ? nextIndex : prevIndex;
        });
    };
    var handlePrev = function () {
        setCurrentIndex(function (prevIndex) {
            // 最初のコンテンツに達したらそれ以上インデックスを減らさない
            var nextIndex = prevIndex - 1;
            return nextIndex >= 0 ? nextIndex : prevIndex;
        });
    };
    var fadeAnim = react_2.useRef(new react_native_1.Animated.Value(1)).current;
    react_2.useEffect(function () {
        if (currentIndex === contents.length - 1) {
            // 最後のコンテンツになったらフェードアウト
            react_native_1.Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start();
        }
        else {
            // それ以外の場合はフェードイン（不透明に戻す）
            react_native_1.Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start();
        }
    }, [currentIndex, contents.length, fadeAnim]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_native_1.View, { style: { backgroundColor: '#fff' } },
            react_1["default"].createElement(react_native_1.Animated.View, { style: { opacity: fadeAnim } },
                react_1["default"].createElement(registerIndicator_1["default"], { progress: (currentIndex + 1), maxProgress: contents.length, progressText: progressText }))),
        react_1["default"].createElement(react_native_1.View, { style: styles.content }, contents[currentIndex]),
        react_1["default"].createElement(react_native_1.View, { style: styles.btnContainer },
            currentIndex === 0 || currentIndex === contents.length - 1 ? null :
                react_1["default"].createElement(btn_1["default"], { prev: true, title: '\u623B\u308B', onPress: handlePrev }),
            currentIndex !== contents.length - 1 ?
                react_1["default"].createElement(btn_1["default"], { title: '\u6B21\u3078\u9032\u3080', style: { flex: 1 }, onPress: handleNext, disabled: isButtonDisabled }) :
                react_1["default"].createElement(btn_1["default"], { title: '\u30C8\u30C3\u30D7\u30DA\u30FC\u30B8\u3078', style: { flex: 1 }, onPress: function () { return navigation.navigate('Top'); } }))));
}
exports["default"] = Register;
var styles = react_native_1.StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: "#fff"
    },
    btnContainer: {
        backgroundColor: "#fff",
        flexDirection: "row",
        gap: 8,
        padding: 8,
        paddingLeft: 32,
        paddingRight: 32,
        justifyContent: "space-between"
    }
});
