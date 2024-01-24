"use strict";

exports.__esModule = true;

var react_1 = require("react");

var react_native_1 = require("react-native");

var native_stack_1 = require("@react-navigation/native-stack");

var react_navigation_1 = require("react-native-paper/react-navigation");

var react_native_safe_area_context_1 = require("react-native-safe-area-context");

var Stack = native_stack_1.createNativeStackNavigator();
var Tab = react_navigation_1.createMaterialBottomTabNavigator();

var Home_1 = require("screens/MainInner/Home");

var Tasks_1 = require("screens/MainInner/Tasks");

function Main() {
  return react_1["default"].createElement(react_native_safe_area_context_1.SafeAreaView, {
    style: {
      flex: 1,
      backgroundColor: '#fff'
    },
    edges: ['right', 'top', 'left']
  }, react_1["default"].createElement(Tab.Navigator, null, react_1["default"].createElement(Tab.Screen, {
    name: "Top",
    component: Home_1["default"],
    options: {
      title: 'ホーム'
    }
  }), react_1["default"].createElement(Tab.Screen, {
    name: "Tasks",
    component: Tasks_1["default"],
    options: {
      title: 'タスク'
    }
  })));
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