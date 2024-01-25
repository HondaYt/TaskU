"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Tasks = function () {
    var _a = react_1.useState([]), tasks = _a[0], setTasks = _a[1];
    var _b = react_1.useState(''), input = _b[0], setInput = _b[1];
    var handleAddTask = function () {
        setTasks(__spreadArrays(tasks, [input]));
        setInput('');
    };
    var handleDeleteTask = function (index) {
        setTasks(tasks.filter(function (task, i) { return i !== index; }));
    };
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(react_native_1.TextInput, { style: styles.input, value: input, onChangeText: setInput, placeholder: "\u65B0\u3057\u3044\u30BF\u30B9\u30AF\u3092\u5165\u529B" }),
        react_1["default"].createElement(react_native_1.Button, { title: "\u30BF\u30B9\u30AF\u3092\u8FFD\u52A0", onPress: handleAddTask }),
        react_1["default"].createElement(react_native_1.FlatList, { data: tasks, keyExtractor: function (item, index) { return index.toString(); }, renderItem: function (_a) {
                var item = _a.item, index = _a.index;
                return (react_1["default"].createElement(react_native_1.View, { style: styles.task },
                    react_1["default"].createElement(react_native_1.Text, null, item),
                    react_1["default"].createElement(react_native_1.Button, { title: "\u524A\u9664", onPress: function () { return handleDeleteTask(index); } })));
            } })));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#fff"
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10
    },
    task: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    }
});
exports["default"] = Tasks;
