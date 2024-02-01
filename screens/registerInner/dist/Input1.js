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
var ImagePicker = require("expo-image-picker");
var supabase_1 = require("utils/supabase");
var buffer_1 = require("buffer");
var FileSystem = require("expo-file-system");
var expo_asset_1 = require("expo-asset");
var ImageManipulator = require("expo-image-manipulator");
var react_native_1 = require("react-native");
var UserInfoProvider_1 = require("components/UserInfoProvider");
function registerInput1() {
    var _this = this;
    var _a = UserInfoProvider_1.useUserInfo(), userInfo = _a.userInfo, setUserInfo = _a.setUserInfo;
    var _b = react_1.useState(userInfo === null || userInfo === void 0 ? void 0 : userInfo.username), userName = _b[0], setUserName = _b[1];
    var _c = react_1.useState(userInfo === null || userInfo === void 0 ? void 0 : userInfo.avatar_url), userImage = _c[0], setUserImage = _c[1];
    var userId = userInfo === null || userInfo === void 0 ? void 0 : userInfo.id;
    react_1.useEffect(function () {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(react_native_1.Platform.OS !== 'web')) return [3 /*break*/, 2];
                        return [4 /*yield*/, ImagePicker.requestMediaLibraryPermissionsAsync()];
                    case 1:
                        status = (_a.sent()).status;
                        if (status !== 'granted') {
                            react_native_1.Alert.alert('Sorry, we need camera roll permissions to make this work!');
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    var pickImage = function () { return __awaiter(_this, void 0, void 0, function () {
        var result, manipResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1
                    })];
                case 1:
                    result = _a.sent();
                    if (!!result.canceled) return [3 /*break*/, 3];
                    return [4 /*yield*/, ImageManipulator.manipulateAsync(result.assets[0].uri, [{ resize: { width: 500, height: 500 } }], { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG })];
                case 2:
                    manipResult = _a.sent();
                    setUserImage(manipResult.uri);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var updateUserInfo = function () { return __awaiter(_this, void 0, void 0, function () {
        var fileExtension, contentType, asset, base64Data, binaryData, base64Prefix, _a, uploadData, uploadError, urlData, now, _b, data, error, _c, updatedUserInfo, fetchError;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    fileExtension = userImage.split('.').pop();
                    contentType = "image/" + fileExtension;
                    asset = expo_asset_1.Asset.fromURI(userImage);
                    return [4 /*yield*/, asset.downloadAsync()];
                case 1:
                    _d.sent();
                    return [4 /*yield*/, FileSystem.readAsStringAsync(asset.localUri, { encoding: FileSystem.EncodingType.Base64 })];
                case 2:
                    base64Data = _d.sent();
                    binaryData = buffer_1.Buffer.from(base64Data, 'base64');
                    base64Prefix = 'data:image/${fileExtension};base64,';
                    if (base64Data.startsWith(base64Prefix)) {
                        base64Data = base64Data.substring(base64Prefix.length);
                    }
                    return [4 /*yield*/, supabase_1.supabase
                            .storage
                            .from('avatars')
                            .upload(userId + "." + fileExtension, binaryData, { contentType: contentType, upsert: true })];
                case 3:
                    _a = _d.sent(), uploadData = _a.data, uploadError = _a.error;
                    if (uploadError) {
                        console.log("userId:", userId);
                        console.error('Error uploading image:', uploadError);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, supabase_1.supabase
                            .storage
                            .from('avatars')
                            .getPublicUrl(userId + "." + fileExtension)];
                case 4:
                    urlData = (_d.sent()).data;
                    now = new Date();
                    return [4 /*yield*/, supabase_1.supabase
                            .from('profiles')
                            .update({ username: userName, avatar_url: urlData.publicUrl, updated_at: now })
                            .eq('id', userId)];
                case 5:
                    _b = _d.sent(), data = _b.data, error = _b.error;
                    if (error) {
                        console.error('Error updating user info:', error);
                    }
                    else {
                        console.log('User info updated:', data);
                    }
                    return [4 /*yield*/, supabase_1.supabase
                            .from('profiles')
                            .select('*')
                            .eq('id', userId)
                            .single()];
                case 6:
                    _c = _d.sent(), updatedUserInfo = _c.data, fetchError = _c.error;
                    if (fetchError) {
                        console.log("userId:", userId);
                        console.error('Error fetching updated user info:', fetchError);
                        return [2 /*return*/];
                    }
                    // ローカルの状態を更新
                    setUserInfo(updatedUserInfo);
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_native_1.View, { style: styles.content },
            react_1["default"].createElement(react_native_1.TextInput, { value: userName, onChangeText: setUserName }),
            react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: pickImage },
                react_1["default"].createElement(react_native_1.Image, { source: { uri: userImage }, style: styles.userImage })),
            react_1["default"].createElement(react_native_1.Button, { title: "Update Info", onPress: updateUserInfo }))));
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
