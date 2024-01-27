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
var bottom_sheet_1 = require("@gorhom/bottom-sheet");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_1 = require("react-native");
var Btn_1 = require("components/Btn");
var TempChild_1 = require("components/TempChild");
var Stack = native_stack_1.createNativeStackNavigator();
var width = react_native_1.Dimensions.get('window').width;
// ボタンの幅（または高さ）を計算
var buttonSize = width / 2 - 16 - 8; // 画面幅の半分から余白とマージンを引いた値
function registerInput2(_a) {
    var setIsButtonDisabled = _a.setIsButtonDisabled;
    var bottomSheetModalRef = react_2.useRef(null);
    var _b = react_2.useState([{ name: '洗濯', count: 3 }, { name: '掃除', count: 1 }]), tasks = _b[0], setTasks = _b[1];
    var _c = react_2.useState(null), activeTaskIndex = _c[0], setActiveTaskIndex = _c[1];
    var handlePresentModalPress = react_2.useCallback(function (index) {
        var _a;
        setActiveTaskIndex(index);
        (_a = bottomSheetModalRef.current) === null || _a === void 0 ? void 0 : _a.present();
    }, []);
    var incrementCount = function () {
        setTasks(function (prevTasks) { return prevTasks.map(function (task, i) { return i === activeTaskIndex ? __assign(__assign({}, task), { count: task.count + 1 }) : task; }); });
    };
    var decrementCount = function () {
        setTasks(function (prevTasks) { return prevTasks.map(function (task, i) { return i === activeTaskIndex ? __assign(__assign({}, task), { count: task.count > 0 ? task.count - 1 : 0 }) : task; }); });
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_native_gesture_handler_1.GestureHandlerRootView, { style: { flex: 1 } },
            react_1["default"].createElement(bottom_sheet_1.BottomSheetModalProvider, null,
                react_1["default"].createElement(react_native_1.ScrollView, { contentContainerStyle: styles.content }, tasks.map(function (task, index) { return (react_1["default"].createElement(TempChild_1["default"], { key: index, count: task.count, todo: task.name, onEditPress: function () { return handlePresentModalPress(index); } })); })),
                react_1["default"].createElement(bottom_sheet_1.BottomSheetModal, { detached: true, ref: bottomSheetModalRef, index: 0, snapPoints: ['25%'], backgroundStyle: {
                        borderBottomEndRadius: 0,
                        borderBottomStartRadius: 0,
                        backgroundColor: '#fff',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 0
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 6,
                        elevation: 5
                    } },
                    react_1["default"].createElement(react_native_1.View, { style: styles.modalContainer }, activeTaskIndex !== null && (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(Btn_1["default"], { title: '-', prev: true, style: { width: 60, height: 60 }, onPress: decrementCount }),
                        react_1["default"].createElement(react_native_1.View, { style: styles.modalCounter },
                            react_1["default"].createElement(react_native_1.Text, { style: styles.modalCounterText }, tasks[activeTaskIndex].count)),
                        react_1["default"].createElement(Btn_1["default"], { title: '+', style: { width: 60, height: 60 }, onPress: incrementCount })))))))));
}
exports["default"] = registerInput2;
var styles = react_native_1.StyleSheet.create({
    content: {
        // flexDirection: "row",
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
    modalContainer: {
        flexDirection: 'row',
        // backgroundColor: '#ddd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalCounter: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalCounterText: {
        fontSize: 36,
        fontWeight: "600",
        color: "#333",
        textAlign: 'center'
    }
});
