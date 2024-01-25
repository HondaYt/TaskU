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
var react_native_1 = require("react-native");
var AttributeBtn_1 = require("components/AttributeBtn");
var width = react_native_1.Dimensions.get('window').width;
// ボタンの幅（または高さ）を計算
var buttonSize = width / 2 - 16 - 8; // 画面幅の半分から余白とマージンを引いた値
function registerInput1(_a) {
    var setIsButtonDisabled = _a.setIsButtonDisabled;
    var _b = react_2.useState({}), selectedAttributes = _b[0], setSelectedAttributes = _b[1];
    react_2.useEffect(function () {
        // 'living' 属性が選択されている場合のみボタンを有効にする
        setIsButtonDisabled(!selectedAttributes['living']);
    }, [selectedAttributes, setIsButtonDisabled]);
    // 属性とそのカテゴリのマッピング
    var attributes = {
        'living': ['一人暮らし', '同居中'],
        'status': selectedAttributes['living'] ? ['学生', '社会人', '主婦'] : []
    };
    var handleAttributePress = function (category, attribute) {
        setSelectedAttributes(function (prevSelectedAttributes) {
            var newAttributes = __assign({}, prevSelectedAttributes);
            var isAlreadySelected = prevSelectedAttributes[category] === attribute;
            newAttributes[category] = isAlreadySelected ? undefined : attribute;
            // 'living' カテゴリの選択を解除した場合、'status' カテゴリもクリアする
            if (category === 'living' && isAlreadySelected) {
                newAttributes['status'] = undefined;
            }
            return newAttributes;
        });
    };
    var statusFadeAnim = react_2.useRef(new react_native_1.Animated.Value(0)).current; // 初期値は0（透明）
    react_2.useEffect(function () {
        // livingが選択されたらstatusカテゴリのフェードインアニメーションを開始
        if (selectedAttributes['living']) {
            react_native_1.Animated.timing(statusFadeAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true
            }).start();
        }
        else {
            // livingが選択されていない場合は透明度を0に戻す
            statusFadeAnim.setValue(0);
        }
    }, [selectedAttributes['living'], statusFadeAnim]);
    // オプションテキストとボーダーのフェードインアニメーションスタイル
    var optionFadeStyle = { opacity: statusFadeAnim };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_native_1.ScrollView, { contentContainerStyle: styles.content }, Object.entries(attributes).map(function (_a, index) {
            var category = _a[0], options = _a[1];
            // statusカテゴリの場合はstatusFadeAnimを使用
            var fadeAnimationStyle = category === 'status' ? { opacity: statusFadeAnim } : {};
            // カテゴリの属性ボタンをレンダリング
            var categoryElements = (react_1["default"].createElement(react_native_1.Animated.View, { key: category, style: [
                    styles.wrap,
                    fadeAnimationStyle,
                    { display: options.length > 0 ? 'flex' : 'none' }
                ] }, options.map(function (attribute) { return (react_1["default"].createElement(AttributeBtn_1["default"], { key: attribute, title: attribute, onPress: function () { return handleAttributePress(category, attribute); }, selected: selectedAttributes[category] === attribute })); })));
            // livingカテゴリの後にオプションテキストとボーダーを挿入
            if (category === 'living') {
                return (react_1["default"].createElement(react_1["default"].Fragment, { key: "livingFragment" },
                    categoryElements,
                    selectedAttributes['living'] && (react_1["default"].createElement(react_native_1.Animated.View, { style: [optionFadeStyle, styles.option] },
                        react_1["default"].createElement(react_native_1.Text, { style: styles.optionText }, "\u30AA\u30D7\u30B7\u30E7\u30F3"),
                        react_1["default"].createElement(react_native_1.View, { style: styles.separator })))));
            }
            else {
                return categoryElements;
            }
        }))));
}
exports["default"] = registerInput1;
var styles = react_native_1.StyleSheet.create({
    content: {
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 16,
        backgroundColor: "#fff",
        padding: 16
    },
    wrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        // flex: 1,
        backgroundColor: "#fff",
        flexGrow: 1
    },
    attributeBtn: {
        backgroundColor: "#fff",
        borderColor: "#333",
        borderWidth: 3,
        width: buttonSize,
        height: buttonSize,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionText: {
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#888'
    },
    separator: {
        flex: 1,
        height: 1,
        marginTop: 4,
        marginBottom: 4,
        backgroundColor: '#888'
    }
});
