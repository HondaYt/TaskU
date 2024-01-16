"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var Stack = native_stack_1.createNativeStackNavigator();
var width = react_native_1.Dimensions.get('window').width;
// ボタンの幅（または高さ）を計算
var buttonSize = width / 2 - 16 - 8; // 画面幅の半分から余白とマージンを引いた値
function AttributeBtn(_a) {
    var title = _a.title, onPress = _a.onPress, selected = _a.selected;
    var _b = react_2.useState(30), fontSize = _b[0], setFontSize = _b[1];
    var _c = react_2.useState(false), pressed = _c[0], setPressed = _c[1];
    var handlePress = function () {
        setPressed(!pressed);
        onPress();
    };
    var onTextLayout = function (e) {
        var lines = e.nativeEvent.lines;
        if (lines.length > 1) {
            // テキストが複数行にわたる場合、フォントサイズを小さくする
            setFontSize(function (prevFontSize) { return prevFontSize * 0.9; });
        }
    };
    return (react_1["default"].createElement(react_native_1.TouchableOpacity, { activeOpacity: 0.9, style: [styles.attributeBtn, selected && styles.selected], onPress: onPress },
        react_1["default"].createElement(react_native_1.View, { onLayout: function (e) {
                var width = e.nativeEvent.layout.width;
                // テキストの幅がボタンの幅を超えた場合、フォントサイズを調整
                if (width > buttonSize) {
                    setFontSize(function (prevFontSize) { return Math.max(prevFontSize * (buttonSize / width), 12); }); // 最小フォントサイズを12に設定
                }
            } },
            react_1["default"].createElement(react_native_1.Text, { style: [styles.text, { fontSize: fontSize }], onTextLayout: onTextLayout, adjustsFontSizeToFit: true, numberOfLines: 1 }, title))));
}
exports["default"] = AttributeBtn;
var styles = react_native_1.StyleSheet.create({
    attributeBtn: {
        backgroundColor: "#fff",
        borderColor: "#666",
        borderWidth: 3,
        width: buttonSize,
        height: buttonSize,
        padding: 16,
        borderRadius: 16,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    text: {
        color: "#333",
        fontWeight: "800",
        textAlign: "right"
    },
    selected: {
        backgroundColor: "#ddd",
        borderColor: "#333"
    }
});
