"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var Btn_1 = require("components/Btn");
var Stack = native_stack_1.createNativeStackNavigator();
function CurrentTask(props) {
    var taskImportance = props.taskImportance;
    // 重要度によって色を変える
    var importanceColor;
    if (taskImportance === '高') {
        importanceColor = '#dc3333'; // 赤色
    }
    else if (taskImportance === '中') {
        importanceColor = '#b17b15'; // オレンジ色
    }
    else if (taskImportance === '低') {
        importanceColor = '#22bb22'; // 緑色
    }
    else {
        importanceColor = '#888'; // デフォルト色
    }
    return (react_1["default"].createElement(react_native_1.View, { style: styles.currentTask },
        react_1["default"].createElement(react_native_1.View, { style: { flexDirection: "row", alignItems: "flex-end", justifyContent: 'space-between' } },
            react_1["default"].createElement(react_native_1.View, null,
                react_1["default"].createElement(react_native_1.Text, { style: styles.taskGenre }, props.taskGenre),
                react_1["default"].createElement(react_native_1.Text, { style: styles.taskTtl }, props.taskTtl)),
            react_1["default"].createElement(react_native_1.View, null,
                react_1["default"].createElement(react_native_1.View, { style: [styles.TaskDetail] },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.DetailTtl }, "\u91CD\u8981\u5EA6:"),
                    react_1["default"].createElement(react_native_1.View, { style: [styles.taskImportanceWrap, { backgroundColor: importanceColor }] },
                        react_1["default"].createElement(react_native_1.Text, { style: styles.taskImportance }, props.taskImportance))),
                react_1["default"].createElement(react_native_1.View, { style: styles.TaskDetail },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.DetailTtl }, "\u671F\u9650:"),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.taskDeadline }, props.taskDeadline)))),
        react_1["default"].createElement(react_native_1.View, { style: styles.btnContainer },
            react_1["default"].createElement(Btn_1["default"], { title: "\u5B8C\u4E86", style: { flex: 1, backgroundColor: '#764bda' }, onPress: function () { } }),
            react_1["default"].createElement(Btn_1["default"], { title: "\u5F8C\u306B\u56DE\u3059", style: { width: 100, backgroundColor: '#888' }, onPress: function () { } }))));
}
exports["default"] = CurrentTask;
var styles = react_native_1.StyleSheet.create({
    currentTask: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#ccc',
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 0
        }
    },
    taskGenre: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555'
    },
    taskTtl: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    TaskDetail: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    DetailTtl: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
        marginRight: 4
    },
    taskImportanceWrap: {
        width: 20,
        height: 20,
        backgroundColor: '#f74848',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    taskImportance: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    taskDeadline: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        gap: 8
    }
});
