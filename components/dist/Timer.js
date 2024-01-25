"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("react");
var react_native_1 = require("react-native");
var InsetShadow_1 = require("components/InsetShadow");
function Timer(_a) {
    var setIsTimerZero = _a.setIsTimerZero;
    var initialTime = 0.005 * 60 * 60; // 初期値は0.1時間（秒単位）
    var _b = react_2.useState(initialTime), time = _b[0], setTime = _b[1];
    var _c = react_2.useState(100), width = _c[0], setWidth = _c[1]; // 初期値は100
    react_2.useEffect(function () {
        var timerId = setInterval(function () {
            setTime(function (prevTime) {
                if (prevTime <= 1) {
                    clearInterval(timerId); // 残り時間が0になったらタイマーを停止
                    setTimeout(function () {
                        setIsTimerZero(true); // 残り時間が0になったら、setIsTimerZeroを呼び出す
                        setWidth(0);
                    }, 0);
                    return 0;
                }
                var newTime = prevTime - 1;
                var newWidth = (newTime / initialTime) * 100; // 残り時間に応じてwidthを計算
                setWidth(newWidth);
                return newTime;
            });
        }, 1000); // 1秒ごとに時間を減らす
        return function () {
            clearInterval(timerId); // コンポーネントがアンマウントされるときにタイマーをクリア
        };
    }, []);
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time % 3600) / 60);
    var seconds = time % 60;
    var formatTime = function (time) { return time < 10 ? "0" + time : "" + time; };
    var remaining = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
    return (react_1["default"].createElement(react_native_1.View, { style: styles.timer },
        react_1["default"].createElement(InsetShadow_1["default"], { containerStyle: { alignItems: 'flex-end', position: 'relative', justifyContent: 'center' } },
            react_1["default"].createElement(react_native_1.View, { style: [styles.remaining, { width: width + "%" }] },
                react_1["default"].createElement(react_native_1.View, { style: { width: 150 } },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.remainingText }, remaining))),
            react_1["default"].createElement(react_native_1.View, { style: { width: 150, position: 'absolute', zIndex: -1 } },
                react_1["default"].createElement(react_native_1.Text, { style: [styles.remainingText, { color: '#67DD73' }] }, remaining)))));
}
exports["default"] = Timer;
var styles = react_native_1.StyleSheet.create({
    timer: {
        height: 72,
        width: '100%'
    },
    remaining: {
        overflow: 'hidden',
        // position: 'absolute',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#67DD73',
        borderEndEndRadius: 16,
        borderTopEndRadius: 16
    },
    remainingText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    content: {
        flex: 1,
        borderRadius: 10
    },
    insetShadow: {
        position: 'relative',
        height: 60,
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
        backgroundColor: 'rgba(0,0,0,0.1)',
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
        borderRadius: 10,
        shadowColor: '#fff',
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 0
        }
    }
});
