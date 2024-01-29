"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var google_signin_1 = require("@react-native-google-signin/google-signin");
var supabase_1 = require("utils/supabase");
function default_1(_a) {
    var _this = this;
    var navigation = _a.navigation;
    google_signin_1.GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid'],
        iosClientId: '679833251993-p0scalicgumkfp665pgcmhol5cvsri0d.apps.googleusercontent.com'
    });
    return (react_1["default"].createElement(google_signin_1.GoogleSigninButton, { size: google_signin_1.GoogleSigninButton.Size.Wide, color: google_signin_1.GoogleSigninButton.Color.Dark, onPress: function () { return __awaiter(_this, void 0, void 0, function () {
            var userInfo, _a, data, error, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, google_signin_1.GoogleSignin.hasPlayServices()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, google_signin_1.GoogleSignin.signIn()];
                    case 2:
                        userInfo = _b.sent();
                        if (!userInfo.idToken) return [3 /*break*/, 4];
                        return [4 /*yield*/, supabase_1.supabase.auth.signInWithIdToken({
                                provider: 'google',
                                token: userInfo.idToken
                            })
                            // console.log(error, data)
                        ];
                    case 3:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        // console.log(error, data)
                        if (!error) {
                            userInfo.user.id = data.user.id;
                            navigation.navigate('Register', { userInfo: userInfo });
                        }
                        return [3 /*break*/, 5];
                    case 4: throw new Error('no ID token present!');
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        if (error_1.code === google_signin_1.statusCodes.SIGN_IN_CANCELLED) {
                            // user cancelled the login flow
                        }
                        else if (error_1.code === google_signin_1.statusCodes.IN_PROGRESS) {
                            // operation (e.g. sign in) is in progress already
                        }
                        else if (error_1.code === google_signin_1.statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                            // play services not available or outdated
                        }
                        else {
                            // some other error happened
                        }
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); } }));
}
exports["default"] = default_1;
