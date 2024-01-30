"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("react");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var react_native_1 = require("react-native");
var Btn_1 = require("components/Btn");
var RegisterIndicator_1 = require("components/RegisterIndicator");
var Input1_1 = require("screens/registerInner/Input1");
var Input2_1 = require("screens/registerInner/Input2");
var Input3_1 = require("screens/registerInner/Input3");
var Complete_1 = require("screens/registerInner/Complete");
var vector_icons_1 = require("@expo/vector-icons");
function Register(_a) {
    // ユーザー情報の状態を追加
    var navigation = _a.navigation;
    // コンテンツのリストを定義
    var _b = react_2.useState(false), isButtonDisabled = _b[0], setIsButtonDisabled = _b[1];
    var contents = [
        react_1["default"].createElement(Input1_1["default"], null),
        react_1["default"].createElement(Input2_1["default"], { setIsButtonDisabled: setIsButtonDisabled }),
        react_1["default"].createElement(Input3_1["default"], { setIsButtonDisabled: setIsButtonDisabled }),
        react_1["default"].createElement(Complete_1["default"], null),
    ];
    // 現在のコンテンツのインデックスを追跡するための状態
    var _c = react_2.useState(0), currentIndex = _c[0], setCurrentIndex = _c[1];
    var progressTexts = [
        "\u307E\u305A\u306F\u3042\u306A\u305F\u306E\u3053\u3068\u3092" + "\n" + "\u6559\u3048\u3066\u304F\u3060\u3055\u3044\uFF01",
        "\u3042\u306A\u305F\u306B\u6700\u9069\u306A" + "\n" + "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u306F\u3053\u3061\u3089\u3067\u3059\u3002",
        "\u6700\u5F8C\u306B\u3001\u6388\u696D\u304C\u7D42\u308F\u308B\u6642\u9593\u3092" + "\n" + "\u6559\u3048\u3066\u304F\u3060\u3055\u3044\uFF01",
        "登録が完了しました。"
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
            var nextIndex = prevIndex - 1;
            if (nextIndex >= 0) {
                // Input1に戻るときにボタンを有効にする
                if (nextIndex === 0) {
                    setIsButtonDisabled(false);
                }
                return nextIndex;
            }
            return prevIndex;
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
    return (react_1["default"].createElement(react_native_safe_area_context_1.SafeAreaView, { style: { flex: 1, backgroundColor: '#fff' }, edges: ['right', 'top', 'left'] },
        react_1["default"].createElement(react_native_1.View, null,
            react_1["default"].createElement(react_native_1.Animated.View, { style: { opacity: fadeAnim } },
                react_1["default"].createElement(RegisterIndicator_1["default"], { progress: (currentIndex + 1), maxProgress: contents.length, progressText: progressText }))),
        react_1["default"].createElement(react_native_1.View, { style: styles.content }, contents[currentIndex]),
        react_1["default"].createElement(react_native_1.View, { style: styles.btnContainer },
            currentIndex === 0 || currentIndex === contents.length - 1 ? null :
                react_1["default"].createElement(Btn_1["default"], { prev: true, title: react_1["default"].createElement(vector_icons_1.Octicons, { name: "chevron-left", size: 32, color: "#555" }), onPress: handlePrev }),
            currentIndex !== contents.length - 1 ?
                react_1["default"].createElement(Btn_1["default"], { title: '\u6B21\u3078\u9032\u3080', style: { flex: 1 }, onPress: handleNext, disabled: isButtonDisabled }) :
                react_1["default"].createElement(Btn_1["default"], { title: 'TaskU\u3092\u59CB\u3081\u308B', style: { flex: 1 }, onPress: function () { return navigation.navigate('Main'); } }))));
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
        justifyContent: "space-between",
        paddingBottom: 34 + 8
    }
});
