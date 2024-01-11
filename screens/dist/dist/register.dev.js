"use strict";

exports.__esModule = true;

var react_1 = require("react");

var react_2 = require("react");

var native_stack_1 = require("@react-navigation/native-stack");

var react_native_1 = require("react-native");

var input1_1 = require("screens/registerInner/input1");

var input2_1 = require("screens/registerInner/input2");

var input3_1 = require("screens/registerInner/input3");

var btn_1 = require("components/btn");

var registerIndicator_1 = require("components/registerIndicator");

var Stack = native_stack_1.createNativeStackNavigator();

function Register() {
  // コンテンツのリストを定義
  var contents = [react_1["default"].createElement(input1_1["default"], null), react_1["default"].createElement(input2_1["default"], null), react_1["default"].createElement(input3_1["default"], null)]; // 現在のコンテンツのインデックスを追跡するための状態

  var _a = react_2.useState(0),
      currentIndex = _a[0],
      setCurrentIndex = _a[1]; // 次のコンテンツに切り替える関数


  var handleNext = function handleNext() {
    setCurrentIndex(function (prevIndex) {
      // 最後のコンテンツに達したらそれ以上インデックスを増やさない
      var nextIndex = prevIndex + 1;
      return nextIndex < contents.length ? nextIndex : prevIndex;
    });
  };

  var handlePrev = function handlePrev() {
    setCurrentIndex(function (prevIndex) {
      // 最初のコンテンツに達したらそれ以上インデックスを減らさない
      var nextIndex = prevIndex - 1;
      return nextIndex >= 0 ? nextIndex : prevIndex;
    });
  };

  return react_1["default"].createElement(react_1["default"].Fragment, null, react_1["default"].createElement(registerIndicator_1["default"], {
    progress: currentIndex / contents.length
  }), react_1["default"].createElement(react_native_1.View, {
    style: styles.content
  }, contents[currentIndex]), react_1["default"].createElement(react_native_1.View, {
    style: styles.btnContainer
  }, currentIndex <= 0 ? null : react_1["default"].createElement(btn_1["default"], {
    prev: true,
    title: "\u623B\u308B",
    onPress: handlePrev
  }), react_1["default"].createElement(btn_1["default"], {
    title: "\u6B21\u3078\u9032\u3080",
    style: {
      flex: 1
    },
    onPress: handleNext
  })));
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