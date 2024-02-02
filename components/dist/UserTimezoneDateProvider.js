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
exports.useUserTimezoneDateFormatter = exports.UserTimezoneDateProvider = void 0;
var react_1 = require("react");
var Localization = require("expo-localization");
// コンテキストの作成
var UserTimezoneDateFormatterContext = react_1.createContext({
    formatAndSaveDate: function () { },
    formattedDates: {}
});
exports.UserTimezoneDateProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState({}), formattedDates = _b[0], setFormattedDates = _b[1];
    var formatAndSaveDate = function (dateString) { return __awaiter(void 0, void 0, void 0, function () {
        var formatted_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!formattedDates[dateString]) return [3 /*break*/, 2];
                    return [4 /*yield*/, formatCreatedAt(dateString)];
                case 1:
                    formatted_1 = _a.sent();
                    setFormattedDates(function (prev) {
                        var _a;
                        return (__assign(__assign({}, prev), (_a = {}, _a[dateString] = formatted_1, _a)));
                    });
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var cachedTimezone = undefined;
    function getUserTimezone() {
        var _a, _b;
        return __awaiter(this, void 0, Promise, function () {
            var calendars;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!cachedTimezone) return [3 /*break*/, 2];
                        return [4 /*yield*/, Localization.getCalendars()];
                    case 1:
                        calendars = _c.sent();
                        cachedTimezone = (_b = (_a = calendars[0]) === null || _a === void 0 ? void 0 : _a.timeZone) !== null && _b !== void 0 ? _b : undefined;
                        _c.label = 2;
                    case 2: return [2 /*return*/, cachedTimezone];
                }
            });
        });
    }
    var formatCreatedAt = function (createdAt) { return __awaiter(void 0, void 0, void 0, function () {
        var userTimezone, date, formatter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserTimezone()];
                case 1:
                    userTimezone = _a.sent();
                    date = new Date(createdAt);
                    formatter = new Intl.DateTimeFormat('default', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        timeZone: userTimezone
                    });
                    return [2 /*return*/, formatter.format(date)];
            }
        });
    }); };
    return (react_1["default"].createElement(UserTimezoneDateFormatterContext.Provider, { value: { formatAndSaveDate: formatAndSaveDate, formattedDates: formattedDates } }, children));
};
exports.useUserTimezoneDateFormatter = function () {
    var context = react_1.useContext(UserTimezoneDateFormatterContext);
    if (!context) {
        throw new Error('useUserInfo must be used within a UserInfoProvider');
    }
    return context;
};
