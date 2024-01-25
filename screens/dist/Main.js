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
var react_native_1 = require("react-native");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var Stack = native_stack_1.createNativeStackNavigator();
var Home_1 = require("screens/MainInner/Home");
var Tasks_1 = require("screens/MainInner/Tasks");
var History_1 = require("screens/MainInner/History");
var vector_icons_1 = require("@expo/vector-icons");
var bottom_tabs_1 = require("@react-navigation/bottom-tabs");
var Tab = bottom_tabs_1.createBottomTabNavigator();
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var bottom_sheet_1 = require("@gorhom/bottom-sheet");
var react_native_paper_1 = require("react-native-paper");
var BedTime_svg_1 = require("img/BedTime.svg");
function Main() {
    var bottomSheetModalRef = react_1.useRef(null);
    var _a = react_1.useState(false), isTimerZero = _a[0], setIsTimerZero = _a[1];
    react_1.useEffect(function () {
        var _a;
        if (isTimerZero) {
            (_a = bottomSheetModalRef.current) === null || _a === void 0 ? void 0 : _a.present();
        }
    }, [isTimerZero]);
    var renderBackdrop = react_1.useCallback(function (props) { return (react_1["default"].createElement(bottom_sheet_1.BottomSheetBackdrop, __assign({}, props, { disappearsOnIndex: -1, appearsOnIndex: 0 }))); }, []);
    return (react_1["default"].createElement(react_native_gesture_handler_1.GestureHandlerRootView, { style: { flex: 1 } },
        react_1["default"].createElement(bottom_sheet_1.BottomSheetModalProvider, null,
            react_1["default"].createElement(react_native_safe_area_context_1.SafeAreaView, { style: { flex: 1, backgroundColor: '#fff' }, edges: ['right', 'top', 'left'] },
                react_1["default"].createElement(Tab.Navigator, { screenOptions: { headerShown: false, tabBarActiveTintColor: '#44c951' } },
                    react_1["default"].createElement(Tab.Screen, { name: "Home", 
                        // component={Home}
                        children: function () { return react_1["default"].createElement(Home_1["default"], { setIsTimerZero: setIsTimerZero }); }, 
                        // iconを追加
                        options: {
                            tabBarLabel: 'ホーム',
                            tabBarIcon: function (_a) {
                                var color = _a.color;
                                return (react_1["default"].createElement(vector_icons_1.Octicons, { name: "home", size: 24, color: color }));
                            }
                        } }),
                    react_1["default"].createElement(Tab.Screen, { name: "Tasks", component: Tasks_1["default"], options: {
                            tabBarLabel: 'タスク',
                            tabBarIcon: function (_a) {
                                var color = _a.color;
                                return (react_1["default"].createElement(vector_icons_1.Octicons, { name: "paste", size: 24, color: color }));
                            }
                        } }),
                    react_1["default"].createElement(Tab.Screen, { name: "History", component: History_1["default"], options: {
                            tabBarLabel: '履歴',
                            tabBarIcon: function (_a) {
                                var color = _a.color;
                                return (react_1["default"].createElement(vector_icons_1.Octicons, { name: "history", size: 24, color: color }));
                            }
                        } }))),
            react_1["default"].createElement(react_native_paper_1.FAB, { style: styles.fab, icon: "plus", color: "#fff", onPress: function () { return console.log('Pressed'); } }),
            react_1["default"].createElement(bottom_sheet_1.BottomSheetModal, { ref: bottomSheetModalRef, index: 0, snapPoints: ['32%'], backdropComponent: renderBackdrop, style: { alignItems: 'center', justifyContent: 'center' } },
                react_1["default"].createElement(react_native_1.View, null,
                    react_1["default"].createElement(react_native_1.Text, { style: { textAlign: 'center', fontSize: 20, fontWeight: 'bold' } }, "\u5C31\u5BDD\u6642\u9593\u306B\u306A\u308A\u307E\u3057\u305F\u3002"),
                    react_1["default"].createElement(BedTime_svg_1["default"], { width: 200, height: 200 }))))));
}
exports["default"] = Main;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    },
    screen: {
        flex: 1,
        backgroundColor: "#fff"
    },
    fab: {
        backgroundColor: '#764bda',
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 64 + 16
    }
});
