"use strict";
exports.__esModule = true;
exports.useUserInfo = exports.UserInfoProvider = void 0;
var react_1 = require("react");
// コンテキストの作成
var UserInfoContext = react_1.createContext({
    userInfo: null,
    setUserInfo: function () { }
});
// プロバイダーコンポーネントの作成
exports.UserInfoProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(null), userInfo = _b[0], setUserInfo = _b[1];
    react_1.useEffect(function () {
        console.log('userInfoが更新されました:', userInfo);
    }, [userInfo]);
    return (react_1["default"].createElement(UserInfoContext.Provider, { value: { userInfo: userInfo, setUserInfo: setUserInfo } }, children));
};
// コンテキストを使用するためのカスタムフック
exports.useUserInfo = function () {
    var context = react_1.useContext(UserInfoContext);
    if (!context) {
        throw new Error('useUserInfo must be used within a UserInfoProvider');
    }
    return context;
};
