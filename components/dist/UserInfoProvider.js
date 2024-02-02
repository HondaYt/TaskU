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
exports.useUserInfo = exports.UserInfoProvider = void 0;
var react_1 = require("react");
// コンテキストの作成
var UserInfoContext = react_1.createContext({
    userInfo: null,
    setUserInfo: function () { },
    updateUserInfo: function (newData) { },
    getAvatarUrl: function () { return undefined; }
});
exports.UserInfoProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(null), userInfo = _b[0], setUserInfo = _b[1];
    // userInfoを更新する関数
    var updateUserInfo = function (newData) {
        setUserInfo(function (prevUserInfo) {
            // prevUserInfoがnullの場合にデフォルト値を提供
            var defaultUserInfo = __assign({ id: '', avatar_url: '', updated_at: '', username: '' }, prevUserInfo // prevUserInfoの値で上書き
            );
            return __assign(__assign({}, defaultUserInfo), newData);
        });
    };
    // アバターURLを取得する関数
    var getAvatarUrl = function () {
        if (!(userInfo === null || userInfo === void 0 ? void 0 : userInfo.avatar_url))
            return undefined;
        return userInfo.avatar_url + "?timestamp=" + new Date().getTime();
    };
    return (react_1["default"].createElement(UserInfoContext.Provider, { value: { userInfo: userInfo, setUserInfo: setUserInfo, updateUserInfo: updateUserInfo, getAvatarUrl: getAvatarUrl } }, children));
};
// コンテキストを使用するためのカスタムフック
exports.useUserInfo = function () {
    var context = react_1.useContext(UserInfoContext);
    if (!context) {
        throw new Error('useUserInfo must be used within a UserInfoProvider');
    }
    return context;
};
