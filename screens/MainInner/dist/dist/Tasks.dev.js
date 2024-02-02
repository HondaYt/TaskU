"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;

var react_1 = require("react");

var react_native_1 = require("react-native");

var supabase_1 = require("utils/supabase");

var UserInfoProvider_1 = require("components/UserInfoProvider");

var UserTimezoneDateProvider_1 = require("components/UserTimezoneDateProvider");

function Tasks() {
  var _this = this;

  var _a = UserInfoProvider_1.useUserInfo(),
      userInfo = _a.userInfo,
      setUserInfo = _a.setUserInfo;

  var _b = UserTimezoneDateProvider_1.useUserTimezoneDateFormatter(),
      formatAndSaveDate = _b.formatAndSaveDate,
      formattedDates = _b.formattedDates;

  var _c = react_1.useState([]),
      tasks = _c[0],
      setTasks = _c[1];

  var _d = react_1.useState(''),
      title = _d[0],
      setTitle = _d[1];

  var userId = userInfo === null || userInfo === void 0 ? void 0 : userInfo.id;
  react_1.useEffect(function () {
    fetchTasks();
  }, []);

  var fetchTasks = function fetchTasks() {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, tasks, error;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4
            /*yield*/
            , supabase_1.supabase.from('tasks').select('*').eq('user_id', userId)];

          case 1:
            _a = _b.sent(), tasks = _a.data, error = _a.error;

            if (tasks) {
              setTasks(tasks || []);
              tasks.forEach(function (task) {
                formatAndSaveDate(task.created_at);
              });
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  var addTask = function addTask() {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4
            /*yield*/
            , supabase_1.supabase.from('tasks').insert([{
              title: title,
              user_id: userId,
              created_at: new Date()
            }])];

          case 1:
            _a = _b.sent(), data = _a.data, error = _a.error;
            if (error) console.error('error', error);else {
              setTitle('');
              fetchTasks();
            }
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  var deleteTask = function deleteTask(taskId) {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4
            /*yield*/
            , supabase_1.supabase.from('tasks')["delete"]().match({
              id: taskId
            })];

          case 1:
            _a = _b.sent(), data = _a.data, error = _a.error;

            if (error) {
              console.error('error', error);
            } else {
              fetchTasks();
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  return react_1["default"].createElement(react_native_1.View, {
    style: styles.container
  }, react_1["default"].createElement(react_native_1.TextInput, {
    style: styles.input,
    onChangeText: setTitle,
    value: title,
    placeholder: "\u30BF\u30B9\u30AF\u3092\u5165\u529B"
  }), react_1["default"].createElement(react_native_1.Button, {
    onPress: addTask,
    title: "\u30BF\u30B9\u30AF\u3092\u8FFD\u52A0",
    color: "#841584"
  }), react_1["default"].createElement(react_native_1.FlatList, {
    data: tasks,
    keyExtractor: function keyExtractor(item) {
      return item.id.toString();
    },
    renderItem: function renderItem(_a) {
      var item = _a.item;
      return react_1["default"].createElement(react_native_1.View, {
        style: styles.taskItem
      }, react_1["default"].createElement(react_native_1.Text, {
        style: styles.taskTitle
      }, item.title), react_1["default"].createElement(react_native_1.Text, null, "Created at: " + (formattedDates[item.created_at] || item.created_at)), react_1["default"].createElement(react_native_1.Button, {
        onPress: function onPress() {
          return deleteTask(item.id);
        },
        title: "\u524A\u9664",
        color: "#ff0000"
      }));
    }
  }));
}

exports["default"] = Tasks;
;
var styles = react_native_1.StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  taskItem: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: "#f9c2ff"
  },
  taskTitle: {
    fontSize: 18
  }
});