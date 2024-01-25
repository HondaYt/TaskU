"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var Timer_1 = require("components/Timer");
var CurrentTask_1 = require("components/CurrentTask");
var NextTask_1 = require("components/NextTask");
var FreeTime_svg_1 = require("img/FreeTime.svg");
var Stack = native_stack_1.createNativeStackNavigator();
function Home(_a) {
    var setIsTimerZero = _a.setIsTimerZero;
    var currentDate = new Date();
    var daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
    return (react_1["default"].createElement(react_native_1.View, { style: { backgroundColor: '#fff' } },
        react_1["default"].createElement(react_native_1.ScrollView, { contentContainerStyle: styles.content },
            react_1["default"].createElement(react_native_1.View, { style: styles.homeHeader },
                react_1["default"].createElement(react_native_1.View, { style: styles.headerTextWrap },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.headerText }, "\u304A\u306F\u3088\u3046\u3054\u3056\u3044\u307E\u3059"),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.headerText },
                        "\u4ECA\u65E5\u306F",
                        react_1["default"].createElement(react_native_1.Text, { style: styles.date },
                            currentDate.getFullYear(),
                            ".",
                            currentDate.getMonth() + 1,
                            ".",
                            currentDate.getDate(),
                            " ",
                            daysOfWeek[currentDate.getDay()],
                            "\u66DC\u65E5"))),
                react_1["default"].createElement(react_native_1.View, { style: styles.userIcon },
                    react_1["default"].createElement(vector_icons_1.Octicons, { name: "person", size: 30, color: "#fff" }))),
            react_1["default"].createElement(react_native_1.Text, { style: styles.sectionTtl }, "\u4ECA\u65E5\u306E\u6B8B\u308A\u6642\u9593"),
            react_1["default"].createElement(Timer_1["default"], { setIsTimerZero: setIsTimerZero }),
            react_1["default"].createElement(react_native_1.View, { style: { height: 450, justifyContent: 'center', alignItems: 'center', gap: 8 } },
                react_1["default"].createElement(FreeTime_svg_1["default"], { height: 200, width: 200 }),
                react_1["default"].createElement(react_native_1.Text, { style: { textAlign: 'center', fontSize: 20, fontWeight: 'bold', lineHeight: 28 } },
                    "\u4ECA\u65E5\u4E88\u5B9A\u3055\u308C\u3066\u3044\u305F",
                    "\n",
                    "\u30BF\u30B9\u30AF\u306F\u5B8C\u4E86\u3057\u307E\u3057\u305F\uFF01")),
            react_1["default"].createElement(react_native_1.View, null,
                react_1["default"].createElement(react_native_1.Text, { style: styles.sectionTtl }, "\u73FE\u5728\u306E\u30BF\u30B9\u30AF"),
                react_1["default"].createElement(CurrentTask_1["default"], { taskGenre: 'HTML', taskTtl: 'Work06', taskDeadline: '2024.9.27', taskImportance: '\u9AD8' }),
                react_1["default"].createElement(react_native_1.Text, { style: styles.sectionTtl }, "\u4ECA\u65E5\u306E\u30BF\u30B9\u30AF"),
                react_1["default"].createElement(react_native_1.View, { style: { gap: 16 } },
                    react_1["default"].createElement(NextTask_1["default"], { taskGenre: 'PhotoShop', taskTtl: '\u30AD\u30E3\u30E9\u30AF\u30BF\u30FC\u7D39\u4ECB', taskDeadline: '2024.10.06', taskImportance: '\u4E2D' }),
                    react_1["default"].createElement(NextTask_1["default"], { taskGenre: 'Illustrator', taskTtl: '\u30AB\u30EC\u30F3\u30C0\u30FC', taskDeadline: '2024.10.02', taskImportance: '\u4F4E' }),
                    react_1["default"].createElement(NextTask_1["default"], { taskGenre: 'Illustrator', taskTtl: '\u30AB\u30EC\u30F3\u30C0\u30FC', taskDeadline: '2024.10.02', taskImportance: '\u4F4E' }),
                    react_1["default"].createElement(NextTask_1["default"], { taskGenre: '\u5BB6\u4E8B', taskTtl: '\u6D17\u6FEF\u3059\u308B', taskDeadline: '2024.10.27', taskImportance: '\u4E2D' }))))));
}
exports["default"] = Home;
var styles = react_native_1.StyleSheet.create({
    userIcon: {
        width: 48,
        height: 48,
        borderRadius: 50,
        backgroundColor: '#61c2d5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        // flexDirection: "row",
        // flexWrap: "wrap",
        backgroundColor: "#fff",
        padding: 16,
        paddingBottom: 90
    },
    homeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTextWrap: {
        gap: 4
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    date: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    sectionTtl: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 8
    },
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
        fontWeight: 'bold'
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
