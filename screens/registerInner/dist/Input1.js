"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var width = react_native_1.Dimensions.get('window').width;
// ボタンの幅（または高さ）を計算
var buttonSize = width / 2 - 16 - 8; // 画面幅の半分から余白とマージンを引いた値
function registerInput1(_a) {
    var _b, _c, _d;
    var userInfo = _a.userInfo, setUserInfo = _a.setUserInfo;
    // ユーザー名と画像URLを取得
    var userName = (_b = userInfo === null || userInfo === void 0 ? void 0 : userInfo.user) === null || _b === void 0 ? void 0 : _b.name;
    var userImage = (_c = userInfo === null || userInfo === void 0 ? void 0 : userInfo.user) === null || _c === void 0 ? void 0 : _c.photo;
    var userId = (_d = userInfo === null || userInfo === void 0 ? void 0 : userInfo.user) === null || _d === void 0 ? void 0 : _d.id;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_native_1.View, { style: styles.content },
            react_1["default"].createElement(react_native_1.Text, null, userName),
            react_1["default"].createElement(react_native_1.Text, null, userId),
            react_1["default"].createElement(react_native_1.Image, { source: { uri: userImage }, style: styles.userImage }))));
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
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50
    }
});
