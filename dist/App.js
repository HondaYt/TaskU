"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_1 = require("@react-navigation/native");
var native_stack_1 = require("@react-navigation/native-stack");
var themed_1 = require("@rneui/themed");
var react_native_1 = require("react-native");
var btnSection_1 = require("components/btnSection");
var welcome_1 = require("screens/welcome");
var Stack = native_stack_1.createNativeStackNavigator();
function Details(_a) {
    var navigation = _a.navigation;
    return (<>
      <react_native_1.View style={styles.sectionContainer}>
        <react_native_1.SafeAreaView style={styles.container}>
          <react_native_1.View>
          </react_native_1.View>

        </react_native_1.SafeAreaView>
        <react_native_1.SafeAreaView>
          <btnSection_1["default"] prevBtn='Welcome' nextBtn='Test' navigation={navigation}/>
        </react_native_1.SafeAreaView>
      </react_native_1.View>
    </>);
}
function Test(_a) {
    var navigation = _a.navigation;
    return (<react_native_1.View style={styles.sectionContainer}>
      <react_native_1.SafeAreaView style={styles.container}>
        <react_native_1.View>
          <react_native_1.Text>test</react_native_1.Text>
          <themed_1.ThemeProvider>
            <themed_1.Button title="Hey!"/>
          </themed_1.ThemeProvider>
        </react_native_1.View>
        <btnSection_1["default"] prevBtn='Details' nextBtn='Test' navigation={navigation}/>
      </react_native_1.SafeAreaView>
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    aaa: {
        backgroundColor: "red",
        height: 100
    },
    sectionContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        // backgroundColor: "tomato",
        flex: 1,
        gap: 10
    },
    ttlSection: {},
    ttl: {
        fontSize: 66,
        fontWeight: "600"
    },
    subTtl: {
        fontWeight: "500",
        fontSize: 26,
        lineHeight: 35
    },
    WelcomeBtnContainer: {
        // height: 200,
        gap: 8,
        padding: 8,
        justifyContent: "space-between"
    },
    btnContainer: {
        // height: 200,
        gap: 8,
        padding: 8
    },
    btn: {
        backgroundColor: "#333",
        borderRadius: 8,
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    btnText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 20
    },
    prevBtn: {
        backgroundColor: "#fff",
        borderColor: "#555",
        borderWidth: 3
    },
    prevBtnText: {
        color: "#555",
        fontSize: 18
    },
    tosText: {
        paddingTop: 4,
        height: 60,
        fontSize: 12,
        textAlign: "center",
        lineHeight: 18
    },
    link: {
        textDecorationLine: "underline",
        color: "#555"
    },
    registerIndicator: {}
});
function App() {
    return (<native_1.NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={welcome_1["default"]}/>
        <Stack.Screen name="Details" component={Details}/>
        <Stack.Screen name="Test" component={Test}/>
      </Stack.Navigator>
    </native_1.NavigationContainer>);
}
exports["default"] = App;
