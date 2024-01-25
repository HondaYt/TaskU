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
var react_1 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var Stack = native_stack_1.createNativeStackNavigator();
function InsetShadow(props) {
    var shadows = Array(5).fill(null);
    return (react_1["default"].createElement(react_native_1.View, { style: styles.insetShadow },
        react_1["default"].createElement(react_native_1.View, { style: styles.shadowBase },
            shadows.map(function (_, index) { return (react_1["default"].createElement(react_native_1.View, { key: index, style: styles.shadow })); }),
            react_1["default"].createElement(react_native_1.View, { style: [styles.contentContainer, __assign({}, props.containerStyle)] }, props.children))));
}
exports["default"] = InsetShadow;
var styles = react_native_1.StyleSheet.create({
    contentContainer: {
        flex: 1
    },
    insetShadow: {
        // margin: 8,
        position: 'relative',
        height: '100%',
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    shadowBase: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ccc',
        borderRadius: 16
    },
    shadow: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        margin: 6,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#fff',
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 0
        }
    }
});
