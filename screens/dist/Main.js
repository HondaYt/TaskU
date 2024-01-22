"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var native_stack_1 = require("@react-navigation/native-stack");
var react_navigation_1 = require("react-native-paper/react-navigation");
var Stack = native_stack_1.createNativeStackNavigator();
var Tab = react_navigation_1.createMaterialBottomTabNavigator();
var Top_1 = require("screens/MainInner/Top");
var Tasks_1 = require("screens/MainInner/Tasks");
function Main() {
    return (react_1["default"].createElement(Tab.Navigator, { screenOptions: {
        // headerShown: false,
        // gestureEnabled: false,
        } },
        react_1["default"].createElement(Tab.Screen, { name: "Top", component: Top_1["default"] }),
        react_1["default"].createElement(Tab.Screen, { name: "Tasks", component: Tasks_1["default"] })));
}
exports["default"] = Main;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    screen: {
        flex: 1,
        backgroundColor: "#fff"
    }
});
