"use strict";
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
function Main() {
    return (react_1["default"].createElement(react_native_safe_area_context_1.SafeAreaView, { style: { flex: 1, backgroundColor: '#fff' }, edges: ['right', 'top', 'left'] },
        react_1["default"].createElement(Tab.Navigator
        // initialRouteName="Home"
        , { 
            // initialRouteName="Home"
            screenOptions: { headerShown: false, tabBarActiveTintColor: '#44c951' } },
            react_1["default"].createElement(Tab.Screen, { name: "Home", component: Home_1["default"], 
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
                } }))));
}
exports["default"] = Main;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    },
    screen: {
        flex: 1,
        backgroundColor: "#fff"
    }
});
